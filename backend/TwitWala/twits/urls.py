from rest_framework.routers import DefaultRouter
from .views import TwitsViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'twits', TwitsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
