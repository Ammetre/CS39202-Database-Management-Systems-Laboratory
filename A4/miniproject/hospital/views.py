from urllib import response
from django.http import HttpResponse
from django.shortcuts import redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.mixins import UpdateModelMixin, DestroyModelMixin

from .models import Patient, Doctor, Admission_Info, Appointment
from .serializers import PatientSerializer, DoctorSerializer, Admission_InfoSerializer, AppointmentSerializer, StatSerializer
class Index(
    APIView,
    UpdateModelMixin,
    DestroyModelMixin,
):
    def get(self, request):
        return Response('WAOW',status=200)
class PatientView(
  APIView, # Basic View class provided by the Django Rest Framework
  UpdateModelMixin, # Mixin that allows the basic APIView to handle PUT HTTP requests
  DestroyModelMixin, # Mixin that allows the basic APIView to handle DELETE HTTP requests
):

    def get(self, request, id=None):
        if id:
        # If an id is provided in the GET request, retrieve the Tournament item by that id
            try:
        # Check if the tournament the user wants to update exists
                queryset = Patient.objects.get(PID=id)
            except Patient.DoesNotExist:
            # If the tournament does not exist, return an error response
                return Response({'errors': 'This Patient does not exist.'}, status=400)

        # Serialize tournament item from Django queryset object to JSON formatted data
            read_serializer = PatientSerializer(queryset)

        else:
        # Get all tournament items from the database using Django's model ORM
            queryset = Patient.objects.all()

        # Serialize list of tournament from Django queryset object to JSON formatted data
            read_serializer = PatientSerializer(queryset, many=True)

        # Return a HTTP response object with the list of todo items as JSON
        return Response(read_serializer.data)
    def post(self, request):
        # Pass JSON data from user POST request to serializer for validation
        create_serializer = PatientSerializer(data=request.data)

        # Check if user POST data passes validation checks from serializer
        if create_serializer.is_valid():

        # If user data is valid, create a new todo item record in the database
            todo_item_object = create_serializer.save()

        # Serialize the new todo item from a Python object to JSON format
            read_serializer = PatientSerializer(todo_item_object)

        # Return a HTTP response with the newly created todo item data
            return Response(read_serializer.data, status=201)

        # If the users POST data is not valid, return a 400 response with an error message
        return Response(create_serializer.errors, status=400)
    def put(self, request, id=None):
        try:
      # Check if the todo item the user wants to update exists
            todo_item = Patient.objects.get(PID=id)
        except Patient.DoesNotExist:
      # If the todo item does not exist, return an error response
            return Response({'errors': 'This patient does not exist.'}, status=400)

    # If the todo item does exists, use the serializer to validate the updated data
        update_serializer = PatientSerializer(todo_item, data=request.data)

    # If the data to update the todo item is valid, proceed to saving data to the database
        if update_serializer.is_valid():

      # Data was valid, update the todo item in the database
            todo_item_object = update_serializer.save()

      # Serialize the todo item from Python object to JSON format
            read_serializer = PatientSerializer(todo_item_object)

      # Return a HTTP response with the newly updated todo item
            return Response(read_serializer.data, status=200)

    # If the update data is not valid, return an error response
        return Response(update_serializer.errors, status=400)
    def delete(self, request, id=None):
        try:
      # Check if the todo item the user wants to update exists
            todo_item = Patient.objects.get(PID=id)
        except Patient.DoesNotExist:
      # If the todo item does not exist, return an error response
            return Response({'errors': 'This patient does not exist.'}, status=400)

    # Delete the chosen todo item from the database
        todo_item.delete()

    # Return a HTTP response notifying that the todo item was successfully deleted
        return Response(status=204)    
class DoctorView(
  APIView, # Basic View class provided by the Django Rest Framework
  UpdateModelMixin, # Mixin that allows the basic APIView to handle PUT HTTP requests
  DestroyModelMixin, # Mixin that allows the basic APIView to handle DELETE HTTP requests
):

    def get(self, request, id=None):
        if id:
        # If an id is provided in the GET request, retrieve the Tournament item by that id
            try:
        # Check if the tournament the user wants to update exists
                queryset = Doctor.objects.get(EID=id)
            except Doctor.DoesNotExist:
            # If the tournament does not exist, return an error response
                return Response({'errors': 'This Doctor does not exist.'}, status=400)

        # Serialize tournament item from Django queryset object to JSON formatted data
            read_serializer = DoctorSerializer(queryset)

        else:
        # Get all tournament items from the database using Django's model ORM
            queryset = Doctor.objects.all()

        # Serialize list of tournament from Django queryset object to JSON formatted data
            read_serializer = DoctorSerializer(queryset, many=True)

        # Return a HTTP response object with the list of todo items as JSON
        return Response(read_serializer.data)
    def post(self, request):
        # Pass JSON data from user POST request to serializer for validation
        create_serializer = DoctorSerializer(data=request.data)

        # Check if user POST data passes validation checks from serializer
        if create_serializer.is_valid():

        # If user data is valid, create a new todo item record in the database
            todo_item_object = create_serializer.save()

        # Serialize the new todo item from a Python object to JSON format
            read_serializer = DoctorSerializer(todo_item_object)

        # Return a HTTP response with the newly created todo item data
            return Response(read_serializer.data, status=201)

        # If the users POST data is not valid, return a 400 response with an error message
        return Response(create_serializer.errors, status=400)
    def put(self, request, id=None):
        try:
      # Check if the todo item the user wants to update exists
            todo_item = Doctor.objects.get(EID=id)
        except Doctor.DoesNotExist:
      # If the todo item does not exist, return an error response
            return Response({'errors': 'This Doctor does not exist.'}, status=400)

    # If the todo item does exists, use the serializer to validate the updated data
        update_serializer = DoctorSerializer(todo_item, data=request.data)

    # If the data to update the todo item is valid, proceed to saving data to the database
        if update_serializer.is_valid():

      # Data was valid, update the todo item in the database
            todo_item_object = update_serializer.save()

      # Serialize the todo item from Python object to JSON format
            read_serializer = DoctorSerializer(todo_item_object)

      # Return a HTTP response with the newly updated todo item
            return Response(read_serializer.data, status=200)

    # If the update data is not valid, return an error response
        return Response(update_serializer.errors, status=400)
    def delete(self, request, id=None):
        try:
      # Check if the todo item the user wants to update exists
            todo_item = Doctor.objects.get(EID=id)
        except Doctor.DoesNotExist:
      # If the todo item does not exist, return an error response
            return Response({'errors': 'This Doctor does not exist.'}, status=400)

    # Delete the chosen todo item from the database
        todo_item.delete()

    # Return a HTTP response notifying that the todo item was successfully deleted
        return Response(status=204) 
class AppointmentView(
  APIView, # Basic View class provided by the Django Rest Framework
  UpdateModelMixin, # Mixin that allows the basic APIView to handle PUT HTTP requests
  DestroyModelMixin, # Mixin that allows the basic APIView to handle DELETE HTTP requests
):

    def get(self, request, id=None):
        if id:
        # If an id is provided in the GET request, retrieve the Tournament item by that id
            try:
        # Check if the tournament the user wants to update exists
                queryset = Appointment.objects.get(AID=id)
            except Appointment.DoesNotExist:
            # If the tournament does not exist, return an error response
                return Response({'errors': 'This Appointment does not exist.'}, status=400)

        # Serialize tournament item from Django queryset object to JSON formatted data
            read_serializer = AppointmentSerializer(queryset)

        else:
        # Get all tournament items from the database using Django's model ORM
            queryset = Appointment.objects.all()

        # Serialize list of tournament from Django queryset object to JSON formatted data
            read_serializer = AppointmentSerializer(queryset, many=True)

        # Return a HTTP response object with the list of todo items as JSON
        return Response(read_serializer.data)
    def post(self, request):
        # Pass JSON data from user POST request to serializer for validation
        create_serializer = AppointmentSerializer(data=request.data)

        # Check if user POST data passes validation checks from serializer
        if create_serializer.is_valid():

        # If user data is valid, create a new todo item record in the database
            todo_item_object = create_serializer.save()

        # Serialize the new todo item from a Python object to JSON format
            read_serializer = AppointmentSerializer(todo_item_object)

        # Return a HTTP response with the newly created todo item data
            return Response(read_serializer.data, status=201)

        # If the users POST data is not valid, return a 400 response with an error message
        return Response(create_serializer.errors, status=400)
    def put(self, request, id=None):
        try:
      # Check if the todo item the user wants to update exists
            todo_item = Appointment.objects.get(AID=id)
        except Appointment.DoesNotExist:
      # If the todo item does not exist, return an error response
            return Response({'errors': 'This Appointment does not exist.'}, status=400)

    # If the todo item does exists, use the serializer to validate the updated data
        update_serializer = AppointmentSerializer(todo_item, data=request.data)

    # If the data to update the todo item is valid, proceed to saving data to the database
        if update_serializer.is_valid():

      # Data was valid, update the todo item in the database
            todo_item_object = update_serializer.save()

      # Serialize the todo item from Python object to JSON format
            read_serializer = AppointmentSerializer(todo_item_object)

      # Return a HTTP response with the newly updated todo item
            return Response(read_serializer.data, status=200)

    # If the update data is not valid, return an error response
        return Response(update_serializer.errors, status=400)
    def delete(self, request, id=None):
        try:
      # Check if the todo item the user wants to update exists
            todo_item = Appointment.objects.get(AID=id)
        except Appointment.DoesNotExist:
      # If the todo item does not exist, return an error response
            return Response({'errors': 'This Appointment does not exist.'}, status=400)

    # Delete the chosen todo item from the database
        todo_item.delete()

    # Return a HTTP response notifying that the todo item was successfully deleted
        return Response(status=204)
class Admission_InfoView(
  APIView, # Basic View class provided by the Django Rest Framework
  UpdateModelMixin, # Mixin that allows the basic APIView to handle PUT HTTP requests
  DestroyModelMixin, # Mixin that allows the basic APIView to handle DELETE HTTP requests
):

    def get(self, request, id=None):
        if id:
        # If an id is provided in the GET request, retrieve the Tournament item by that id
            try:
        # Check if the tournament the user wants to update exists
                queryset = Admission_Info.objects.get(IID=id)
            except Admission_Info.DoesNotExist:
            # If the tournament does not exist, return an error response
                return Response({'errors': 'This Admission_Info does not exist.'}, status=400)

        # Serialize tournament item from Django queryset object to JSON formatted data
            read_serializer = Admission_InfoSerializer(queryset)

        else:
        # Get all tournament items from the database using Django's model ORM
            queryset = Admission_Info.objects.all()

        # Serialize list of tournament from Django queryset object to JSON formatted data
            read_serializer = Admission_InfoSerializer(queryset, many=True)

        # Return a HTTP response object with the list of todo items as JSON
        return Response(read_serializer.data)
    def post(self, request):
        # Pass JSON data from user POST request to serializer for validation
        create_serializer = Admission_InfoSerializer(data=request.data)

        # Check if user POST data passes validation checks from serializer
        if create_serializer.is_valid():

        # If user data is valid, create a new todo item record in the database
            todo_item_object = create_serializer.save()

        # Serialize the new todo item from a Python object to JSON format
            read_serializer = Admission_InfoSerializer(todo_item_object)

        # Return a HTTP response with the newly created todo item data
            return Response(read_serializer.data, status=201)

        # If the users POST data is not valid, return a 400 response with an error message
        return Response(create_serializer.errors, status=400)
    def put(self, request, id=None):
        try:
      # Check if the todo item the user wants to update exists
            todo_item = Admission_Info.objects.get(IID=id)
        except Admission_Info.DoesNotExist:
      # If the todo item does not exist, return an error response
            return Response({'errors': 'This Admission_Info does not exist.'}, status=400)

    # If the todo item does exists, use the serializer to validate the updated data
        update_serializer = Admission_InfoSerializer(todo_item, data=request.data)

    # If the data to update the todo item is valid, proceed to saving data to the database
        if update_serializer.is_valid():

      # Data was valid, update the todo item in the database
            todo_item_object = update_serializer.save()

      # Serialize the todo item from Python object to JSON format
            read_serializer = Admission_InfoSerializer(todo_item_object)

      # Return a HTTP response with the newly updated todo item
            return Response(read_serializer.data, status=200)

    # If the update data is not valid, return an error response
        return Response(update_serializer.errors, status=400)
    def delete(self, request, id=None):
        try:
      # Check if the todo item the user wants to update exists
            todo_item = Admission_Info.objects.get(IID=id)
        except Admission_Info.DoesNotExist:
      # If the todo item does not exist, return an error response
            return Response({'errors': 'This Admission_Info does not exist.'}, status=400)

    # Delete the chosen todo item from the database
        todo_item.delete()

    # Return a HTTP response notifying that the todo item was successfully deleted
        return Response(status=204)
class StatView(
  APIView, # Basic View class provided by the Django Rest Framework
  UpdateModelMixin, # Mixin that allows the basic APIView to handle PUT HTTP requests
  DestroyModelMixin, # Mixin that allows the basic APIView to handle DELETE HTTP requests
):

    def get(self, request, id=None):
        if id:
        # If an id is provided in the GET request, retrieve the Match item by that id
            try:
        # Check if the tournament the user wants to update exists
                t = Patient.objects.get(PID=id)
                queryset = []
                for q in t.test_set.all():
                    queryset.append(q)
            except Patient.DoesNotExist:
            # If the tournament does not exist, return an error response
                return Response({'errors': 'This todo item does not exist.'}, status=400)

        # Serialize tournament item from Django queryset object to JSON formatted data
            read_serializer = StatSerializer(queryset, many=True)

        # Return a HTTP response object with the list of todo items as JSON
        return Response(read_serializer.data)