from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from .models import Product
from .serializers import ProductSerializer

@api_view(["POST"])
def register_user(request):
    data = request.data
    email = data.get("email", "").strip()
    username = data.get("username", "").strip()
    password = data.get("password", "")
    re_password = data.get("re_password", "")

    # Basic validations
    if not email or not username or not password or not re_password:
        return Response({"error": "All fields are required."}, status=400)

    try:
        validate_email(email)
    except ValidationError:
        return Response({"error": "Invalid email address."}, status=400)

    if password != re_password:
        return Response({"error": "Passwords do not match."}, status=400)
    if len(password) < 8 or not any(c.isdigit() for c in password) or not any(c.isalpha() for c in password):
        return Response({
            "error": "Password must be 8+ chars, include letters and numbers."
        }, status=400)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already taken."}, status=400)
    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already registered."}, status=400)

    user = User.objects.create_user(username=username, email=email, password=password)
    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email
    }, status=201)
@api_view(["POST"])
def login_user(request):
    username = request.data.get("username", "").strip()
    password = request.data.get("password", "")
    user = authenticate(request, username=username, password=password)
    if user is None:
        return Response({"error": "Invalid credentials"}, status=400)

    refresh = RefreshToken.for_user(user)
    return Response({
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    })

@api_view(["GET"])
def product_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)