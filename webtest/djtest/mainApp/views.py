from ast import Or
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from django.views.generic.list import ListView
from django.views.generic.edit import CreateView
from django.shortcuts import render
from django.shortcuts import redirect
# from .serializers import ReviewSerializer
from .models import TbParkingDetail,TbParkingLog,TbParkingMain

from django.db import connection
# Create your views here.

class TotalData(APIView):
    
    # def post(self, request):
    #     serializer = ReviewSerializer(data = request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data,status=status.HTTP_201_CREATED)
    #     return Response(serializer.error,status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        reviews = TbParkingLog.objects.all()
        cursor = connection.cursor()
        strSQL = "select * from TB_PARKING_MAIN"
        result = cursor.execute(strSQL)
        reviews = cursor.fetchall()
        
        connection.commit()
        connection.close()
        # reviews=list(reviews)
        # reviews[0]=list(reviews[0])
        
        # reviews[0][3]=reviews[0][3][1:-1]
        # print(reviews[0][3])
        # reviews[0][5]=reviews[0][5][1:-1]
        # print(reviews[0][5])
        # reviews[0][3]=reviews[0][3].split(',')
        # reviews[0][5]=reviews[0][5].split(',')
        
        
        
        # for i in range(len(reviews[0][3])):
        #     reviews[0][3][i]="s"+str(reviews[0][3][i])
        #     reviews[0][5][i]="s"+str(reviews[0][5][i])
        

        
        cursor = connection.cursor()
        columnSQL = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='TB_PARKING_MAIN' ORDER BY ORDINAL_POSITION;" 
        columresult = cursor.execute(columnSQL)
        columnnames=cursor.fetchall()
        
        connection.commit()
        connection.close()
                
        keys=[]
        for columnname in columnnames:
            keys.append(columnname[0])        
                
        resultarray=[]
        
        reviews=list(reviews)
        for i in range(result):
            reviews[i]=list(reviews[i])
            # reviews[i][7]=reviews[i][7][1:-1]
            # reviews[i][9]=reviews[i][9][1:-1]
            # reviews[i][7]=reviews[i][7].split(',')
            # reviews[i][9]=reviews[i][9].split(',')



            # for j in range(len(reviews[i][7])):
            #     reviews[i][7][j]="s"+str(reviews[i][7][j])
                
            
            # for j in range(len(reviews[i][9])):
            #     reviews[i][9][j]="s"+str(reviews[i][9][j])

            Dict = toDict(reviews[i],keys)
            resultarray.append(Dict)
        
        return Response(resultarray)

def insertDB(request):
    model1 = TbParkingLog.objects.all()
    model2 = TbParkingMain.objects.all()
    model3 = TbParkingDetail.objects.all()
    context = {'logs' : model1,
               'mains': model2,
               'details':model3,} #context에 모든 후보에 대한 정보를 저장
    return render(request, 'mainApp/tbparkinglog_list.html', context)

def create(request):
    new_main = TbParkingMain() # 데이터 저장을 위한 객체 생성
    new_main.name = request.POST['name']
    new_main.latitude = request.POST['latitude']
    new_main.longitude = request.POST['longitude']

    cursor = connection.cursor()
    strSQL = f"insert into TB_PARKING_MAIN (Name,latitude,longitude) values({new_main.name},{new_main.latitude},{new_main.longitude})"
    result = cursor.execute(strSQL)
    reviews = cursor.fetchall()
        
    connection.commit()
    connection.close()
    print('commit 하냐')
    return redirect('list')

class DBCreateView(ListView):
    model = TbParkingMain
    
def toDict(queryResult,columnResult):
    if queryResult ==None or columnResult==None:
        return None
    Dict = dict(zip(columnResult, queryResult))
    return Dict


class ReviewList(APIView):

    def get(self, request):
        reviews = TbParkingLog.objects.all()
        cursor = connection.cursor()
        strSQL = "select * from TB_PARKING_LOG ORDER BY TIME LIMIT 1"
        result = cursor.execute(strSQL)
        reviews = cursor.fetchall()
        
        connection.commit()
        connection.close()
        reviews=list(reviews)
        # reviews[0]=list(reviews[0])
        
        # reviews[0][3]=reviews[0][3][1:-1]
        # print(reviews[0][3])
        # reviews[0][5]=reviews[0][5][1:-1]
        # print(reviews[0][5])
        # reviews[0][3]=reviews[0][3].split(',')
        # reviews[0][5]=reviews[0][5].split(',')
        
        
        
        # for i in range(len(reviews[0][3])):
        #     reviews[0][3][i]="s"+str(reviews[0][3][i])
        #     reviews[0][5][i]="s"+str(reviews[0][5][i])
        
        cursor = connection.cursor()
        columnSQL = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='TB_PARKING_LOG' ORDER BY ORDINAL_POSITION;" 
        columresult = cursor.execute(columnSQL)
        columnnames=cursor.fetchall()
        
        connection.commit()
        connection.close()
                
        keys=[]
        for columnname in columnnames:
            keys.append(columnname[0])        
                
        resultarray=[]
        
        reviews=list(reviews)
        for i in range(result):
            reviews[i]=list(reviews[i])
            reviews[i][3]=reviews[i][3][1:-1]
            reviews[i][5]=reviews[i][5][1:-1]
            
            reviews[i][3]=reviews[i][3].split(',')
            reviews[i][5]=reviews[i][5].split(',')



            for j in range(len(reviews[i][3])):
                reviews[i][3][j]="s"+str(reviews[i][3][j])
                
            
            for j in range(len(reviews[i][5])):
                reviews[i][5][j]="s"+str(reviews[i][5][j])

            Dict = toDict(reviews[i],keys)
            resultarray.append(Dict)
        
        return Response(Dict)
    
    def post(self, request):
        serializer = ReviewSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.error,status=status.HTTP_400_BAD_REQUEST)
    
class ReviewDetail(APIView):
    def get_object(self,pk):
        try:
            return TbParkingDetailBlue.objects.get(pk=pk)
        except TbParkingDetailBlue.DoesNotExist:
            raise Http404
        
    def get(self, request,pk, format=None):
        review = self.get_object(pk)
        serializer=ReviewSerializer(review)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None):
        review = self.get_object(pk)
        serializer=ReviewSerializer(review, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        review = self.get_object(pk)
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        