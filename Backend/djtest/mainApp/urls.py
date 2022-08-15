"""djtest URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
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
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import ReviewList, TotalData

urlpatterns = [
    # path('home/',insertDB,name='list'),
    # path('create/',create,name='create'),
    # path('main/',DBCreateView.as_view(),name='main'),
    path('parking/',ReviewList.as_view()),
    # path('review/<int:pk>',ReviewDetail.as_view()),
    path('totaldata/',TotalData.as_view())
    
]

urlpatterns = format_suffix_patterns(urlpatterns)
