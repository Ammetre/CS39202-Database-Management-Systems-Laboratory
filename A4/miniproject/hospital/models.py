from django.db import models
from django.utils import timezone
import uuid
import random
import names
from datetime import datetime, date
import math
from django.core.validators import RegexValidator, MaxValueValidator, MinValueValidator
alphanumeric = RegexValidator(r'^[0-9a-zA-Z]*$', 'Only alphanumeric characters are allowed.')
alphabetic = RegexValidator(r'^[a-zA-Z ]*$', 'Only alphabetic characters are allowed.')
# Create your models here.
class Patient(models.Model):
    BloodGroupType = models.TextChoices('BlooodGroupType', 'A+ A- B+ B- AB+ AB- O+ O-')
    PID = models.BigIntegerField(unique=True,primary_key=True)
    Name = models.CharField(max_length = 100, default=names.get_full_name())
    Gov_ID = models.CharField(max_length = 25, unique=True,validators=[alphanumeric])
    Gov_ID_Type = models.CharField(max_length=25, validators=[alphabetic])
    Blood_Group = models.CharField(blank=True,null=True,choices=BloodGroupType.choices, max_length=5)
    Blood_Report_ID = models.ForeignKey('Test', on_delete=models.CASCADE,to_field='Report_File')
class Admission_Info(models.Model):
    IID = models.BigIntegerField(unique=True,primary_key=True)
    PID = models.ForeignKey(Patient,on_delete=models.CASCADE, field='PID')
    Room_Number = models.ForeignKey('Room',on_delete=models.CASCADE, field='Room_Number')
    Date_of_admission = models.DateTimeField(default=datetime.now)
    Date_of_discharge = models.DateTimeField(null=True)
class Doctor(models.Model):
    EID = models.BigIntegerField(unique=True,primary_key=True)
    Specialization = models.CharField(max_length = 100)
    Name = models.CharField(max_length = 100, default = names.get_full_name())
    Chamber_Number = models.CharField(unique=True)
    Day_Availability = models.PositiveSmallIntegerField(validators=[MaxValueValidator(127), MinValueValidator(0)])
class Appointment(models.Model):
    StatusType = models.TextChoices('StatusType', 'Done Pending')
    AID = models.BigIntegerField(unique=True, primary_key=True)
    PID = models.ForeignKey(Patient, on_delete=models.CASCADE, to_field='PID')
    EID = models.ForeignKey(Doctor, on_delete=models.CASCADE, to_field='EID')
    RID = models.ForeignKey('Treatment', on_delete=models.CASCADE, to_field='RID')
    Date = models.DateField(default=date.today)
    Status = models.CharField(choices = StatusType.choices, max_length=10)
class Test(models.Model):
    TID = models.BigIntegerField(unique=True, primary_key = True)
    PID = models.ForeignKey(Patient, on_delete= models.CASCADE, to_field='PID')
    EID = models.ForeignKey(Doctor,on_delete=models.CASCADE,to_field='EID')
    Date = models.DateField(default=date.today)
    StatusType = models.TextChoices('StatusType', 'Finished Pending')
    Status = models.CharField(choices=StatusType.choices, max_length=15)
    Test_Type = models.CharField(max_length=100)
    Report_File = models.FileField(upload_to='uploads/%Y/%m/%d')
class Treatments(models.Model):
    RID = models.BigIntegerField(unique=True, primary_key=True)
    Info = models.CharField(max_length=1000)
class Room(models.Model):
    Room_Number = models.BigIntegerField(unique=True,primary_key=True)
    Availability = models.BooleanField(default=True)