"""miniproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
import hospital.views as Hosp_views
from django.contrib.auth import views as auth_views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/',Hosp_views.MyLoginView.as_view(),name='myUser-login'),    #login page   
    # path('logout/',auth_views.LogoutView.as_view(template_name='logout.html'),name='myUser-logout'), #logout page
    # path('password-reset/',auth_views.PasswordResetView.as_view(template_name='password_reset.html'),name='password_reset'), #password reset (defunct)
    # path('password-reset-complete/',auth_views.PasswordResetCompleteView.as_view(template_name='password_reset_complete.html'),name='password_reset_complete'), #password reset (defunct)
    # path('password-reset-confirm/<uidb64>/<token>/',auth_views.PasswordResetConfirmView.as_view(template_name='password_reset_confirm.html'),name='password_reset_confirm'), #password reset (defunct)
    # path('password-reset/done/',auth_views.PasswordResetDoneView.as_view(template_name='password_reset_done.html'),name='password_reset_done'), #password reset (defunct)
    # path('api/',include('api.urls')),   #api
    # path('list_codes/',User_views.listcodes,name='myUser-listcodes'),   #list of codes
    # path('download/',User_views.download_data,name='myUser-download'),  #download all codes in csv
    # path('password/',User_views.change_password,name='change_password'),    #change password
    # path('detail_code/',User_views.detailcodes,name='myUser-detailcode'),   #detail of a specific code (default 0th)
    # path('detail_code/<int:index>',User_views.detailcodes,name='User-detailcode'),  #detail of ith code
    # path('',User_views.course,name='Course-home'),  #homepage(default 0th)
]
