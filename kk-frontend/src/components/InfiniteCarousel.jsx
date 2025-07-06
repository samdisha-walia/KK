// src/components/InfiniteCarousel.jsx
import { useRef, useEffect } from "react";
import CircleNavButton from "./CircleNavButton";

const InfiniteCarousel = ({ products = [] }) => {
  const containerRef = useRef(null);
  const scrollInterval = useRef(null);

  const duplicatedProducts = [...products, ...products];

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
    }
  }, []);

  const startScroll = (direction) => {
    stopScroll();
    scrollInterval.current = setInterval(() => {
      if (!containerRef.current) return;
      containerRef.current.scrollBy({
        left: direction === "right" ? 2 : -2,
        behavior: "auto",
      });

      const container = containerRef.current;
      const maxScroll = container.scrollWidth / 2;
      if (container.scrollLeft >= maxScroll) {
        container.scrollLeft -= maxScroll;
      }
      if (container.scrollLeft <= 0) {
        container.scrollLeft += maxScroll;
      }
    }, 16);
  };

  const stopScroll = () => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
    }
  };

  const scrollByAmount = (direction) => {
    if (!containerRef.current) return;
    const amount = containerRef.current.clientWidth;
    containerRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });

    setTimeout(() => {
      const container = containerRef.current;
      const maxScroll = container.scrollWidth / 2;
      if (container.scrollLeft >= maxScroll) {
        container.scrollLeft -= maxScroll;
      }
      if (container.scrollLeft <= 0) {
        container.scrollLeft += maxScroll;
      }
    }, 500);
  };

  const isFirstVisible = (el) => {
    if (!containerRef.current || !el) return false;
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    return elRect.left <= containerRect.left + 2;
  };

  const isLastVisible = (el) => {
    if (!containerRef.current || !el) return false;
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    return elRect.right >= containerRect.right - 2;
  };

  return (
    <div className="relative w-full py-10 bg-black text-beige">
      {/* Title + Buttons */}
      <div className="flex items-center justify-between px-4 mb-6">
        <CircleNavButton direction="left" onClick={() => scrollByAmount("left")} />
        <h2 className="text-2xl font-bold text-center">Our Services</h2>
        <CircleNavButton direction="right" onClick={() => scrollByAmount("right")} />
      </div>

      {/* Carousel */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-hide space-x-4 px-4"
      >
        {duplicatedProducts.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="relative group flex-none w-64 bg-white rounded-xl shadow-lg transition-all duration-500 hover:scale-105"
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              if (isFirstVisible(el)) startScroll("left");
              if (isLastVisible(el)) startScroll("right");
            }}
            onMouseLeave={stopScroll}
          >
            <div className="relative h-40 overflow-hidden rounded-t-xl">
              <img
                src={
                  product.image
                    ? `http://localhost:8000${product.image}`
                    : "/products/4.png"
                }
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500 group-hover:blur-sm group-hover:brightness-75"
              />
              {product.category_name && (
                <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-xs flex justify-around py-1 text-center">
                  <span>{product.category_name}</span>
                </div>
              )}
            </div>
            <div className="p-3 text-center">
              <h3 className="text-lg text-black font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">SERVICE OFFER</p>
              <div className="text-blue-500 my-1">★★★★★</div>
              <p className="text-gray-600 text-xs line-clamp-3">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteCarousel;
