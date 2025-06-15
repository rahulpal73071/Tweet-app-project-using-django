from rest_framework import viewsets, permissions
from .models import Twits
from .serializers import TwitsSerializer

class TwitsViewSet(viewsets.ModelViewSet):
    queryset = Twits.objects.all().order_by('-created_at')
    serializer_class = TwitsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        if self.request.user == serializer.instance.user:
            serializer.save()
        else:
            raise permissions.PermissionDenied("You can only update your own posts.")

    def perform_destroy(self, instance):
        if self.request.user == instance.user:
            instance.delete()
        else:
            raise permissions.PermissionDenied("You can only delete your own posts.")
