from django.db import models

# Create your models here.

class Review(models.Model):
    title = models.CharField((""), max_length=50)
    content = models.TextField()
    updated_at = models.DateTimeField(auto_now=True)
    


class TbParkingDetailBlue(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.     
    time = models.DateTimeField(db_column='TIME', blank=True, null=True)  # Field name made lowercase.
    s1 = models.IntegerField(blank=True, null=True)
    s2 = models.IntegerField(blank=True, null=True)
    s3 = models.IntegerField(blank=True, null=True)
    s4 = models.IntegerField(blank=True, null=True)
    s5 = models.IntegerField(blank=True, null=True)
    s6 = models.IntegerField(blank=True, null=True)
    s7 = models.IntegerField(blank=True, null=True)
    s8 = models.IntegerField(blank=True, null=True)
    s9 = models.IntegerField(blank=True, null=True)
    s10 = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tb_parking_detail_blue'


class TbParkingDetail(models.Model):
    parking_name = models.CharField(max_length=45, blank=True, null=True)
    normal_slots = models.CharField(max_length=45, blank=True, null=True)
    special_slots = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'TB_PARKING_DETAIL'


class TbParkingLog(models.Model):
    time = models.DateTimeField(db_column='TIME', primary_key=True)  # Field name made lowercase.
    zone_id = models.CharField(db_column='ZONE_ID', max_length=45)  # Field name made lowercase.
    total_spots = models.CharField(db_column='TOTAL_SPOTS', max_length=45, blank=True, null=True)  # Field name made lowercase.
    equiped_spots = models.CharField(db_column='EQUIPED_SPOTS', max_length=45, blank=True, null=True)  # Field name made lowercase.
    equiped_spots_list = models.CharField(db_column='EQUIPED_SPOTS_LIST', max_length=45, blank=True, null=True)  # Field name made lowercase.
    empty_spots_list = models.CharField(db_column='EMPTY_SPOTS_LIST', max_length=45, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'TB_PARKING_LOG'
        unique_together = (('time', 'zone_id'),)


class TbParkingMain(models.Model):
    serial_id = models.CharField(primary_key=True, max_length=45)
    parking_name = models.CharField(max_length=45, blank=True, null=True)
    latitude = models.CharField(max_length=45, blank=True, null=True)
    longitude = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'TB_PARKING_MAIN'