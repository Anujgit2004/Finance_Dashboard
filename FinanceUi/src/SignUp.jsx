
import { useState } from "react";
import axios, { Axios } from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Signup() {
    window.addEventListener('beforeunload', (event) => {
    // Cancel the event as stated by the standard.
    event.preventDefault();
    
    // Chrome requires returnValue to be set.
    event.returnValue = '';
});
    let navigate=useNavigate();
    let backend=useSelector((state)=>state.First.URL);
  const [formData, setFormData] = useState({
    UName: "",
    UEmail: "",
    UPass: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    let prod={...formData};
    prod[e.target.name]=e.target.value;
    setFormData(prod);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (
      !formData.UName ||
      !formData.UEmail ||
      !formData.UPass
    ) {
      setError("Please fill all the fields.");
      return;
    }

    if (formData.UPass.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    // API call will go here
   let response =await axios.post(`${backend}/user/SignUp`,formData);
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
        alert("Registered Successful 🎉");
        navigate('/');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Sign up to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>

            <input
              type="text"
              name="UName"
              value={formData.UName}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-transparent transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>

            <input
              type="email"
              name="UEmail"
              value={formData.UEmail}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-transparent transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="UPass"
                value={formData.UPass}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full px-4 py-3 pr-12 border border-gray-300
                           rounded-lg outline-none focus:ring-2
                           focus:ring-blue-500 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                           text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full px-4 py-3 pr-12 border border-gray-300
                           rounded-lg outline-none focus:ring-2
                           focus:ring-blue-500 transition"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2
                           text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div> */}

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          {/* Terms */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" required className="accent-blue-600" />
            <span>
              I agree to the Terms & Conditions
            </span>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-semibold
                       rounded-lg hover:bg-blue-700 active:scale-[0.98]
                       transition disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Login */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
           <Link to={'/Login'}  className="text-blue-600 font-semibold hover:underline"> Login</Link>
           
        </p>
      </div>
    </div>
  );
}

