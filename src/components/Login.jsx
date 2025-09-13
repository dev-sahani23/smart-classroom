import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (username === "admin" && password === "password") {
      localStorage.setItem("authToken", "your_auth_token_here");
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    // FIX: use fixed inset-0 so this wrapper always covers the viewport
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4 overflow-auto">
      {/* card */}
      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl">
        {/* Left - Welcome */}
        <div className="w-full md:w-1/2 min-h-[300px] md:min-h-[600px] flex items-center justify-center p-6 md:p-12 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 opacity-80"></div>
          <div className="relative z-10 text-white text-center md:text-left max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Smart Classroom!</h1>
            <p className="text-lg md:text-xl mb-8">
              Revolutionizing class scheduling with intelligent timetable management
            </p>
            <div className="hidden md:block">
              <div className="flex gap-4 mt-8">
                <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                  <h3 className="font-semibold">Smart Scheduling</h3>
                  <p className="text-sm">Optimized class arrangements</p>
                </div>
                <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                  <h3 className="font-semibold">Easy Management</h3>
                  <p className="text-sm">Intuitive interface</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Login */}
        <div className="w-full md:w-1/2 min-h-[300px] md:min-h-[600px] flex items-center justify-center p-6 md:p-12 bg-white">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
              <p className="text-gray-600 mt-2">Please enter your details</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-gray-900"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-gray-900"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-800">Forgot password?</a>
                </div>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition duration-300 shadow-lg hover:shadow-xl">
                Sign in
              </button>

              <div className="text-center mt-4">
                <span className="text-gray-700 text-sm">Don't have an account?</span>
                <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-semibold ml-2">Sign up</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
