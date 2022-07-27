from django.db import models

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


class TbParkingMain(models.Model):
    name = models.CharField(db_column='NAME', max_length=45)  # Field name made lowercase.    
    latitude = models.CharField(max_length=45)
    longitude = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'tb_parking_main'