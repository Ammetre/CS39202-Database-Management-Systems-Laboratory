from django.db import models
from django.conf import settings
from django.utils import timezone
import uuid
import random
import names
from datetime import datetime, date
import math
from django.core.validators import RegexValidator, MaxValueValidator, MinValueValidator
from django.core.files.base import ContentFile, File
import os
alphanumeric = RegexValidator(r'^[0-9a-zA-Z]*$', 'Only alphanumeric characters are allowed.')
alphabetic = RegexValidator(r'^[a-zA-Z ]*$', 'Only alphabetic characters are allowed.')
# Create your models here.
class Patient(models.Model):
    BloodGroupType = models.TextChoices('BloodGroupType', 'A+ A- B+ B- AB+ AB- O+ O-')
    PID = models.BigIntegerField(unique=True,primary_key=True)
    Name = models.CharField(max_length = 100, default=names.get_full_name)
    Gov_ID = models.CharField(max_length = 25, unique=True,validators=[alphanumeric])
    Gov_ID_Type = models.CharField(max_length=25, validators=[alphabetic])
    Blood_Group = models.CharField(blank=True,null=True,choices=BloodGroupType.choices, max_length=5)
    Current_Health = models.CharField(max_length=1023, default='Healthy')
    def __str__(self):
        return str(self.PID)+": "+self.Name
class Admission_Info(models.Model):
    IID = models.BigIntegerField(unique=True,primary_key=True)
    PID = models.ForeignKey(Patient,on_delete=models.CASCADE, to_field='PID')
    Room_Number = models.ForeignKey('Room',on_delete=models.CASCADE, to_field='Room_Number')
    Date_of_admission = models.DateField(default=date.today)
    Date_of_discharge = models.DateField(null=True)
    def __str__(self):
        return str(self.IID)
    def admit(self):
        self.Date_of_discharge = None
        self.Room_Number.occupy()
        self.Room_Number.save() 
        return
    def discharge(self):
        self.Date_of_discharge = date.today()
        self.Room_Number.unoccupy()
        self.Room_Number.save()
        return
class Doctor(models.Model):
    EID = models.BigIntegerField(unique=True,primary_key=True)
    Specialization = models.CharField(max_length = 100)
    Name = models.CharField(max_length = 100, default = names.get_full_name)
    Chamber_Number = models.BigIntegerField(unique=True)
    Day_Availability = models.PositiveSmallIntegerField(validators=[MaxValueValidator(127), MinValueValidator(0)])
    def __str__(self) -> str:
        return str(self.EID)+": Dr. "+self.Name
class Test(models.Model):
    TID = models.BigIntegerField(unique=True, primary_key = True)
    PID = models.ForeignKey(Patient, on_delete= models.CASCADE, to_field='PID')
    EID = models.ForeignKey(Doctor,on_delete=models.CASCADE,to_field='EID')
    Date = models.DateField(default=date.today)
    Test_Type = models.CharField(max_length=100)
    Report = models.CharField(max_length=4095, default='')
    def __str__(self) -> str:
        return str(self.Report)
class Treatment(models.Model):
    RID = models.BigIntegerField(unique=True, primary_key=True)
    PID = models.ForeignKey(Patient, on_delete=models.CASCADE, to_field='PID', null=True)
    EID = models.ForeignKey(Doctor, on_delete=models.CASCADE, to_field='EID', null=True)
    Info = models.CharField(max_length=1000)
    StatusType = models.TextChoices('StatusType', 'Done Pending')
    Status = models.CharField(max_length=20, choices=StatusType.choices, default='Pending')
    Date = models.DateField(default=date.today)
    def __str__(self) -> str:
        return str(self.RID)
    def try_done(self):
        if(date.today() >= self.Date):
            self.Status = 'Done'
        else:
            pass
        return
class Room(models.Model):
    Room_Number = models.BigIntegerField(unique=True,primary_key=True)
    Availability = models.BooleanField(default=True)
    def __str__(self) -> str:
        return str(self.Room_Number)
    def occupy(self):
        self.Availability = False
        return
    def unoccupy(self):
        self.Availability = True
        return
class user(models.Model):
    EID = models.BigIntegerField(unique=True,primary_key=True)
    name = models.CharField(max_length=100,default=names.get_first_name)
    email = models.EmailField(null=True, max_length=100)
    Password_hash = models.CharField(max_length=255)
    roleType = models.TextChoices('roleType','admin doctor front_desk data_entry')
    role = models.CharField(choices = roleType.choices, max_length=30)
    def __str__(self) -> str:
        return str(self.EID)
class Appointment(models.Model):
    StatusType = models.TextChoices('StatusType', 'Done Pending')
    AID = models.BigIntegerField(unique=True, primary_key=True)
    PID = models.ForeignKey(Patient, on_delete=models.CASCADE, to_field='PID')
    EID = models.ForeignKey(Doctor, on_delete=models.CASCADE, to_field='EID')
    Date = models.DateField(default=date.today)
    Status = models.CharField(choices = StatusType.choices, max_length=10, default = 'Pending')
    def __str__(self):
        return str(self.AID)
    def try_done(self):
        if(date.today() >= self.Date):
            self.Status = 'Done'
        else:
            pass
        return