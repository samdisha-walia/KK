import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full min-h-[500px] flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/2.png')",
          filter: "brightness(0.5) blur(1px)" // Darken + Blur
        }}
      ></div>

      {/* Overlay with optional semi-transparent black */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4"
        style={{ color: "#f5f5dc" }}>
          Karam Kreations
        </h1>
        <p className="text-lg md:text-2xl mb-8"
        style={{ color: "#f5f5dc" }}>
          Premium Printing & Packaging Solutions Crafted with Precision and Style
        </p>
        <a
          href="#contact"
          className="inline-block bg-beige text-black font-semibold px-6 py-3 rounded-full shadow hover:bg-wheat transition"
        >
          Get a Quote
        </a>
      </div>
    </motion.section>
  );
};

export default Hero;
