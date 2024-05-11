from rest_framework.serializers import ModelSerializer
from .models import PaymentMethod, TypeDelivery, StatusOrder, User, Role, Order, Auction, Bid
from .models import AdministrativeRegion, AdministrativeUnit, Province, District, Ward, HomeNumber

class PaymentMethodSerializer(ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = '__all__'
        
class TypeDeliverySerializer(ModelSerializer):
    class Meta:
        model = TypeDelivery
        fields = ['name', 'price', 'additional_fee_per_500gram', 'max_time', 'description']
        
class StatusOrderSerializer(ModelSerializer):
    class Meta:
        model = StatusOrder
        fields = ['code', 'name']
        
class RoleSerializer(ModelSerializer):
    class Meta:
        model = Role
        fields = ['name', 'description']
        
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'password', 'phone_number', 'cccd', 'address', 'avatar', 'role']
        extra_kwargs = {'password': {'write_only': True}}
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
       
class AuctionSerializer(ModelSerializer):
    class Meta:
        model = Auction
        fields = '__all__'
        
class BidSerializer(ModelSerializer):
    class Meta:
        model = Bid
        fields = '__all__'

class OrderSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__' 
        
#Address
class AdminRegionSerializer(ModelSerializer):
    class Meta:
        model = AdministrativeRegion
        fields = ['id', 'name', 'code_name']
        
class AdminUnitSerializer(ModelSerializer):
    class Meta:
        model = AdministrativeUnit
        fields = ['full_name', 'short_name', 'short_name_en', 'code_name']
        
class ProvinceSerializer(ModelSerializer):
    class Meta:
        model = Province
        fields = ['code', 'name', 'code_name', 'administrative_unit', 'administrative_region']
        
class DistrictSerializer(ModelSerializer):
    class Meta:
        model = District
        fields = ['code', 'name', 'full_name', 'province_code', 'administrative_unit']
        
class WardSerializer(ModelSerializer):
    class Meta:
        model = Ward
        fields = ['code', 'name', 'full_name', 'district_code', 'administrative_unit']
        
class HomeNumberSerializer(ModelSerializer):
    class Meta:
        model = HomeNumber
        fields = '__all__'