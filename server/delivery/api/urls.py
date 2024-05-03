from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('payment_methods', views.PaymentMethodViewSet)
router.register('type_delivery', views.TypeDeliveryViewSet)
router.register('status_order', views.StatusOrderViewSet)
router.register('users', views.UserViewSet)

#Address
router.register('admin_region', views.AdminRegionViewSet)
router.register('admin_unit', views.AdminUnitViewSet)
router.register('province', views.ProvinceViewSet)
router.register('district', views.DistrictViewSet)
router.register('ward', views.WardViewSet)

urlpatterns = [
    path('', include(router.urls))
]
