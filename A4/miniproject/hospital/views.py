from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import views as auth_views
# Create your views here.
def home(request):
    return HttpResponse('<h2>Hi</h2><br/><h1>No</h1>')
class MyLoginView(auth_views.LoginView):
    template_name = 'login.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context