from django.urls import path
from .views import MasterQueryView

urlpatterns = [
    path('userquery/', MasterQueryView.as_view(), name='masterfunction'),
]