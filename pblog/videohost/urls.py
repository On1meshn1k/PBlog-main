from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='home'),
    path('enter.html/', views.enter, name='enter'),
    path('Video.html/', views.Video, name='video'),
    path('channel.html/', views.channel, name='channel'),
    path('edit-profile.html/', views.editProfile, name="editProfile"),
    path('upload_video.html/', views.upload_video, name="uploadVideo")
]