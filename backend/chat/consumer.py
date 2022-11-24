from .models import Message
# from asgiref.sync import async_to_sync
from django.contrib.auth.models import User
from channels.generic.websocket import WebsocketConsumer

import json

class Consumer(WebsocketConsumer):
    def connect(self):
        print("self=>", self)
        self.accept()

    def disconnect(self, colse_code):
        pass

    def receive(self, text_data):
        
        text_data_json = json.loads(text_data)
        print('sls', text_data_json)
        message = text_data_json["message"]
        sender = text_data_json["sender"]
        receiver = text_data_json['receiver']

        if(receiver):
            print('receiver==>', receiver)
            senderInstance = User.objects.get(id=sender)
            receiverInstance = User.objects.get(id=receiver)            
            newMessage = Message(sender=senderInstance, receiver = receiverInstance ,text=message)
            newMessage.save()
            msg = {
                'message' : message,
                'sender' : sender
            }
            test = json.dumps(msg)
            print("test====>", test)
            self.send(test)