from rest_framework import serializers
from .models import Product, ProductCategory

class ProductSerializer(serializers.ModelSerializer):
    # This adds the category name when serializing a Product
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description',  'image', 'category_name']


class ProductCategorySerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="name")

    class Meta:
        model = ProductCategory
        fields = '__all__'
