// src/pages/Services.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const Services = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/products/");
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Services</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {products.length === 0 && !error && (
        <p className="text-center">Loading services...</p>
      )}
      <div className="grid md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative group overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:scale-105 bg-white"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={
                    product.image
                    ? `http://localhost:8000${product.image}`
                    : "/products/4.png" // Your default image
                }
                alt={product.name}
                className="w-full h-full object-cover group-hover:blur-sm group-hover:brightness-75 transition-all duration-500"
                />



              
              <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-xs flex justify-around py-2">
                {product.category_name && (
                  <span> {product.category_name}</span>
                )}
              </div>
            </div>
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-500">SERVICE OFFER</p>
              <div className="text-blue-500 my-2">★★★★★</div>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <div className="mt-4 flex justify-around">
                <button className="text-blue-800 font-semibold">
                  Read More
                </button>
                <button className="bg-blue-800 text-white px-4 py-1 rounded-lg hover:bg-blue-900 transition">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
