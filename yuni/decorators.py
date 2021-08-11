from django.http import HttpResponse
from django.shortcuts import redirect

def check_user_authenticated(view_func):
    def wrapper_func(request, *args, **kwargs):
        return view_func(request, *args, **kwargs)

    return wrapper_func