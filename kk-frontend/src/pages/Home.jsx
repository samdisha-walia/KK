// src/pages/Home.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import InfiniteCarousel from "../components/InfiniteCarousel";
import About from "./About";
import Contact from "./Contact";

function Home() {
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
    <main>
      <Hero />

      {/* Services */}
      <section id="services" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          {error && <p className="text-red-500 text-center">{error}</p>}
          {!error && <InfiniteCarousel products={products} />}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-8">About Us</h2>
        <div className="max-w-5xl mx-auto">
          <About />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center mb-8">Contact Us</h2>
        <div className="max-w-3xl mx-auto">
          <Contact />
        </div>
      </section>
    </main>
  );
}

export default Home;
