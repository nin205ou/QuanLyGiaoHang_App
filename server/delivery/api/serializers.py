from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import PaymentMethod, TypeDelivery, StatusOrder, User, Role, Order, Auction, Bid, OTP
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

class OTPSerializer(ModelSerializer):
    class Meta:
        model = OTP
        fields = '__all__'

class AuctionSerializer(ModelSerializer):
    user_name = serializers.SerializerMethodField()
    shipper_joining = serializers.SerializerMethodField()
    
    class Meta:
        model = Auction
        fields = '__all__'
        
    def get_user_name(self, obj):
        return obj.user.username
    
    def get_shipper_joining(self, obj):
        return obj.bids.values('shipper').distinct().count()
        
class BidSerializer(ModelSerializer):
    shipper_name = serializers.SerializerMethodField()
    class Meta:
        model = Bid
        fields = [ 'auction', 'shipper', 'price', 'created_at', 'shipper_name']
        
    def get_shipper_name(self, obj):
        return obj.shipper.username
    

class OrderSerializer(ModelSerializer):
    status_name = serializers.SerializerMethodField()
    class Meta:
        model = Order
        fields = '__all__' 
    
    def get_status_name(self, obj):
        return obj.status_id.name
        
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