from backend.settings_local import AZURE_CONNECTION_STRING
from azure.storage.blob import BlobServiceClient
from rest_framework import serializers
from .models import Room, Message, File
from classes.models import Schedule
from users.serializers import UserSerializer, UserProfileSerializer
from django.utils import timezone
import mimetypes


class RoomSerializer(serializers.ModelSerializer):
    users = serializers.SerializerMethodField()
    deleted_user = serializers.SerializerMethodField()
    next_classes = serializers.SerializerMethodField()
    unread_messages_count = serializers.SerializerMethodField()

    class Meta:
        model = Room
        fields = ('room_id', 'users', 'name', 'archivized',
                  'next_classes', 'deleted_user', 'unread_messages_count')

    def get_users(self, obj):
        users_queryset = obj.users.all()

        user_profiles = []
        for user in users_queryset:
            user_profile = UserProfileSerializer(user.userdetails).data
            user_profiles.append(user_profile)

        return user_profiles

    def get_deleted_user(self, obj):
        deleted_user = obj.deleted_user

        if deleted_user is not None:
            user_profile = UserProfileSerializer(deleted_user.userdetails).data
        else:
            user_profile = None

        return user_profile

    def get_next_classes(self, obj):
        from classes.serializers import ScheduleSerializer

        next_classes_queryset = Schedule.objects.filter(
            room=obj, date__gte=timezone.now()).order_by('date').first()

        if next_classes_queryset is not None:
            next_classes_data = ScheduleSerializer(
                next_classes_queryset).data
        else:
            next_classes_data = None

        return next_classes_data

    def get_unread_messages_count(self, obj):
        if self.context.get('request') is not None:
            logged_user = self.context.get('request').user

            messages_count = Message.objects.filter(
                room__room_id=obj.room_id, read=False, to_user=logged_user)

            return messages_count.count()
        else:
            return 0


class MessageSerializer(serializers.ModelSerializer):
    from_user = serializers.SerializerMethodField()
    to_user = serializers.SerializerMethodField()
    room = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = (
            "id",
            "room",
            "from_user",
            "to_user",
            "content",
            "timestamp",
            "read"
        )

    def get_room(self, obj):
        return str(obj.room.room_id)

    def get_from_user(self, obj):
        return UserSerializer(obj.from_user).data

    def get_to_user(self, obj):
        return UserSerializer(obj.to_user).data


class FileSerializer(serializers.ModelSerializer):
    mimetype = serializers.SerializerMethodField()
    owner = UserSerializer()

    class Meta:
        model = File
        fields = '__all__'

    def get_mimetype(self, obj):
        blob_service_client = BlobServiceClient.from_connection_string(
            AZURE_CONNECTION_STRING)
        container_client = blob_service_client.get_container_client('media')
        blob_client = container_client.get_blob_client(f"{obj.file_path}")
        # Fetch blob properties to access the content type
        blob_properties = blob_client.get_blob_properties()

        content_type = blob_properties['content_settings']['content_type']
        return content_type


class FileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ('room', 'owner', 'file_path')

    def validate_file_path(self, value):
        if value.size == 0:
            raise serializers.ValidationError("Plik nie może być pustymmm.")
        return value
