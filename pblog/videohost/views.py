from django.shortcuts import render

# Create your views here.
def index(request): #HttpRequest
    return render(request, 'videohost/index.html')


def enter(request):
    return render(request, 'videohost/enter.html')

def Video(request):
    return render(request, 'videohost/video.html')

def channel(request):
    return render(request, 'videohost/channel.html')

def editProfile(request):
    return render(request, 'videohost/edit-profile.html')

def upload_video(request):
    return render(request, 'videohost/upload_video.html')