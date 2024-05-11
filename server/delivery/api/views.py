from django.shortcuts import render
from django.utils import timezone
from rest_framework import viewsets, permissions, generics, status
from rest_framework.parsers import MultiPartParser
from .models import PaymentMethod, TypeDelivery, StatusOrder, User, Role, Auction, Bid, Order
from .serializers import PaymentMethodSerializer, TypeDeliverySerializer, StatusOrderSerializer, UserSerializer, RoleSerializer, AuctionSerializer, BidSerializer, OrderSerializer

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
            return Auction.objects.filter(start_time__lte=now, end_time__gte=now, status=True)
        
        return Auction.objects.all()    
class BidViewSet(viewsets.ModelViewSet):
    queryset = Bid.objects.all()
    serializer_class = BidSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        auction_pk = self.kwargs['auction_pk']
        return Bid.objects.filter(auction_id=auction_pk)
    
class AuctionWinnerViewSet(viewsets.ModelViewSet):
    queryset = Auction.objects.all() 
    serializer_class = AuctionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, pk):
        auction = Auction.objects.get(pk=pk)
        auction.winner_shipper = request.data['winner_shipper']
        auction.save()
        return self.serializer_class(auction).data
    
class AuctionListViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Auction.objects.filter(status=True)
    serializer_class = AuctionSerializer

    def get_queryset(self):
        return Auction.objects.filter(status=True)
    
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]


    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

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