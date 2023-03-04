from urllib import response
from django.http import HttpResponse
from django.shortcuts import redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.mixins import UpdateModelMixin, DestroyModelMixin

from .models import Patient
from .serializers import PatientSerializer
class Index(
    APIView,
    UpdateModelMixin,
    DestroyModelMixin,
):
    def get(self, request):
        return Response('WAOW',status=200)
class TournamentView(
  APIView, # Basic View class provided by the Django Rest Framework
  UpdateModelMixin, # Mixin that allows the basic APIView to handle PUT HTTP requests
  DestroyModelMixin, # Mixin that allows the basic APIView to handle DELETE HTTP requests
):

    def get(self, request, PID=None):
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
            queryset = Patient.objects.all().exclude(name='Idle Teams')

        # Serialize list of tournament from Django queryset object to JSON formatted data
            read_serializer = PatientSerializer(queryset, many=True)

        # Return a HTTP response object with the list of todo items as JSON
        return Response(read_serializer.data)