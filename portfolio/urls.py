from django.urls import path

from portfolio.views import IndexView, ProjectsView


urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('projects/', ProjectsView.as_view(), name='projects')
]
