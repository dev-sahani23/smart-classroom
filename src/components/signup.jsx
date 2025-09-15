import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const userData = { firstname, lastname, email, contact, password };
    console.log("Submitting user data:", userData);

    try {
      const res = await fetch("http://localhost:5000/add_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      console.log("Response from backend:", data);

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Network error. Please check if backend is running.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-green-500 to-teal-600 p-4">
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-1/2 min-h-[300px] md:min-h-[600px] flex items-center justify-center p-6 md:p-12 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-teal-700 opacity-80 rounded-xl"></div>
          <div className="relative z-10 text-white text-center md:text-left max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Smart Classroom!</h1>
            <p className="text-lg md:text-xl mb-8">
              Create your account and explore intelligent scheduling solutions.
            </p>
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="w-full md:w-1/2 min-h-[300px] md:min-h-[600px] flex items-center justify-center p-6 md:p-12 bg-white rounded-xl overflow-y-auto">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900">Sign Up</h2>
              <p className="text-gray-600 mt-2">Please fill in your details</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="text" placeholder="First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 text-gray-900" />
              <input type="text" placeholder="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 text-gray-900" />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 text-gray-900" />
              <input type="text" placeholder="Contact Number" value={contact} onChange={(e) => setContact(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 text-gray-900" />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 text-gray-900" />
              <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 text-gray-900" />

              {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</div>}

              <button type="submit" className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-4 rounded-lg hover:from-green-700 hover:to-green-800 transition duration-300 shadow-lg hover:shadow-xl">
                Sign Up
              </button>

              <div className="text-center mt-4">
                <span className="text-gray-700 text-sm">Already have an account?</span>
                <a href="/login" className="text-green-600 hover:text-green-800 text-sm font-semibold ml-2">Sign in</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
