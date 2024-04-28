from django.db import models
from django.contrib.auth.models import AbstractUser
from cloudinary.models import CloudinaryField
from django.forms import ValidationError

# Create your models here.
class Role(models.Model):
    name = models.CharField('name', max_length=50)
    description = models.TextField('description', null=True, blank=True)
    
    def __str__(self):
        return self.name
    
class User(AbstractUser):
    role = models.ForeignKey(Role, on_delete=models.CASCADE, blank=True, null=True)

    # Các trường dữ liệu chung
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    # Các trường dữ liệu riêng cho từng loại người dùng
    cccd = models.CharField(max_length=12, null=True, blank=True)  # Chỉ dành cho shipper
    address = models.CharField(max_length=255, null=True, blank=True)  # Chỉ dành cho customer
    # Các trường dữ liệu riêng cho admin
    is_staff = models.BooleanField(default=False)  # Để quản lý quyền admin

    def __str__(self):
        return self.username
    
    def clean(self):
        super().clean()
        if self.role.name == 'Shipper' and not self.cccd:
            raise ValidationError('CCCD is required for shipper')
        
    def save(self, *args, **kwargs):
        if not self.role_id:
            # Gán vai trò mặc định khi tạo superuser
            self.role_id = Role.objects.get(name='Customer').id
        super().save(*args, **kwargs)
    
  
class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True 
  
class PaymentMethod(models.Model):
    name = models.CharField(max_length=255, null=False)
    image = models.ImageField(upload_to="payment_methods", null=False)

    def __str__(self):
        return self.name
          
class Auction(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='auctions')
    name = models.CharField('name', max_length=255)
    description = models.TextField('description', null=True)
    weight = models.DecimalField('weight', max_digits=10, decimal_places=2)
    collection = models.IntegerField('collection')
    image = CloudinaryField('image_auctions', null=True)
    source = models.CharField('source', max_length=255)
    destination = models.CharField('destination', max_length=255)
    phone_number_giver = models.CharField('phone_number_giver', max_length=15)
    start_time = models.DateTimeField('start_time')
    end_time = models.DateTimeField('end_time')
    start_price = models.DecimalField('start_price', max_digits=10, decimal_places=2)
    current_price = models.DecimalField('current_price', max_digits=10, decimal_places=2)
    type_payment = models.ForeignKey(PaymentMethod, on_delete=models.CASCADE, related_name='auctions_payment_methods')
    winner_shipper = models.ForeignKey(User, on_delete=models.CASCADE, related_name='auctions_winner', null=True)
    status = models.BooleanField('status', default=True)
    priority = models.IntegerField('priority', default=0)
    
    def __str__(self):
        return self.name
    
class Bid(BaseModel):
    auction = models.ForeignKey(Auction, on_delete=models.CASCADE, related_name='bids')
    shipper = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bids_shipper')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return self.auction.name + ' - ' + self.user.username + ' : ' + str(self.price)
   
class StatusOrder(models.Model):
    code = models.IntegerField(null=False)
    name = models.CharField(max_length=255)
    
    def __str__(self):
        return self.name
    
class Order(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    auction = models.ForeignKey(Auction, on_delete=models.CASCADE, related_name='orders')
    shipper = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders_shipper')
    name_product = models.CharField(max_length=255)
    status_id = models.ForeignKey(StatusOrder, on_delete=models.CASCADE, related_name='orders')
    weight = models.CharField(max_length=255)
    source = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    phone_number_giver = models.CharField(max_length=15)
    time_pickup = models.CharField(max_length=255)
    time_deliver = models.CharField(max_length=255)
    type_payment = models.ForeignKey(PaymentMethod, null=True, on_delete=models.CASCADE, related_name='orders_payment_methods')
    collection = models.DecimalField(max_digits=10, decimal_places=2)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    us_collect = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return self.name_product + ' - ' + self.user.username + ' : ' + str(self.price)
    
class TypeDelivery(BaseModel):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    additional_fee_per_500gram = models.DecimalField(max_digits=10, decimal_places=2)
    max_time = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    
    
    def __str__(self):
        return self.name
 
class Notification(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=255)
    content = models.TextField()
    is_read = models.BooleanField(default=True)
    
    def __str__(self):
        return self.content
    
    
    
# Address
class AdministrativeRegion(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    name_en = models.CharField(max_length=255)
    code_name = models.CharField(max_length=255, null=True)
    code_name_en = models.CharField(max_length=255, null=True)
    
    def __str__(self):
        return self.name

class AdministrativeUnit(models.Model):
    id = models.IntegerField(primary_key=True)
    full_name = models.CharField(max_length=255, null=True)
    full_name_en = models.CharField(max_length=255, null=True)
    short_name = models.CharField(max_length=255, null=True)
    short_name_en = models.CharField(max_length=255, null=True)
    code_name = models.CharField(max_length=255, null=True)
    code_name_en = models.CharField(max_length=255, null=True)
    
    def __str__(self):
        return self.full_name

class Province(models.Model):
    code = models.CharField(max_length=20, primary_key=True)
    name = models.CharField(max_length=255)
    name_en = models.CharField(max_length=255, null=True)
    full_name = models.CharField(max_length=255)
    full_name_en = models.CharField(max_length=255, null=True)
    code_name = models.CharField(max_length=255, null=True)
    administrative_unit = models.ForeignKey(AdministrativeUnit, on_delete=models.CASCADE, null=True)
    administrative_region = models.ForeignKey(AdministrativeRegion, on_delete=models.CASCADE, null=True)
    
    def __str__(self):
        return self.name

class District(models.Model):
    code = models.CharField(max_length=20, primary_key=True)
    name = models.CharField(max_length=255)
    name_en = models.CharField(max_length=255, null=True)
    full_name = models.CharField(max_length=255, null=True)
    full_name_en = models.CharField(max_length=255, null=True)
    code_name = models.CharField(max_length=255, null=True)
    province_code = models.CharField(max_length=20, null=True)
    administrative_unit = models.ForeignKey(AdministrativeUnit, on_delete=models.CASCADE, null=True)
    province = models.ForeignKey(Province, on_delete=models.CASCADE, null=True)
    
    def __str__(self):
        return self.name

class Ward(models.Model):
    code = models.CharField(max_length=20, primary_key=True)
    name = models.CharField(max_length=255)
    name_en = models.CharField(max_length=255, null=True)
    full_name = models.CharField(max_length=255, null=True)
    full_name_en = models.CharField(max_length=255, null=True)
    code_name = models.CharField(max_length=255, null=True)
    district_code = models.CharField(max_length=20, null=True)
    administrative_unit = models.ForeignKey(AdministrativeUnit, on_delete=models.CASCADE, null=True)
    district = models.ForeignKey(District, on_delete=models.CASCADE, null=True)
    
    def __str__(self):
        return self.name
    
class HomeNumber(models.Model):
    information = models.CharField(max_length=255)
    
    def __str__(self):
        return self.information    