import json
import hmac
import uuid
import requests
import hashlib
from django.conf import settings
from django.utils import timezone
from django.shortcuts import render
from .utils.email import send_email
from .utils.otp import generate_otp
from rest_framework.decorators import action
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, permissions, generics, status
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import MultiPartParser
from .models import PaymentMethod, TypeDelivery, StatusOrder, User, Auction, Bid, Order, OTP
from .serializers import PaymentMethodSerializer, TypeDeliverySerializer, StatusOrderSerializer, UserSerializer, AuctionSerializer, BidSerializer, OrderSerializer, OTPSerializer

from .models import AdministrativeRegion, AdministrativeUnit, Province, District, Ward
from .serializers import AdminRegionSerializer, AdminUnitSerializer, ProvinceSerializer, DistrictSerializer, WardSerializer   
from rest_framework.response import Response

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
        
        if auction.type_payment.id == 4:
            status_order = StatusOrder.objects.get(code=2)
        else :
            status_order = StatusOrder.objects.get(code=1)
            
        us_collect = int(0.1 * price)
        shipper_collect = int(price - us_collect)
        # Tạo một order mới từ thông tin của đấu giá đã kết thúc
        new_order = Order.objects.create(
            user=auction.user,
            auction=auction,
            shipper=shipper,
            name_product=auction.name,
            status_id= status_order,
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
    
    @action(detail=True, methods=['put'])
    def update_status(self, request, pk=None):
        try:
            order = Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            return Response({'message': 'Không tìm thấy đơn hàng.', 'code': 'order_not_found'}, status=status.HTTP_404_NOT_FOUND)

        new_status_code = request.data.get('status_code')
        # is_payment = request.data.get('is_payment')

        if not new_status_code:
            return Response({'message': 'Không tìm thấy trạng thái đầu vào.', 'code': 'no_new_status'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            new_status = StatusOrder.objects.get(code=new_status_code)
        except StatusOrder.DoesNotExist:
            return Response({'message': 'Trạng thái không tồn tại.', 'code': 'invalid_status'}, status=status.HTTP_400_BAD_REQUEST)
        
        valid_transitions = {
            0: [1],  # Chờ thanh toán
            1: [2],  # Chờ lấy hàng
            2: [3, -2],  # Đang chuyển hàng
            3: [4, -4],  # Đã giao thành công hoặc thất bại
            4: [],  # Final state giao hàng thành công
            5: [], # Final state hoàn tiền
            -2: [5],  # Final state lấy hàng thất bại
            -4: [5],  # Final state giao hàng thất bại
        }

        current_status_code = order.status_id.code
        if new_status_code == current_status_code:
            return Response({'message': 'Hãy cập nhật trạng thái mới.', 'code': 'same_status'}, status=status.HTTP_400_BAD_REQUEST)
        
        if new_status_code not in valid_transitions[current_status_code]:
            return Response({'message': 'Trạng thái mới không hợp lệ.', 'code': 'invalid_new_status'}, status=status.HTTP_400_BAD_REQUEST)
        
        order.status_id = new_status
        order.save()
        
        if new_status_code == 4:           
            send_email("Đơn hàng đã được giao thành công", "order_delivery_successfully_email.html", 
                        {"customerName": order.user.username, "shipperName" : order.shipper.username, "order": order}, 
                        order.user.email)

        return Response({'message': 'Cập nhật trạng thái đơn hàng thành công.', 'code': 'success'}, status=status.HTTP_200_OK)
    
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
    
@csrf_exempt
def momo_payment(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            order_id = data.get('order_id')
            amount = data.get('amount')
            
            if not order_id or not amount:
                return JsonResponse({'error': 'Invalid request data'}, status=400)
            
            access_key = settings.ACCESS_KEY
            partner_code = settings.PARTNER_CODE
            secret_key = settings.SECRET_KEY
            orderInfo = "Thanh toan don hang " + str(order_id)
            requestId = str(uuid.uuid4())
            request_type = settings.REQUEST_TYPE
            redirectUrl = settings.REDIRECT_URL
            ipnUrl = settings.IPN_URL
            endpoint = settings.ENDPOINT
            extraData = ""
            raw_signature = f"accessKey={access_key}&amount={amount}&extraData{extraData}=&ipnUrl={ipnUrl}&orderId={order_id}&orderInfo={orderInfo}&partnerCode={partner_code}&redirectUrl={redirectUrl}&requestId={requestId}&requestType={request_type}"
            
            signature = hmac.new(bytes(secret_key, 'ascii'), bytes(raw_signature, 'ascii'), hashlib.sha256).hexdigest()
            
            payload = {
                "partnerCode": partner_code,
                "requestId": requestId,
                "amount": str(amount),
                "orderId": order_id,
                "orderInfo": orderInfo,
                "redirectUrl": redirectUrl,
                "ipnUrl": ipnUrl,
                "extraData": extraData,
                'lang': "vi",
                "requestType": request_type,
                'signature': signature
            }
            
            # Chuyển đổi payload thành chuỗi JSON
            payload_json = json.dumps(payload)
            headers = {'Content-Type': 'application/json', 'Content-Length': str(len(payload_json))}
            
            response = requests.post(endpoint, headers=headers, data=payload_json)

            return JsonResponse(response.json())

        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON', 'code': 'invalid_json'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return JsonResponse({'message': str(e), 'code': 'exception'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return JsonResponse({'message': 'Invalid request method', 'code': 'invalid_request'}, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def momo_notify(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Các tham số từ MoMo
            partner_code = data.get('partnerCode')
            order_id = data.get('orderId')
            request_id = data.get('requestId')
            amount = data.get('amount')
            order_info = data.get('orderInfo')
            order_type = data.get('orderType')
            trans_id = data.get('transId')
            result_code = data.get('resultCode')
            message = data.get('message')
            pay_type = data.get('payType')
            response_time = data.get('responseTime')
            extra_data = data.get('extraData')
            signature = data.get('signature')
            
            access_key = settings.ACCESS_KEY
            secret_key = settings.SECRET_KEY
            
            # Tạo raw signature để kiểm tra chữ ký từ MoMo
            raw_signature = f"accessKey={access_key}&amount={amount}&extraData={extra_data}&message={message}&orderId={order_id}&orderInfo={order_info}&orderType={order_type}&partnerCode={partner_code}&payType={pay_type}&requestId={request_id}&responseTime={response_time}&resultCode={result_code}&transId={trans_id}"
            
            # Tạo signature để so sánh
            generated_signature = hmac.new(secret_key.encode('utf-8'), raw_signature.encode('utf-8'), hashlib.sha256).hexdigest()
            
            if generated_signature != signature:
                return JsonResponse({'error': 'Invalid signature'}, status=400)
            
            if result_code == 0:
                try:
                    order = Order.objects.get(id=order_id)
                    order.status_id = StatusOrder.objects.get(code=2) 
                    order.save()
                except Order.DoesNotExist:
                    return JsonResponse({'error': 'Order does not exist'}, status=404)
            
            return JsonResponse({'message': 'Notify received'}, status=200)
        
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def payment_success(request):
    if request.method == 'GET':
        try:
            partner_code = request.GET.get('partnerCode')
            order_id = request.GET.get('orderId')
            request_id = request.GET.get('requestId')
            amount = request.GET.get('amount')
            order_info = request.GET.get('orderInfo')
            order_type = request.GET.get('orderType')
            trans_id = request.GET.get('transId')
            result_code = request.GET.get('resultCode')
            message = request.GET.get('message')
            pay_type = request.GET.get('payType')
            response_time = request.GET.get('responseTime')
            extra_data = request.GET.get('extraData')
            
            if result_code == '0':
                try:
                    order = Order.objects.get(id=order_id)
                    order.status_id = StatusOrder.objects.get(code=2) 
                    order.save()
                    return render(request, 'payment_success.html', {'order': order, 'message': 'Thanh toán thành công!'})
                except Order.DoesNotExist:
                    return HttpResponse('Order does not exist', status=404)
            else:
                return render(request, 'payment_failed.html', {'message': 'Thanh toán thất bại. Vui lòng thử lại.'})
        
        except Exception as e:
            return HttpResponse(f'Error: {str(e)}', status=500)
    
    return HttpResponse('Invalid request method', status=400)