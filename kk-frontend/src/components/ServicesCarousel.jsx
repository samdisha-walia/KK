import { useState, useEffect, useRef } from "react";
import axios from "axios";
import CircleNavButton from "./CircleNavButton";

const ServicesCarousel = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const containerRef = useRef(null);
  const scrollInterval = useRef(null);

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

  
  const scroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth; // scroll by visible width
    if (direction === "right") {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      // If near end, reset to start
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) {
        setTimeout(() => container.scrollTo({ left: 0, behavior: "smooth" }), 500);
      }
    } else {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      // If near start, jump to end
      if (container.scrollLeft <= 0) {
        setTimeout(
          () =>
            container.scrollTo({
              left: container.scrollWidth,
              behavior: "smooth",
            }),
          500
        );
      }
    }
  };

  const startAutoScroll = (direction) => {
    stopAutoScroll();
    scrollInterval.current = setInterval(() => {
      scroll(direction);
    }, 1500);
  };

  const stopAutoScroll = () => {
    if (scrollInterval.current) clearInterval(scrollInterval.current);
  };

  return (
    <div className="relative w-full py-10 bg-black text-beige">
      <h2 className="text-2xl font-bold mb-4 text-center">Our Services</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div
        className="flex overflow-x-auto scrollbar-hide space-x-4 px-4"
        ref={containerRef}
        onMouseLeave={stopAutoScroll}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-none w-64 bg-beige text-black rounded-xl shadow-md p-4 hover:scale-105 transition"
          >
            <img
              src={`http://localhost:8000${product.image}`}
              alt={product.name}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
          </div>
        ))}
      </div>

      {/* Left button */}
      <button
        onClick={() => scroll("left")}
        onMouseEnter={() => startAutoScroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center shadow hover:bg-blue-800 transition"
      >
        ‹
      </button>

      {/* Right button */}
      <button
        onClick={() => scroll("right")}
        onMouseEnter={() => startAutoScroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center shadow hover:bg-blue-800 transition"
      >
        ›
      </button>
    </div>
  );
};

export default ServicesCarousel;
