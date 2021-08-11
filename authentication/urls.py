from .views import RegistrationView, UserEmailValidationView, UserEmailSubmitView, LoginView, logoutView
from django.urls import path
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path('register', RegistrationView.as_view(), name="register"),
    path('login', LoginView.as_view(), name="login"),
    path('logout', logoutView.as_view(), name="logout"),
    path('validate-email', csrf_exempt(UserEmailValidationView.as_view()), name="validate-email"),
    path('submit-email', csrf_exempt(UserEmailSubmitView.as_view()), name="submit-email")
]