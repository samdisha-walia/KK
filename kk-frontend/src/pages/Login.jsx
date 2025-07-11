import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { FlashMessageContext } from "../FlashMessageContext";


const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);  // Import the login() function
  const { showMessage } = useContext(FlashMessageContext);


  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/login/",
        {
          username: formData.username,
          password: formData.password,
        }
      );
      
      // Instead of localStorage, call login() from context
      login(data.access, formData.username);
      showMessage("Logged in successfully!", "success");

      // Redirect to home
      navigate("/");
    } catch (err) {
      console.error(err.response?.data);
      setError("Login failed. Please check your credentials.");
      showMessage("Login failed. Invalid credentials.", "error");

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-beige text-black p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-600">{error}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-black text-beige w-full py-2 rounded font-semibold hover:bg-gray-800 transition"
        >
          Login
        </button>
        <p className="text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
