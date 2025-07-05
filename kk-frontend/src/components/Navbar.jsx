import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-black text-beige text-sm py-2 flex justify-between items-center px-2 md:px-4">
        <div className="flex gap-4">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaLinkedinIn /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaYoutube /></a>
        </div>
        <div className="flex gap-4">
          <span>Welcome Guest,</span>
          <a href="/register" className="hover:underline">Register</a>
          <a href="/login" className="hover:underline">Login</a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-black text-beige sticky top-0 z-50 w-full">
      <div className="flex justify-between items-center py-4 w-full px-4 md:px-8">
          <Link to="/" className="text-xl font-bold tracking-wide ml-4 md:ml-8">
            Karam Kreations
          </Link>
          
          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-4 text-sm font-semibold">
            <li>
            <Link
                to="/"
                className="hover:text-gray-300 transition duration-300 transform hover:scale-105"
            >
                Home
            </Link>
            </li>
            <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
            <li><Link to="/services" className="hover:text-gray-300">Services</Link></li>
            <li><Link to="/gallery" className="hover:text-gray-300">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
          </ul>

          

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden mr-4"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2">
            <Link
              to="/"
              className="block bg-black text-beige rounded py-2 px-2 hover:bg-beige hover:text-black transition"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block bg-black text-beige rounded py-2 px-2 hover:bg-beige hover:text-black transition"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/services"
              className="block bg-black text-beige rounded py-2 px-2 hover:bg-beige hover:text-black transition"
              onClick={() => setMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/gallery"
              className="block bg-black text-beige rounded py-2 px-2 hover:bg-beige hover:text-black transition"
              onClick={() => setMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              to="/contact"
              className="block bg-black text-beige rounded py-2 px-2 hover:bg-beige hover:text-black transition"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
           
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
