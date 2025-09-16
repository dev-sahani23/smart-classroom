import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid email or password");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-green-500 to-teal-600 p-4">
      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl">
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-teal-700 opacity-80 rounded-xl"></div>
          <div className="relative z-10 text-white text-center md:text-left max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Smart Classroom!</h1>
            <p className="text-lg md:text-xl mb-8">
              Revolutionizing class scheduling with intelligent timetable management
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white rounded-xl">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
              <p className="text-gray-600 mt-2">Please enter your details</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-900"
              />

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition duration-300 shadow-lg hover:shadow-xl"
              >
                Sign In
              </button>

              <div className="text-center mt-4">
                <span className="text-gray-700 text-sm">Don’t have an account?</span>
                <Link to="/signup" className="text-blue-600 hover:text-blue-800 text-sm font-semibold ml-2">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
