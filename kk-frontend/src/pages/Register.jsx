import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FlashMessageContext } from "../FlashMessageContext";

const Register = () => {
  const navigate = useNavigate();
  const { showMessage } = useContext(FlashMessageContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    re_password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.re_password) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/register/",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          re_password: formData.re_password
        }
      );

      showMessage("Registration successful! Please log in.", "success");
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data);
      setError(
        err.response?.data?.error || "Registration failed. Please check your inputs."
      );
      showMessage(
        err.response?.data?.error || "Registration failed.",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-beige text-black p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
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
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
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
        <input
          type="password"
          name="re_password"
          placeholder="Confirm Password"
          value={formData.re_password}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-black text-beige w-full py-2 rounded font-semibold hover:bg-gray-800 transition"
        >
          Register
        </button>
        <p className="text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
