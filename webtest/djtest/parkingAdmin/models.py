from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.



class TbParkingDetail(models.Model):
    serial_id = models.CharField(db_column='SERIAL_ID', primary_key=True, max_length=45)  # Field name made lowercase.
    id = models.CharField(db_column='ID', max_length=45, blank=True, null=True)  # Field name made lowercase.
    totalspots = models.CharField(db_column='TOTALSPOTS', max_length=45, blank=True, null=True)  # Field name made lowercase.
    enable = models.IntegerField(db_column='ENABLE', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'TB_PARKING_DETAIL'


class TbParkingLog(models.Model):
    time = models.DateTimeField(db_column='TIME', primary_key=True)  # Field name made lowercase.
    serial_id = models.CharField(db_column='SERIAL_ID', max_length=45)  # Field name made lowercase.
    enable = models.IntegerField(db_column='ENABLE', blank=True, null=True)  # Field name made lowercase.
    ocupiedlist = models.CharField(db_column='OCUPIEDLIST', max_length=45, blank=True, null=True)  # Field name made lowercase.
    total = models.IntegerField(db_column='TOTAL', blank=True, null=True)  # Field name made lowercase.
    enablelist = models.CharField(db_column='ENABLELIST', max_length=45, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'TB_PARKING_LOG'
        unique_together = (('time', 'serial_id'),)


class TbParkingMain(models.Model):
    id = models.CharField(db_column='ID', primary_key=True, max_length=45)  # Field name made lowercase.
    name = models.CharField(db_column='NAME', max_length=45, blank=True, null=True)  # Field name made lowercase.
    latitude = models.CharField(db_column='LATITUDE', max_length=45, blank=True, null=True)  # Field name made lowercase.
    longitude = models.CharField(db_column='LONGITUDE', max_length=45, blank=True, null=True)  # Field name made lowercase.
    admin = models.CharField(db_column='ADMIN', max_length=45, blank=True, null=True)  # Field name made lowercase.
    owner = models.CharField(db_column='OWNER', max_length=45, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'TB_PARKING_MAIN'
        
        # askcompany/accounts/models.py

class TbParkingLogCount(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    serial_id = models.CharField(db_column='SERIAL_ID', max_length=45, blank=True, null=True)  # Field name made lowercase.
    zonenum = models.CharField(db_column='ZONENUM', max_length=45, blank=True, null=True)  # Field name made lowercase.
    in_time = models.DateTimeField(db_column='IN_TIME', blank=True, null=True)  # Field name made lowercase.
    out_time = models.DateTimeField(db_column='OUT_TIME', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'TB_PARKING_LOG_COUNT'



class User(AbstractUser):
    website_url = models.URLField(blank=True)
    bio = models.TextField(blank=True)