import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [timetableOptions, setTimetableOptions] = useState(null);
  const [formData, setFormData] = useState({
    numClassrooms: 0,
    numBatches: 0,
    maxClassesPerDay: 6,
    subjects: [""],
    faculty: [""],
  });

  // Check authentication
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addField = (fieldType) => {
    setFormData((prev) => ({
      ...prev,
      [fieldType]: [...prev[fieldType], ""],
    }));
  };

  const handleArrayFieldChange = (index, value, fieldType) => {
    setFormData((prev) => {
      const newArray = [...prev[fieldType]];
      newArray[index] = value;
      return {
        ...prev,
        [fieldType]: newArray,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const mockTimetableOptions = [
        { id: 1, name: "Option 1", efficiency: "95%" },
        { id: 2, name: "Option 2", efficiency: "92%" },
        { id: 3, name: "Option 3", efficiency: "88%" },
      ];
      setTimetableOptions(mockTimetableOptions);
    } catch (error) {
      console.error("Error generating timetable:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // FIX: full-screen container with scrolling
    <div className="fixed inset-0 flex flex-col overflow-auto bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 md:px-8 py-6 md:py-8">
        {/* Header */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white rounded-xl shadow-sm p-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome, Admin! 👋
            </h1>
            <p className="text-gray-600">Let's create your perfect timetable</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <span>Logout</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-8">
          {[
            { label: "Total Classrooms", value: formData.numClassrooms || 0 },
            { label: "Total Batches", value: formData.numBatches || 0 },
            {
              label: "Subjects",
              value: formData.subjects.filter((s) => s).length,
            },
            {
              label: "Faculty Members",
              value: formData.faculty.filter((f) => f).length,
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 transform hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Main Form */}
        <div className="w-full bg-white rounded-xl shadow-lg p-4 md:p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Create New Timetable
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Numeric Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">
                  Number of Classrooms
                </label>
                <input
                  type="number"
                  name="numClassrooms"
                  min="0"
                  value={formData.numClassrooms}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg text-gray-900"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Number of Batches
                </label>
                <input
                  type="number"
                  name="numBatches"
                  min="0"
                  value={formData.numBatches}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg text-gray-900"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Max Classes Per Day
                </label>
                <select
                  name="maxClassesPerDay"
                  value={formData.maxClassesPerDay}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg text-gray-900"
                >
                  {[4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dynamic Subject Inputs */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-gray-700 font-semibold">Subjects</label>
                <button
                  type="button"
                  onClick={() => addField("subjects")}
                  className="text-blue-500 hover:text-blue-700"
                >
                  + Add Subject
                </button>
              </div>
              {formData.subjects.map((subject, index) => (
                <input
                  key={index}
                  type="text"
                  value={subject}
                  onChange={(e) =>
                    handleArrayFieldChange(index, e.target.value, "subjects")
                  }
                  className="w-full p-2 border rounded-lg text-gray-900"
                  placeholder={`Subject ${index + 1}`}
                />
              ))}
            </div>

            {/* Dynamic Faculty Inputs */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-gray-700 font-semibold">Faculty</label>
                <button
                  type="button"
                  onClick={() => addField("faculty")}
                  className="text-blue-500 hover:text-blue-700"
                >
                  + Add Faculty
                </button>
              </div>
              {formData.faculty.map((faculty, index) => (
                <input
                  key={index}
                  type="text"
                  value={faculty}
                  onChange={(e) =>
                    handleArrayFieldChange(index, e.target.value, "faculty")
                  }
                  className="w-full p-2 border rounded-lg text-gray-900"
                  placeholder={`Faculty ${index + 1}`}
                />
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50"
            >
              {loading ? "Generating Timetables..." : "Generate Timetable"}
            </button>
          </form>
        </div>

        {/* Timetable Options */}
        {timetableOptions && (
          <div className="w-full bg-white rounded-xl shadow-lg p-4 md:p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Generated Timetable Options
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {timetableOptions.map((option) => (
                <div
                  key={option.id}
                  className="border rounded-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{option.name}</h3>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {option.efficiency}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Schedule optimization score
                  </p>
                  <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1">
                    Select & Review
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
