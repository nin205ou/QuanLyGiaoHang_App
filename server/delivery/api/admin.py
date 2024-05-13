from django.contrib import admin
from .models import User, Role, PaymentMethod, TypeDelivery, StatusOrder, Auction, Bid
from .models import AdministrativeRegion, AdministrativeUnit, Province, District, Ward

# Register your models here.
class AdminSite(admin.AdminSite):
    site_header = 'Delivery App Admin'
    site_title = 'Delivery App Admin'
    index_title = 'Welcome to Delivery App Admin'
    
admin.site = AdminSite(name='myadmin')

admin.site.register(User)
admin.site.register(Role)
admin.site.register(PaymentMethod)
admin.site.register(TypeDelivery)
admin.site.register(StatusOrder)
admin.site.register(Auction)
admin.site.register(Bid)

#Address
admin.site.register(AdministrativeRegion)
admin.site.register(AdministrativeUnit)
admin.site.register(Province)
admin.site.register(District)
admin.site.register(Ward)
