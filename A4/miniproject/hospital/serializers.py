from rest_framework import serializers
import random
from .models import Doctor, Patient, Appointment, Admission_Info, Test, Room
class PatientSerializer(serializers.ModelSerializer):
    PID = serializers.IntegerField(required=True)
    Name = serializers.CharField(max_length=100, required=True)
    Gov_ID = serializers.CharField(max_length=100, required=True)
    Gov_ID_Type = serializers.CharField(max_length=100,required=True)
    Blood_Group = serializers.CharField(max_length=100,required=True)
    def create(self, validated_data):
        T = Patient.objects.create(Name=validated_data.get('Name'),PID=validated_data.get('PID'),Gov_ID=validated_data.get('Gov_ID'),Gov_ID_Type=validated_data.get('Gov_ID_Type'),Blood_Group=validated_data.get('Blood_Group'))
        return T
    class Meta:
        model = Patient
        fields = (
            'PID',
            'Name',
            'Blood_Group',
            'Gov_ID',
            'Gov_ID_Type',
            'Current_Health'
        )
    def update(self, instance, validated_data):
        # Once the request data has been validated, we can update the todo item instance in the database
        if(str(validated_data.get('Current_Health')) != "None"):
            instance.Current_Health=validated_data.get('Current_Health')
        if(str(validated_data.get('Blood_Group')) != "None"):
            instance.Blood_Group=validated_data.get('Blood_Group')
        if(str(validated_data.get('Name')) != "None"):
            instance.Name=validated_data.get('Name')
        instance.save()
        return instance
class DoctorSerializer(serializers.ModelSerializer):
    EID = serializers.IntegerField(required=True)
    Name = serializers.CharField(max_length=100, required=True)
    Specialization = serializers.CharField(max_length=100, required=True)
    Chamber_Number = serializers.IntegerField(required=True)
    Day_Availability = serializers.IntegerField(required=True)
    def create(self, validated_data):
        T = Doctor.objects.create(Name=validated_data.get('Name'),EID=validated_data.get('EID'),Specialization=validated_data.get('Specialization'),Chamber_Number=validated_data.get('Chamber_Number'),Day_Availability=validated_data.get('Day_Availability'))
        return T
    class Meta:
        model = Doctor
        fields = (
            'EID',
            'Specialization',
            'Name',
            'Chamber_Number',
            'Day_Availability',
        )
    def update(self, instance, validated_data):
        # Once the request data has been validated, we can update the todo item instance in the database
        instance.Name = validated_data.get('Name', instance.Name)
        instance.save()
        return instance
class AppointmentSerializer(serializers.ModelSerializer):
    Remedy = serializers.SerializerMethodField('remedy_name')
    Patient = serializers.SerializerMethodField('patient_name')
    Doctor = serializers.SerializerMethodField('doc_name')
    def patient_name(self, instance):
        return instance.PID.Name
    def doc_name(self,instance):
        return instance.EID.Name
    def remedy_name(self, instance):
        if(instance.RID):
            return instance.RID.Info
        else:
            return 'Untreated'
    def create(self, validated_data):
        T = Appointment.objects.create(AID=validated_data.get('AID'),PID=Patient.objects.get(PID=validated_data.get('PID')),EID=Doctor.objects.get(EID=validated_data.get('EID')))
        return T
    class Meta:
        model = Appointment
        fields = (
            'AID',
            'Patient',
            'Doctor',
            'Date',
            'Status',
            'Remedy'
        )
    def post(self, instance, data):
        I = data.get('Perform')
        K = data.get('Remedy')
        try:
            i = int(I)
        except:
            instance.try_done(K)
            instance.save()
            return instance
        if(i):
            J = data.get('Date')
            instance.Date=J
            instance.try_done(K)
            instance.save()
        return instance
    def update(self, instance, validated_data):
        # Once the request data has been validated, we can update the todo item instance in the database
        I = validated_data.get('Perform')
        K = validated_data.get('Remedy')
        try:
            i = int(I)
        except:
            instance.try_done(K)
            instance.save()
            return instance
        if(i):
            J = validated_data.get('Date')
            instance.Date=J
            instance.try_done(K)
            instance.save()
        return instance
class Admission_InfoSerializer(serializers.ModelSerializer):
    IID = serializers.IntegerField(required=True)
    PID = serializers.IntegerField(required=True)
    Room_Number = serializers.IntegerField(required=True)
    def create(self, validated_data):
        T = Admission_Info.objects.create(IID=validated_data.get('IID'),PID=Patient.objects.get(PID=validated_data.get('PID')),Room_Number = Room.objects.get(Room_Number=validated_data.get('Room_Number')))
        if(str(validated_data.get('Admit'))!='None'):
            T.Date_of_admission = validated_data.get('Admit')
        T.admit()
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
    def post(self, instance, data):
        instance.discharge()
        instance.save()
        return instance
    def update(self, instance, validated_data):
        # Once the request data has been validated, we can update the todo item instance in the database
        instance.discharge()
        instance.save()
        return instance
class StatSerializer(serializers.ModelSerializer):
    Patient_name = serializers.SerializerMethodField('patient')
    Doctor_name = serializers.SerializerMethodField('doctor')
    def doctor(self):
        return self.EID.Name
    def patient(self):
        return self.PID.Name
    class Meta:
        model = Test
        fields = (
            'TID',
            'Patient_name',
            'Doctor_name',
            'Status',
            'Test_Type',
            'Report_File',
        )
