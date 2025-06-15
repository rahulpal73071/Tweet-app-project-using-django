from rest_framework import serializers
from .models import Twits
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class TwitsSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Twits
        fields = ['id', 'user', 'title', 'content', 'image', 'created_at']
        read_only_fields = ['user', 'created_at']
