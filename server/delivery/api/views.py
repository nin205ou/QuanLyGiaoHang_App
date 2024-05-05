from django.shortcuts import render
from rest_framework import viewsets, permissions, generics
from rest_framework.parsers import MultiPartParser
from .models import PaymentMethod, TypeDelivery, StatusOrder, User
from .serializers import PaymentMethodSerializer, TypeDeliverySerializer, StatusOrderSerializer, UserSerializer

from .models import AdministrativeRegion, AdministrativeUnit, Province, District, Ward
from .serializers import AdminRegionSerializer, AdminUnitSerializer, ProvinceSerializer, DistrictSerializer, WardSerializer   

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
            return [permissions.IsAuthenticated()]
        
        return [permissions.AllowAny()]


#Address
class AdminRegionViewSet(viewsets.ModelViewSet):
    queryset = AdministrativeRegion.objects.order_by('name')
    serializer_class = AdminRegionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class AdminUnitViewSet(viewsets.ModelViewSet):
    queryset = AdministrativeUnit.objects.order_by('full_name')
    serializer_class = AdminUnitSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class ProvinceViewSet(viewsets.ModelViewSet):
    queryset = Province.objects.order_by('name')
    serializer_class = ProvinceSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class DistrictViewSet(viewsets.ModelViewSet):
    queryset = District.objects.order_by('name')
    serializer_class = DistrictSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class WardViewSet(viewsets.ModelViewSet):
    queryset = Ward.objects.order_by('name')
    serializer_class = WardSerializer
    permission_classes = [permissions.IsAuthenticated]