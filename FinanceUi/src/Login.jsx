import { useState } from "react";
import axios, { Axios } from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UpdateID } from "./slice";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
let dispatch=useDispatch();
let navigate=useNavigate();
  const UData={
    UEmail:email,
    UPass:password
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    console.log(UData);
    setLoading(true);
let response =await axios.post('http://localhost:8000/user/Login',UData);
if(response.data.message){
  alert(response.data.message);
}
else{
localStorage.setItem('UId',response.data.ID);
localStorage.setItem('UToken',response.data.token);
}
let Token=localStorage.getItem('UToken');
    // Simulating API call
    setTimeout(() => {
      setLoading(false);
      if(Token){
        alert("Login Successful 🎉");
        navigate('/');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">

      <div className="w-full max-w-md bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back 👋
          </h1>

          <p className="text-gray-500 mt-2">
            Login to your account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-5 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         outline-none transition
                         focus:ring-2 focus:ring-purple-500
                         focus:border-transparent"
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300
                           rounded-lg outline-none transition
                           focus:ring-2 focus:ring-purple-500
                           focus:border-transparent"
              />

              {/* Show Password */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                           text-gray-500 hover:text-purple-600"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>

            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center mb-6 text-sm">

            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                className="accent-purple-600"
              />
              Remember me
            </label>

            <button
              type="button"
              className="text-purple-600 hover:text-purple-800 font-medium"
            >
              Forgot Password?
            </button>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-white font-semibold
                       bg-gradient-to-r from-purple-600 to-indigo-600
                       hover:from-purple-700 hover:to-indigo-700
                       transition duration-300
                       hover:scale-[1.02]
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Register */}
        <p className="text-center text-gray-600 mt-7">
          Don't have an account?{" "}
        <Link to={'/SignUp'}><button className="text-purple-600 font-semibold hover:underline">
            Sign Up
          </button>
          </Link>  
        </p>

      </div>
    </div>
  );
}

export default Login;
