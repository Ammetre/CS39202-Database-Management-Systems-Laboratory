from django.urls import path
from . import views
urlpatterns = [
    path('',views.Index.as_view(),name = 'index'),
    path('patients/',views.PatientView.as_view()),
    path('patients/<int:id>/',views.PatientView.as_view()),
    # path('tournaments/unscheduled/',views.TournamentUView.as_view()),
    # path('tournaments/unscheduled/<int:id>/',views.TournamentUView.as_view()),
    # path('tournaments/scheduled/',views.TournamentSView.as_view()),
    # path('tournaments/scheduled/<int:id>/',views.TournamentSView.as_view()),
    # path('tournaments/completed/',views.TournamentCView.as_view()),
    # path('tournaments/completed/<int:id>/',views.TournamentCView.as_view()),
    path('doctors/',views.DoctorView.as_view()),
    path('doctors/<int:id>/',views.DoctorView.as_view()),
    path('appointments/',views.AppointmentView.as_view()),
    path('appointments/<int:id>/',views.AppointmentView.as_view()),
    path('admissions/',views.Admission_InfoView.as_view()),
    path('admissions/<int:id>/',views.Admission_InfoView.as_view()),
    path('users/',views.userView.as_view()),
    path('users/<int:id>/',views.userView.as_view()),
    path('patients/<int:id>/tests/',views.StatView.as_view()),
    path('doctors/<int:id>/patients/',views.TreatedView.as_view())
]