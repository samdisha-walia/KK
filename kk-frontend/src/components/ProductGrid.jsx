import { useEffect, useState } from "react";
import axios from "axios";

function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {products.map((product) => (
      <div
        key={product.id}
        className="group border rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300 bg-white"
      >
        <div className="overflow-hidden">
          <img
            src={`http://127.0.0.1:8000${product.image}`}
            alt={product.name}
            className="h-60 w-full object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">
            {product.name}
          </h2>
          <p className="text-gray-600 mb-4">
            {product.description}
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Learn More
          </button>
        </div>
      </div>
    ))}
  </div>
);

}

export default ProductGrid;
