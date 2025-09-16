import React, { useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    classrooms: "",
    batches: "",
    subjectsCount: "",
    subjectNames: [""],
    maxClassesPerDay: "",
    classesPerSubjectPerWeek: "",
    facultiesCount: "",
    averageLeaves: "",
    specialClasses: [""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (e, index, field) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = e.target.value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  const addArrayField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeArrayField = (field, index) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/save-constraints",
        formData
      );
      alert("Constraints saved successfully!");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to save constraints");
    }
  };

  return (
    <div className="flex justify-center items-start p-6 overflow-auto min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl space-y-4 h-215 overflow-y-auto"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
        <h2 className="text-2xl font-bold mb-4">Enter Constraints</h2>

        <label>
          Number of classrooms available:
          <input
            type="number"
            name="classrooms"
            value={formData.classrooms}
            onChange={handleChange}
            className="border p-2 w-full rounded mt-1"
            required
          />
        </label>

        <label>
          Number of batches of students:
          <input
            type="number"
            name="batches"
            value={formData.batches}
            onChange={handleChange}
            className="border p-2 w-full rounded mt-1"
            required
          />
        </label>

        <label>
          Number of subjects to be taught in a semester:
          <input
            type="number"
            name="subjectsCount"
            value={formData.subjectsCount}
            onChange={handleChange}
            className="border p-2 w-full rounded mt-1"
            required
          />
        </label>

        <div>
          <label>Names of subjects:</label>
          {formData.subjectNames.map((subject, index) => (
            <div key={index} className="flex gap-2 mt-1">
              <input
                type="text"
                value={subject}
                onChange={(e) => handleArrayChange(e, index, "subjectNames")}
                className="border p-2 w-full rounded"
                required
              />
              {formData.subjectNames.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField("subjectNames", index)}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  X
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("subjectNames")}
            className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
          >
            Add Subject
          </button>
        </div>

        <label>
          Maximum number of classes per day:
          <input
            type="number"
            name="maxClassesPerDay"
            value={formData.maxClassesPerDay}
            onChange={handleChange}
            className="border p-2 w-full rounded mt-1"
            required
          />
        </label>

        <label>
          Number of classes per subject per week:
          <input
            type="number"
            name="classesPerSubjectPerWeek"
            value={formData.classesPerSubjectPerWeek}
            onChange={handleChange}
            className="border p-2 w-full rounded mt-1"
            required
          />
        </label>

        <label>
          Number of faculties available:
          <input
            type="number"
            name="facultiesCount"
            value={formData.facultiesCount}
            onChange={handleChange}
            className="border p-2 w-full rounded mt-1"
            required
          />
        </label>

        <label>
          Average number of leaves per faculty per month:
          <input
            type="number"
            name="averageLeaves"
            value={formData.averageLeaves}
            onChange={handleChange}
            className="border p-2 w-full rounded mt-1"
            required
          />
        </label>

        <div>
          <label>Special classes (fixed slots):</label>
          {formData.specialClasses.map((cls, index) => (
            <div key={index} className="flex gap-2 mt-1">
              <input
                type="text"
                value={cls}
                onChange={(e) => handleArrayChange(e, index, "specialClasses")}
                className="border p-2 w-full rounded"
              />
              {formData.specialClasses.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField("specialClasses", index)}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  X
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("specialClasses")}
            className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
          >
            Add Special Class
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white w-full py-2 rounded mt-4 font-bold"
        >
          Save Constraints
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
