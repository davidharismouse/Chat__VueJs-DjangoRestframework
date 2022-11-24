from django.urls import path
from . import views

urlpatterns = [
    path('api/login/', views.login),
    path('api/users/', views.userlist),
    path('api/messagelist/<int:receiver>/<int:sender>/', views.messagelist)
    # path('api/signup/', views.signup),
]