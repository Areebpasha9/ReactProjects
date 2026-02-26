import { useState } from "react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useApp();
  const navigate = useNavigate();

  const [loginType, setLoginType] = useState("USER");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(email, password);

    if (!success) {
      alert("Invalid credentials");
      return;
    }

    // Check user role and redirect accordingly
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (currentUser?.role === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-indigo-400">
      
      <div className="bg-white w-96 p-8 rounded-2xl shadow-2xl">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          {loginType === "ADMIN" ? "Admin Login" : "User Login"}
        </h2>

        {/* Toggle Buttons */}
        <div className="flex mb-6 bg-gray-100 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setLoginType("USER")}
            className={`w-1/2 py-2 text-sm font-semibold transition ${
              loginType === "USER"
                ? "bg-blue-600 text-white"
                : "text-gray-600"
            }`}
          >
            User
          </button>

          <button
            type="button"
            onClick={() => setLoginType("ADMIN")}
            className={`w-1/2 py-2 text-sm font-semibold transition ${
              loginType === "ADMIN"
                ? "bg-blue-600 text-white"
                : "text-gray-600"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Enter Email"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

        {/* Demo credentials */}
        {/* <div className="mt-6 text-xs text-gray-500 space-y-1">
          <p className="font-medium text-center">Demo Credentials:</p>
          <p>👤 User: user@example.com / password123</p>
          <p>👑 Admin: admin@jobboard.com / admin123</p>
        </div> */}

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer font-semibold hover:underline"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;