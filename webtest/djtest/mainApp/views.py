from ast import Or
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404

from .serializers import ReviewSerializer
from .models import TbParkingDetailBlue

from django.db import connection
# Create your views here.
def toDict(queryResult,columnResult):
    if queryResult ==None or columnResult==None:
        return None
    Dict = dict(zip(columnResult, queryResult))
    return Dict


class ReviewList(APIView):

    def get(self, request):
        reviews = TbParkingDetailBlue.objects.all()
        cursor = connection.cursor()
        strSQL = "select * from TB_PARKING_DETAIL_BLUE"
        result = cursor.execute(strSQL)
        reviews = cursor.fetchall()
        
        connection.commit()
        connection.close()
        
        
        cursor = connection.cursor()
        columnSQL = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='tb_parking_detail_blue' ORDER BY ORDINAL_POSITION;" 
        columresult = cursor.execute(columnSQL)
        columnnames=cursor.fetchall()
        
        connection.commit()
        connection.close()
        
        # print(result)
        keys=[]
        for columnname in columnnames:
            keys.append(columnname[0])
        
        print(keys)
        print(reviews)            
        Dict = toDict(reviews[0],keys)
        
        emptySpots=0
        totalSpots=0
        emptySpotList=[]
        parkedSpotList=[]
        tmpDict={}
        for key, value in (Dict.items()):
            if key[0]=='s':
                if value==0:
                    emptySpots+=1
                    emptySpotList.append(key)    
                totalSpots+=1
            else:
                tmpDict[key]=value
            
                
        tmpDict['emptySpotNow'] = emptySpots
        tmpDict['totalSpot'] = totalSpots
        tmpDict['emptySpotList'] = emptySpotList
        return Response(tmpDict)
    
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
        