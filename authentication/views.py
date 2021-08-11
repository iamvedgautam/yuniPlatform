from django.shortcuts import redirect, render
from django.views import View
import json
from django.http import JsonResponse
import re
from django.contrib.auth.models import User
from django.contrib import messages, auth
from yuni.models import *
from datetime import datetime    
import pytz    
from django.contrib.auth.mixins import LoginRequiredMixin

regex = '^(\w|\.|\_|\-)+[@](\w|\_|\-|\.)+[.]\w{2,3}$'


# Create your views here.
class UserEmailValidationView(View):
    def post(self, request):
        data = json.loads(request.body)
        email = data['email']

        if not (re.search(regex, email)):
            return JsonResponse({"email_error": "Invalid email id"}, status=400)

        return JsonResponse({"email_error": "Correct email id"})


class UserEmailSubmitView(View):
    def post(self, request):
        data = json.loads(request.body)
        email = data['email']

        if not (re.search(regex, email)):
            return JsonResponse({"email_error": "Invalid email id"}, status=400)
        if User.objects.filter(email=email).exists():
            return JsonResponse({"email_exists": "Account already exists"}, status=409)

        return JsonResponse({"Thank you for your interest we will contact you shortly": True})

class RegistrationView(View):
    def get(self, request):
        return render(request, 'authentication/register.html')

    def post(self, request):
        # get user data
        # validate the data
        # create a entry in db
        companyName = request.POST["Company name"]
        email = request.POST["email"]

        if companyName == "" or email == "":
            messages.warning(request, 'Please provide the required information')
            return render(request, 'authentication/register.html')

        if not newUsers.objects.filter(companyName=companyName).exists():
            if not newUsers.objects.filter(email=email).exists():

                user = newUsers.objects.create(companyName=companyName, email=email)
                user.save()

                messages.success(request, 'Thank you for your interest we will contact you shortly')
                return render(request, 'authentication/register.html')


        messages.warning(request, 'Thank you for reaching out again. We already have you Info. Our team will get back to you as soon as possible.')
        return render(request, 'authentication/register.html')

class LoginView(View):
    def get(self, request):
        return render(request, 'authentication/login.html')

    def post(self, request):
        email = request.POST["email"]
        password = request.POST["password"]

        if password == "" or email == "":
            messages.warning(request, 'Please provide the required information')
            return render(request, 'authentication/login.html')

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            if str(user.password) == str(password):
                return redirect('dashboard')
            else:
                messages.error(request, 'Please enter correct emailid and password')
                return render(request, 'authentication/login.html')

        messages.warning(request, 'Please enter correct email id.')
        return render(request, 'authentication/login.html')

class logoutView(View):
    def get(self, request):
        return render(request, 'authentication/login.html')
    def post(self, request):
        # tz_NY = pytz.timezone('Asia/Kolkata')   
        # datetime_NY = datetime.now(tz_NY)
        # print(request)
        # current_user = request.user.email
        # user = User.objects.filter(email=current_user)
        # user.last_login = datetime_NY
        messages.success(request, 'You have been logged out')
        return redirect('login')

        