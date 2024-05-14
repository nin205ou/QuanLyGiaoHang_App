from django.shortcuts import render
from django.utils import timezone
from .utils.email import send_email
from .utils.otp import generate_otp
from rest_framework import viewsets, permissions, generics, status
from rest_framework.parsers import MultiPartParser
from .models import PaymentMethod, TypeDelivery, StatusOrder, User, Auction, Bid, Order, OTP
from .serializers import PaymentMethodSerializer, TypeDeliverySerializer, StatusOrderSerializer, UserSerializer, AuctionSerializer, BidSerializer, OrderSerializer, OTPSerializer

from .models import AdministrativeRegion, AdministrativeUnit, Province, District, Ward
from .serializers import AdminRegionSerializer, AdminUnitSerializer, ProvinceSerializer, DistrictSerializer, WardSerializer   
from rest_framework.response import Response
from rest_framework.decorators import action

# Create your views here.
class PaymentMethodViewSet(viewsets.ModelViewSet):
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class TypeDeliveryViewSet(viewsets.ModelViewSet):
    queryset = TypeDelivery.objects.all()
    serializer_class = TypeDeliverySerializer
    # permission_classes = [permissions.IsAuthenticated]
    
class StatusOrderViewSet(viewsets.ModelViewSet):
    queryset = StatusOrder.objects.all()
    serializer_class = StatusOrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class UserViewSet(viewsets.ViewSet,
            generics.CreateAPIView,
            generics.RetrieveAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    parser_classes = [MultiPartParser]
    
    def get_permissions(self):
        if self.action == 'retrieve':
            return [permissions.IsAuthenticated]
        
        return [permissions.AllowAny()]
    
    @action(methods=['get'], url_path="current_user", detail=False)
    def get_current(self, request):
        return Response(UserSerializer(request.user, context={
            "request": request
        }).data, status=status.HTTP_200_OK)

class OTPViewSet(viewsets.ModelViewSet):
    queryset = OTP.objects.all()
    serializer_class = OTPSerializer
    
    def get_queryset(self):
        return OTP.objects.filter(user=self.request.user)
    
    def create(self, request, *args, **kwargs):
        email = request.data.get('email')

        if User.objects.filter(email=email).exists():
            return Response({'message': 'Email đã được đăng ký', 'code': 'email_exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        otp = OTP.objects.create(otp=generate_otp(), email=email) 
        send_email("Mã xác thực OTP", "otp_email.html", {"otp": otp}, email)
        return Response({'message': 'Gửi mã OTP thành công', 'code': 'created'}, status=status.HTTP_201_CREATED)
    
    @action(methods=['post'], detail=False)
    def verify_email(self, request):
        otp = request.data.get('otp')
        email = request.data.get('email')
        role = request.data.get('role')
        user_name = request.data.get('user_name')
        
        try:
            otp = OTP.objects.get(email=email, otp=otp)
        except OTP.DoesNotExist:
            return Response({'message': 'Mã OTP không hợp lệ', 'code': 'invalid_otp'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not otp.is_valid():
            return Response({'message': 'Mã OTP đã hết hạn', 'code': 'expired_otp'}, status=status.HTTP_400_BAD_REQUEST)
        
        otp.status = False
        otp.save()
        
        if role == 2:
            send_email("Chào mừng bạn đến với hệ thống giao hàng", "welcome_customer_email.html", {"username": user_name}, email)
        else:
            send_email("Chào mừng bạn đến với hệ thống giao hàng", "welcome_shipper_email.html", {"username": user_name}, email)
            
        return Response({'message': 'Xác thực thành công', 'code': 'success'}, status=status.HTTP_200_OK)
    
class AuctionViewSet(viewsets.ModelViewSet):
    queryset = Auction.objects.all()
    serializer_class = AuctionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.query_params.get('userId')
        is_auctioning = self.request.query_params.get('isAuctioning')
                
        if user_id:
            return Auction.objects.filter(user=user_id)
        
        if is_auctioning and is_auctioning.lower() == 'true':
            now = timezone.now()
            return Auction.objects.filter(start_time__lte=now, end_time__gte=now, status=True, winner_shipper=None).order_by('start_time')
        
        return Auction.objects.all()    
    
    @action(detail=True, methods=['post'])
    def select_winner_shipper(self, request, pk=None):
        auction = self.get_object()
        shipper_id = request.data.get('shipper_id')
        price = request.data.get('price')
        try:
            shipper = User.objects.get(id=shipper_id)
        except User.DoesNotExist:
            return Response({'error': 'Không tìm thấy shipper.', 'code' : 'shipper_not_found'}, status=status.HTTP_400_BAD_REQUEST)
        
        auction.winner_shipper = shipper
        auction.current_price = price
        auction.save()
        
        us_collect = int(0.1 * price)
        shipper_collect = int(price - us_collect)
        # Tạo một order mới từ thông tin của đấu giá đã kết thúc
        new_order = Order.objects.create(
            user=auction.user,
            auction=auction,
            shipper=shipper,
            name_product=auction.name,
            status_id=StatusOrder.objects.get(code=1),
            weight=auction.weight,
            source=auction.source,
            destination=auction.destination,
            phone_number_giver=auction.phone_number_giver,
            time_pickup="Giờ hành chính",
            time_deliver="Giờ hành chính",
            type_payment=auction.type_payment,
            collection=auction.collection,
            price=auction.current_price,
            us_collect=us_collect,
            shipper_collect=shipper_collect
        )
        
        customer = User.objects.get(id=auction.user_id)
        send_email("Chúc mừng bạn đã chiến thắng đấu giá", "bid_accepted_email.html", {"order": new_order, "shipperName" : shipper.username, "customer" : customer}, shipper.email)
        
        bids = Bid.objects.filter(auction=auction.id)

        unique_shippers = set()

        for bid in bids:
            if bid.shipper != shipper:
                unique_shippers.add(bid.shipper)

        participating_shippers = list(unique_shippers)

        for participating_shipper in participating_shippers:
            send_email("Đấu giá đã kết thúc", "bid_rejected_email.html", {"auction": auction, "shipperName" : participating_shipper.username}, participating_shipper.email)
        
        return Response({'message': 'Chọn shipper chiến thắng thành công.', 'code': 'success'}, status=status.HTTP_200_OK)
    
class BidViewSet(viewsets.ModelViewSet):
    queryset = Bid.objects.all()
    serializer_class = BidSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        auction_id = self.request.query_params.get('auctionId')
        
        if auction_id:
            return Bid.objects.filter(auction_id=auction_id).order_by('price')
        
        return Bid.objects.all()   
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Lấy thông tin đấu giá và giá thầu
        auction_id = serializer.validated_data['auction'].id
        user_id = serializer.validated_data['shipper'].id
        bid_price = serializer.validated_data['price']
        
        auction = Auction.objects.get(id=auction_id)
        if auction.winner_shipper is not None:
            return Response({
                'message': 'Đấu giá đã kết thúc.',
                'code' : 'auction_ended'
            }, status=status.HTTP_400_BAD_REQUEST)
            
        if bid_price<=0:
            return Response({
                'message': 'Giá đấu không hợp lệ.',
                'code' : 'invalid_bid_price'
            }, status=status.HTTP_400_BAD_REQUEST)
            
        if bid_price < 1000:
            return Response({
                'message': 'Giá đấu phải lớn hơn 1000.',
                'code' : 'price_too_high'
            }, status=status.HTTP_400_BAD_REQUEST)
            
        if bid_price % 1000 != 0:
            return Response({
                'message': 'Giá đấu không chẵn (phải chia hết cho 1000).',
                'code' : 'price_not_even'
            }, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.get(id=user_id)
        if str(user.role) != "Shipper":
            return Response({
                'message': 'Chỉ shipper mới được tham gia đấu giá.',
                'code' : 'just_shipper_can_auction'
            }, status=status.HTTP_400_BAD_REQUEST)
        

        # Kiểm tra giá thầu
        if bid_price >= auction.current_price:
            return Response({
                'message': 'Giá đấu phải nhỏ hơn giá hiện tại.',
                'code' : 'must_lower_than_current_price'
            }, status=status.HTTP_400_BAD_REQUEST)

        auction.current_price = bid_price
        auction.save()

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({
                'message': 'Đấu giá thành công',
                'code' : 'success',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED, headers=headers)
    
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]


    def get_queryset(self):
        queryset = Order.objects.all()

        user_id = self.request.query_params.get('user_id', None)
        if user_id is not None:
            queryset = queryset.filter(user_id=user_id)

        shipper_id = self.request.query_params.get('shipper_id', None)
        if shipper_id is not None:
            queryset = queryset.filter(shipper_id=shipper_id)

        return queryset
#Address
class AdminRegionViewSet(viewsets.ModelViewSet):
    queryset = AdministrativeRegion.objects.order_by('name')
    serializer_class = AdminRegionSerializer
    
class AdminUnitViewSet(viewsets.ModelViewSet):
    queryset = AdministrativeUnit.objects.order_by('full_name')
    serializer_class = AdminUnitSerializer
    
class ProvinceViewSet(viewsets.ModelViewSet):
    queryset = Province.objects.order_by('name')
    serializer_class = ProvinceSerializer
    
class DistrictViewSet(viewsets.ModelViewSet):
    queryset = District.objects.order_by('name')
    serializer_class = DistrictSerializer
    
class WardViewSet(viewsets.ModelViewSet):
    queryset = Ward.objects.order_by('name')
    serializer_class = WardSerializer