from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('payment_methods', views.PaymentMethodViewSet)
router.register('type_delivery', views.TypeDeliveryViewSet)
router.register('status_order', views.StatusOrderViewSet)
router.register('users', views.UserViewSet)
router.register('otps', views.OTPViewSet)
router.register('auctions', views.AuctionViewSet)
router.register('bids', views.BidViewSet)
router.register('orders', views.OrderViewSet)

#Address
router.register('admin_region', views.AdminRegionViewSet)
router.register('admin_unit', views.AdminUnitViewSet)
router.register('province', views.ProvinceViewSet)
router.register('district', views.DistrictViewSet)
router.register('ward', views.WardViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('momo_payment/', views.momo_payment),
    path('momo_notify/', views.momo_notify),
    path('payment_success/', views.payment_success),
]
