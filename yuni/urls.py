from django.urls import path
from . import views
from django.views.decorators.csrf import csrf_exempt
from .views import dashBoard, analysis, report, asset, get_ranking_by_average_new_monthly_acquisition, get_branch_coordinates
from django.contrib.auth.decorators import login_required

urlpatterns = [
    path('dashboard', views.dashBoard.as_view(), name="dashboard"),
    path('asset', asset.as_view(), name="asset"),
    path('analysis', analysis.as_view(), name="analysis"),
    path('report', report.as_view(), name="report"),
    path('api/ranking_by_average_new_monthly_acquisition', get_ranking_by_average_new_monthly_acquisition.as_view(), name="api-ranking-by-average-new-monthly-acquisition"),
    path('api/get_branch_coordinates', get_branch_coordinates.as_view(), name="api-branch-coordinates"),
]