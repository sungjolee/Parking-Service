from django.shortcuts import render
from rest_framework.response import Response

from parkingAdmin.models import TbParkingLog, TbParkingMain, TbParkingDetail


# Create your views here.

def parkingOwner(request):
    model1 = TbParkingLog.objects.all()
    model2 = TbParkingMain.objects.all()
    model3 = TbParkingDetail.objects.all()
    context = {'logs' : model1,
               'mains': model2,
               'details':model3,} #context에 모든 후보에 대한 정보를 저장
    return render(request, 'parkingAdmin/tbparkinglog_list.html', context)