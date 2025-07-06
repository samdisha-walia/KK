// src/Layout.jsx
import FlashMessage from "./components/FlashMessage";
import Navbar from "./components/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <FlashMessage />
      <Navbar />
      {children}
      <footer className="bg-gray-100 text-center p-4 mt-8">
        © {new Date().getFullYear()} Karam Kreations. All rights reserved.
      </footer>
    </>
  );
};

export default Layout;
