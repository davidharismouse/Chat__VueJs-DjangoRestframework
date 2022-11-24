from django.contrib.auth.models import User
from .serializers import MessageSerializer, UserSerializer

from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from chat.models import Message

@csrf_exempt
@api_view(['POST'])
@permission_classes([])
def login(request):
    data = JSONParser().parse(request)
    print('data=>', data)
    for user in User.objects.all():
        if not user:
            break
        else:
            try:
                Token.objects.get(user_id=user.id)
            except Token.DoesNotExist:
                Token.objects.create(user=user)

    try:
        user = User.objects.get(username=data['username'])
    except User.DoesNotExist:
        return JsonResponse({
            "error" : "User Not Exit."
        }, status =404)
    if not user.check_password(data['password']):
        return JsonResponse({
            "error": "Password Incorrect"
        }, status=404)
    token = Token.objects.get(user_id=user.id)
    return JsonResponse({
        "user": {
            "id": user.id,
            "username": user.username,            
        },
        "token": token.key,
    }, status=200)


@csrf_exempt
@api_view(['GET','DELETE','POST'])
@permission_classes([])
def userlist(request, pk=None):
    print('req===', request)
    if request.method == 'GET':
        if pk:
            users = User.objects.filter(id=pk)
        else:
            users = User.objects.all()
        serializer = UserSerializer(users, many=True, context={'request': request})
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    users = User.objects.values('id', 'username')
    return JsonResponse(list(users), safe=False)

@csrf_exempt
@api_view(['GET','DELETE','POST'])
@permission_classes([])
def messagelist(request, receiver=None, sender=None):
    print("sdf")
    """
    List all required messages, or create a new message

    """
    if request.method == 'GET':
        print("df==", sender)     
        text = Message.objects.filter( receiver = receiver, sender=sender) | Message.objects.filter( sender=receiver, receiver= sender)
        serializer = MessageSerializer(text, many=True, context={'request': request})
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data =  JSONParser().parse(request)
        print("====",data)
        serializer = MessageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)