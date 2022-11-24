from urllib.parse import parse_qs
from channels.auth import AuthMiddlewareStack

from rest_framework.authtoken.models import Token
from rest_framework.exceptions import AuthenticationFailed

from django.contrib.auth.models import AnonymousUser
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async

User = get_user_model()

@database_sync_to_async
def get_user(token):
    try:
        access_token = Token.objects.get(key=token)
        try:
            return User.objects.get(id=access_token.user_id)
        except User.DoesNotExist:
            return AnonymousUser()
    except Token.DoesNotExist:
        return AnonymousUser()

