from django.shortcuts import render
from rest_framework.response import Response

from parkingAdmin.models import TbParkingLog, TbParkingLogCount, TbParkingMain, TbParkingDetail

from django.db import connection

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


def toDict(queryResult,columnResult):
    if queryResult ==None or columnResult==None:
        return None
    Dict = dict(zip(columnResult, queryResult))
    return Dict

def index(request):
    
    
    #코드 구현
    cursor=connection.cursor()
    strSQL = "SELECT * FROM TB_PARKING_LOG_COUNT WHERE SERIAL_ID LIKE '10000000e778c0ac%' ORDER BY ID DESC"
    tableresult = cursor.execute(strSQL)
    table = cursor.fetchall()
    
    connection.commit()
    connection.close()
    
    
    # print(table)
    cursor = connection.cursor()
    # st = request.GET.get("ID")
    strSQL = f"\
            SELECT A.NAME, C.* \
            FROM\
                TB_PARKING_MAIN A,\
                TB_PARKING_DETAIL B,\
                TB_PARKING_LOG C\
            WHERE A.ID=B.ID\
            AND B.SERIAL_ID=C.SERIAL_ID\
            AND A.ID='centralpark'\
            ORDER BY TIME DESC\
            LIMIT 1"
    result = cursor.execute(strSQL)
    reviews = cursor.fetchall()
    

    connection.commit()
    connection.close()
    reviews=list(reviews)


    keys=["NAME","TIME","SERIAL_ID"]
    # print(strSQL)
    # print(reviews)
    resultarray=[]
    parkingZoneDictArray =[]
    reviews=list(reviews)
    for i in range(result):
        reviews[i]=list(reviews[i])

        reviews[i][6]=reviews[i][6].split(',')
        reviews[i][5]=reviews[i][5].split(',')



        # for j in range(len(reviews[i][6])):
        #     reviews[i][6][j]="s"+str(reviews[i][6][j])
            
        
        # for j in range(len(reviews[i][5])):
        #     reviews[i][5][j]="s"+str(reviews[i][5][j])
            
        parkingZoneDictArray =[]
        for j in reviews[i][5]:
            if j=='':
                break
            tmpdic = {
                "ID":int(j),
                "value":"ENABLE"
            }
            parkingZoneDictArray.append(tmpdic)
        for j in reviews[i][6]:
            if j=='':
                break
            tmpdic = {
                "ID":int(j),
                "value":"OCUPIED"
            }
            parkingZoneDictArray.append(tmpdic)

        Dict = toDict(reviews[i],keys)
    
    
    for i in range(len(parkingZoneDictArray)):
        for j in range(i+1,len(parkingZoneDictArray)):
            if(parkingZoneDictArray[i]["ID"]>parkingZoneDictArray[j]["ID"]):
                tmp=parkingZoneDictArray[i]
                parkingZoneDictArray[i]=parkingZoneDictArray[j]
                parkingZoneDictArray[j]=tmp
    
    Dict["ENABLE"]=len(reviews[0][5])
    Dict["TOTAL"]=len(parkingZoneDictArray)
    Dict["LIST"]=parkingZoneDictArray
    
        # resultarray.append(Dict)
    table=list(table)
    
    tableresultarray=[]
    keys = ["zonenum","in_time","out_time"]
    for i in range(len(table)):
        table[i]=list(table[i])
        tmparray = [table[i][2],table[i][3],table[i][4]]
        tmpDict=toDict(tmparray,keys)
        tmpDict["in_time"]=str(tmpDict["in_time"])
        tmpDict["out_time"]=str(tmpDict["out_time"])
        tmpDict["FeeTime"]=table[i][4]-table[i][3]
        tableresultarray.append(tmpDict)
    

    
    return render(request, "parkingAdmin/index.html",{'value':tableresultarray, 'dict':Dict, 'ocupied':Dict["TOTAL"] - Dict["ENABLE"]})

def logs(request):
    cursor = connection.cursor()
    # strSQL = f"\
    #         SELECT A.NAME, C.* \
    #         FROM\
    #             TB_PARKING_MAIN A,\
    #             TB_PARKING_DETAIL B,\
    #             TB_PARKING_LOG C\
    #         WHERE A.ID=B.ID\
    #         AND B.SERIAL_ID=C.SERIAL_ID\
    #         AND A.ID='centralpark'\
    #         ORDER BY TIME DESC"
    strSQL = "SELECT * from TB_PARKING_LOG WHERE SERiAL_ID='10000000e778c0ac' ORDER BY TIME DESC"
    result = cursor.execute(strSQL)
    reviews = cursor.fetchall()
    

    connection.commit()
    connection.close()
    reviews=list(reviews)


    keys=["TIME","SERIAL_ID","TOTAL","ENABLE","OCUPIEDLIST","ENABLELIST"]
    # print(strSQL)
    # print(reviews)
    Dict={}
    resultarray=[]
    parkingZoneDictArray =[]
    reviews=list(reviews)
    for i in range(len(reviews)):
        tmplist=list(reviews[i])
        Dict = toDict(tmplist,keys)
        Dict["TIME"]=str(Dict["TIME"])
        resultarray.append(Dict)
        
    # print(resultarray)
    return render(request,"parkingAdmin/parking-log.html",{"value": resultarray})

def login(request):
    return render(request,"parkingAdmin/login.html")

def notFound(request):
    return render(request,"parkingAdmin/404.html")

def charts(request):
    return render(request,"parkingAdmin/charts.html")