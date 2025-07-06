from django.urls import path
from .views import register_user, login_user, product_list

urlpatterns = [
    path("register/", register_user, name="api-register"),
    path("login/", login_user, name="api-login"),
    path("products/", product_list, name="api-products"),
]
