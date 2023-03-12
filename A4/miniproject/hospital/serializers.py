from rest_framework import serializers
import random
from .models import Doctor, Patient, Appointment, Admission_Info, Test, Room, user, Treatment
class PatientSerializer(serializers.ModelSerializer):
    PID = serializers.IntegerField(required=True)
    Name = serializers.CharField(max_length=100, required=True)
    Gov_ID = serializers.CharField(max_length=100, required=True)
    Gov_ID_Type = serializers.CharField(max_length=100,required=True)
    Blood_Group = serializers.CharField(max_length=100,required=True)
    def create(self, validated_data):
        T = Patient.objects.create(Name=validated_data.get('Name'),PID=validated_data.get('PID'),Gov_ID=validated_data.get('Gov_ID'),Gov_ID_Type=validated_data.get('Gov_ID_Type'),Blood_Group=validated_data.get('Blood_Group'))
        if(str(validated_data.get('Current_Health')) != "None"):
            T.Current_Health = validated_data.get('Current_Health')
            T.save()
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
    Patient = serializers.SerializerMethodField('patient_name')
    Doctor = serializers.SerializerMethodField('doc_name')
    PID = serializers.SerializerMethodField('patID')
    EID = serializers.SerializerMethodField('docID')
    def to_internal_value(self, data):
        internal_value = super(AppointmentSerializer, self).to_internal_value(data)
        PID_raw = data.get("PID")
        PID_t = PID_raw
        internal_value.update({
            "PID": PID_t
        })
        EID_raw = data.get("EID")
        EID_t = EID_raw
        internal_value.update({
            "EID": EID_t
        })
        Date_raw = data.get("Date")
        Date_t = Date_raw
        internal_value.update({
            "Date": Date_t
        }) 
        return internal_value
    def patID(self, instance):
        return instance.PID.PID
    def docID(self, instance):
        return instance.EID.EID
    def patient_name(self, instance):
        return instance.PID.Name
    def doc_name(self,instance):
        return instance.EID.Name
    def create(self, validated_data):
        T = Appointment.objects.create(AID=validated_data.get('AID'),PID=Patient.objects.get(PID=validated_data.get('PID')),EID=Doctor.objects.get(EID=validated_data.get('EID')),Date=validated_data.get('Date'))
        return T
    class Meta:
        model = Appointment
        fields = (
            'AID',
            'Patient',
            'Doctor',
            'Date',
            'Status',
            'PID',
            'EID'
        )
    def post(self, instance, data):
        instance.try_done()
        instance.save()
        return instance
    def update(self, instance, validated_data):
        # Once the request data has been validated, we can update the todo item instance in the database
        instance.try_done()
        instance.save()
        return instance
class Admission_InfoSerializer(serializers.ModelSerializer):
    IID = serializers.IntegerField(required=True)
    PID = serializers.SerializerMethodField('patID')
    Room_Number = serializers.SerializerMethodField('roomID')
    Patient = serializers.SerializerMethodField('pat_name')
    Current_Health = serializers.SerializerMethodField('health_stat')
    def to_internal_value(self, data):
        internal_value = super(Admission_InfoSerializer, self).to_internal_value(data)
        PID_raw = data.get("PID")
        PID_t = PID_raw
        internal_value.update({
            "PID": PID_t
        })
        RID_raw = data.get("Room_Number")
        RID_t = RID_raw
        internal_value.update({
            "Room_Number": RID_t
        })
        return internal_value
    def patID(self, instance):
        return instance.PID.PID
    def health_stat(self, instance):
        return instance.PID.Current_Health
    def pat_name(self, instance):
        return instance.PID.Name
    def roomID(self, instance):
        return instance.Room_Number.Room_Number
    def create(self, data):
        T = Admission_Info.objects.create(IID=data.get('IID'),PID=Patient.objects.get(PID=data.get('PID')),Room_Number = Room.objects.get(Room_Number=data.get('Room_Number')))
        if(str(data.get('Admit'))!='None'):
            T.Date_of_admission = data.get('Admit')
            T.save()
        T.admit()
        T.save()
        return T
    class Meta:
        model = Admission_Info
        fields = (
            'IID',
            'Patient',
            'Room_Number',
            'Current_Health',
            'PID',
            "Date_of_admission",
            'Date_of_discharge'
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
    TID = serializers.IntegerField(required=True)
    Test_Type = serializers.CharField(required=True)
    Patient_name = serializers.SerializerMethodField('patient')
    Doctor_name = serializers.SerializerMethodField('doctor')
    def doctor(self, instance):
        return instance.EID.Name
    def patient(self, instance):
        return instance.PID.Name
    PID = serializers.SerializerMethodField('patID')
    EID = serializers.SerializerMethodField('docID')
    def to_internal_value(self, data):
        internal_value = super(StatSerializer, self).to_internal_value(data)
        PID_raw = data.get("PID")
        PID_t = PID_raw
        internal_value.update({
            "PID": PID_t
        })
        EID_raw = data.get("EID")
        EID_t = EID_raw
        internal_value.update({
            "EID": EID_t
        })
        return internal_value
    def patID(self, instance):
        return instance.PID.PID
    def docID(self, instance):
        return instance.EID.EID
    class Meta:
        model = Test
        fields = (
            'TID',
            'Patient_name',
            'Doctor_name',
            'Test_Type',
            'Report',
            'PID',
            'EID',
            'Date'
        )
    def create(self, validated_data):
        T = Test.objects.create(TID=validated_data.get('TID'),EID=Doctor.objects.get(EID=validated_data.get('EID')),PID=Patient.objects.get(PID=validated_data.get('PID')),Test_Type=validated_data.get('Test_Type'))
        print(T)
        if(str(validated_data.get('Report'))!='None'):
            T.Report = validated_data.get('Report')
            T.save()
            print(T)
        return T
class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = (
            'EID',
            'Password_hash',
            'role',
            'name',
            'email'
        )
    def create(self, validated_data):
        T = user.objects.create(EID=validated_data.get('EID'),Password_hash=validated_data.get('Password_hash'),role=validated_data.get('role'),name=validated_data.get('name'),email=validated_data.get('email'))
        return T
class TreatmentSerializer(serializers.ModelSerializer):
    Patient = serializers.SerializerMethodField('patient_name')
    Doctor = serializers.SerializerMethodField('doc_name')
    PID = serializers.SerializerMethodField('patID')
    EID = serializers.SerializerMethodField('docID')
    def to_internal_value(self, data):
        internal_value = super(TreatmentSerializer, self).to_internal_value(data)
        PID_raw = data.get("PID")
        PID_t = PID_raw
        internal_value.update({
            "PID": PID_t
        })
        EID_raw = data.get("EID")
        EID_t = EID_raw
        internal_value.update({
            "EID": EID_t
        })
        Info_raw = data.get("Info")
        Info_t = Info_raw
        internal_value.update({
            "Info": Info_t
        })
        Date_raw = data.get("Date")
        Date_t = Date_raw
        internal_value.update({
            "Date": Date_t
        })
        return internal_value
    def patID(self, instance):
        return instance.PID.PID
    def docID(self, instance):
        return instance.EID.EID
    def patient_name(self, instance):
        return instance.PID.Name
    def doc_name(self,instance):
        return instance.EID.Name
    def create(self, validated_data):
        T = Treatment.objects.create(RID=validated_data.get('RID'),PID=Patient.objects.get(PID=validated_data.get('PID')),EID=Doctor.objects.get(EID=validated_data.get('EID')),Info=validated_data.get('Info'))
        return T
    class Meta:
        model = Treatment
        fields = (
            'RID',
            'Patient',
            'Doctor',
            'Date',
            'Status',
            'PID',
            'EID',
            'Info'
        )
    def post(self, instance, data):
        instance.try_done()
        instance.save()
        return instance
    def update(self, instance, validated_data):
        # Once the request data has been validated, we can update the todo item instance in the database
        instance.try_done()
        instance.save()
        return instance
