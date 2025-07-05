import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
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
  
  const { email, username, password, confirmPassword } = formData;

  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }
  if (password.length < 8) {
    setError("Password must be at least 8 characters.");
    return;
  }

  try {
    await axios.post("http://localhost:8000/api/register/", {
      email,
      username,
      password,
      re_password: confirmPassword,
    });
    navigate("/login");
  } catch (err) {
    console.error(err.response?.data);
    setError(
      err.response?.data?.error ||
      JSON.stringify(err.response?.data) ||
      "Registration failed."
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
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
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
        Already have an account? <Link to="/login" className="text-blue-500 underline">Login</Link>
      </p>

      </form>
    </div>
  );
};

export default Register;
