from django.urls import path, re_path
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from . import views


urlpatterns = [
    path('', csrf_exempt(TemplateView.as_view(template_name='frontend/index.html')))
    #path('', csrf_exempt(views.index) )
    #re_path(r'^/*', views.index),
]
