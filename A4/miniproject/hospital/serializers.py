from rest_framework import serializers
import random
from .models import Doctor, Patient, Appointment, Admission_Info
class DoctorSerializer(serializers.ModelSerializer):
    PID = serializers.IntegerField(required=True)
    Name = serializers.CharField(max_length=100, required=True)
    Gov_ID = serializers.CharField(max_length=100, required=True)
    Gov_ID_Type = serializers.CharField(max_length=100,required=True)
    BloodGroup = serializers.CharField(max_length=100,required=True)
    def create(self, validated_data):
        T = Patient.objects.create(Name=validated_data.get('Name'),PID=validated_data.get('PID'),Gov_ID=validated_data.get('Gov_ID'),Gov_ID_Type=validated_data.get('Gov_ID_Type'),BloodGroup=validated_data.get('BloodGroup'))
        return T
    class Meta:
        model = Patient
        fields = (
            'PID',
            'Name',
            'BloodGroup',
            'Gov_ID',
            'Gov_ID_Type',
            'Current_Health'
        )
    