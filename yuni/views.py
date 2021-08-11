from django.shortcuts import render, redirect
from django.views import View
import json
from datetime import datetime    
import pytz  
from .models import *
from django.contrib import messages
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.auth.mixins import LoginRequiredMixin


class get_branch_coordinates(APIView):
    """
    View to list all users in the system.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        latest_date = datetime.strptime("2021-01-01", '%Y-%m-%d')
        branches = branch.objects.filter(customer=1)
        out_put_dict = {}
        for bran in branches:
            out_put_dict.update({
                bran.branchName: {
                    "lat":bran.lattitude,
                    "lng":bran.longitude
                    }
                })
        return Response(out_put_dict)

class get_ranking_by_average_new_monthly_acquisition(APIView):
    """
    View to list all users in the system.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        # TODO: Modify Hard Coded Vlues i.e. month, customer, latest_date
        latest_date = datetime.strptime("2021-05-01", '%Y-%m-%d')
        month = 5
        branches = branch.objects.filter(customer=1)
        out_put_dict = {}
        for bran in branches:
            data = member.objects.filter(createdon__gte=latest_date, customer=1, lastPurchasedStore=int(bran.id))
            out_put_dict.update({bran.branchName: len(data)/month})
        return Response(out_put_dict)



# Create your views here.

# @method_decorator(login_required(login_url='/authentication/login'), name='dispatch')
class dashBoard(LoginRequiredMixin, View):
    login_url = '/authentication/login'
    redirect_field_name = 'redirect_to'
    def get(self, request):
        return render(request, 'yuni/dashboard.html')

class analysis(View):
    def get(self, request):
        return render(request, 'yuni/analysis.html')

class report(View):
    def get(self, request):
        return render(request, 'yuni/report.html')

class asset(View):
    def get(self, request):
        return render(request, 'yuni/asset.html')

class logoutView(View):
    def post(self, request):
        # tz_NY = pytz.timezone('Asia/Kolkata')   
        # datetime_NY = datetime.now(tz_NY)
        # print(request)
        # current_user = request.user.email
        # user = User.objects.filter(email=current_user)
        # user.last_login = datetime_NY
        messages.success(request, 'You have been logged out')
        return redirect('login')
