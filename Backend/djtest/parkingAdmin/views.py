from django.shortcuts import render
from rest_framework.response import Response

from parkingAdmin.models import TbParkingLog, TbParkingLogCount, TbParkingMain, TbParkingDetail


# Create your views here.

# def parkingOwner(request):
#     model1 = TbParkingLog.objects.all()
#     model2 = TbParkingMain.objects.all()
#     model3 = TbParkingDetail.objects.all()
#     context = {'logs' : model1,
#                'mains': model2,
#                'details':model3,} #context에 모든 후보에 대한 정보를 저장
#     return render(request, 'parkingAdmin/layout.html', context)



from django.contrib import messages
from django.shortcuts import render, redirect

from .forms import SignupForm


def signup(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            user = form.save()
            messages.success(request, '회원가입 환영합니다.')
            next_url = request.GET.get('next', '/')
            return redirect(next_url)
    else:
        form = SignupForm()
    return render(request, 'parkingAdmin/register.html', {
        'form': form,
    })

def index(request):
    #코드 구현
    table = TbParkingLogCount.objects.all()
    
    
    return render(request, "parkingAdmin/index.html",{'value':table})

def layout(request):
    return render(request,"parkingAdmin/layout-static.html")

def login(request):
    return render(request,"parkingAdmin/login.html")

def notFound(request):
    return render(request,"parkingAdmin/404.html")

def charts(request):
    return render(request,"parkingAdmin/charts.html")