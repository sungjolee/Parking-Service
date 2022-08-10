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



####################################
# 맵페이지용 토탈 데이터
########################
#
#
#
#
class TotalData(APIView):

    
    def get(self, request):
        reviews = TbParkingLog.objects.all()
        cursor = connection.cursor()
        strSQL = "select * from VW_MAPVIEW"
        result = cursor.execute(strSQL)
        reviews = cursor.fetchall()
        
        connection.commit()
        connection.close()

        
        cursor = connection.cursor()
        columnSQL = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='VW_MAPVIEW' ORDER BY ORDINAL_POSITION;" 
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

            Dict = toDict(reviews[i],keys)
            resultarray.append(Dict)
        
        return Response(resultarray)

def toDict(queryResult,columnResult):
    if queryResult ==None or columnResult==None:
        return None
    Dict = dict(zip(columnResult, queryResult))
    return Dict


class ReviewList(APIView):

    def get(self, request):
        reviews = TbParkingLog.objects.all()
        cursor = connection.cursor()
        st = request.GET.get("ID")
        strSQL = f"\
                SELECT A.NAME, C.* \
                FROM\
	                TB_PARKING_MAIN A,\
                    TB_PARKING_DETAIL B,\
                    TB_PARKING_LOG C\
                WHERE A.ID=B.ID\
                AND B.SERIAL_ID=C.SERIAL_ID\
                AND A.ID='{st}'\
                ORDER BY TIME DESC\
                LIMIT 1"
        result = cursor.execute(strSQL)
        reviews = cursor.fetchall()
        

        connection.commit()
        connection.close()
        reviews=list(reviews)


        keys=["NAME","TIME","SERIAL_ID"]
   
                
        resultarray=[]
        
        reviews=list(reviews)
        for i in range(result):
            reviews[i]=list(reviews[i])

            reviews[i][6]=reviews[i][6].split(',')
            reviews[i][5]=reviews[i][5].split(',')



            for j in range(len(reviews[i][6])):
                reviews[i][6][j]="s"+str(reviews[i][6][j])
                
            
            for j in range(len(reviews[i][5])):
                reviews[i][5][j]="s"+str(reviews[i][5][j])
                
            parkingZoneDictArray =[]
            for j in reviews[i][5]:
                tmpdic = {
                    "ID":int(j[1:]),
                    "value":"OCCUPIED"
                }
                parkingZoneDictArray.append(tmpdic)
            for j in reviews[i][6]:
                tmpdic = {
                    "ID":int(j[1:]),
                    "value":"ENABLE"
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
        
        
        
        
        
        return Response(Dict)
    
    # def post(self, request):
    #     serializer = ReviewSerializer(data = request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data,status=status.HTTP_201_CREATED)
    #     return Response(serializer.error,status=status.HTTP_400_BAD_REQUEST)
    
# class ReviewDetail(APIView):
#     def get_object(self,pk):
#         try:
#             return TbParkingDetailBlue.objects.get(pk=pk)
#         except TbParkingDetailBlue.DoesNotExist:
#             raise Http404
        
#     def get(self, request,pk, format=None):
#         review = self.get_object(pk)
#         serializer=ReviewSerializer(review)
#         return Response(serializer.data)
    
#     def put(self, request, pk, format=None):
#         review = self.get_object(pk)
#         serializer=ReviewSerializer(review, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
#     def delete(self, request, pk, format=None):
#         review = self.get_object(pk)
#         review.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
        