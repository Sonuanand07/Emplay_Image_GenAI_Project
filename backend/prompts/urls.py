from django.urls import path
from . import views

urlpatterns = [
    path('', views.prompts_list, name='prompts_list'),
    path('<int:pk>/', views.prompt_detail, name='prompt_detail'),
]

