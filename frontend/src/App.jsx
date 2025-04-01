import React, { useState } from 'react';
import axios from 'axios';
const API_URL=import.meta.env.VITE_API_URL;
function ProcessingModal({ visible }) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md text-center animate-fadeIn">
        <h3 className="text-2xl font-bold mb-4">Find Your College</h3>
        <p className="text-gray-700 mb-6">
          Finding the best colleges for you. Please hold on...
        </p>
        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-indigo-600 rounded-full mx-auto animate-spin"></div>
      </div>
    </div>
  );
}

function InputForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    education_level: "",
    gpa: "",
    preferred_stream: "",
    budget: "Any",
    preferred_city: "",
    on_campus_housing: "Any",
    college_type: "Any",
    desired_career_path: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-8 my-10">
      <h2 className="text-3xl font-bold text-center mb-8">Tell Us About Yourself</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Education Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Education Level</label>
            <select
              name="education_level"
              value={formData.education_level}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">Select Level</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="+2">+2</option>
            </select>
          </div>
          {/* GPA */}
          <div>
            <label className="block text-sm font-medium text-gray-700">High School GPA/Percentage</label>
            <input
              type="text"
              name="gpa"
              value={formData.gpa}
              onChange={handleChange}
              placeholder="e.g., 3.7 or 75%"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          {/* Preferred Stream */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Preferred Stream</label>
            <input
              type="text"
              name="preferred_stream"
              value={formData.preferred_stream}
              onChange={handleChange}
              placeholder="e.g., IT, Science, Management"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Budget for Tuition</label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="Any">Any</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          {/* Preferred City */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Preferred City/District</label>
            <input
              type="text"
              name="preferred_city"
              value={formData.preferred_city}
              onChange={handleChange}
              placeholder="e.g., Kathmandu, Pokhara"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          {/* On-Campus Housing */}
          <div>
            <label className="block text-sm font-medium text-gray-700">On-Campus Housing Need</label>
            <select
              name="on_campus_housing"
              value={formData.on_campus_housing}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="Any">Any</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          {/* College Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">College Type Preference</label>
            <select
              name="college_type"
              value={formData.college_type}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="Any">Any</option>
              <option value="Government">Government Only</option>
              <option value="Private">Private Only</option>
            </select>
          </div>
          {/* Desired Career Path */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Desired Career Path</label>
            <input
              type="text"
              name="desired_career_path"
              value={formData.desired_career_path}
              onChange={handleChange}
              placeholder="e.g., Data Scientist, Engineer"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition transform hover:scale-105">
          {loading ? "Finding Best Matches..." : "Get Recommendations"}
        </button>
      </form>
    </div>
  );
}

function Recommendations({ recommendations }) {
  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Your College Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-2xl p-6 transform transition duration-500 hover:scale-105">
            <h3 className="text-2xl font-semibold mb-3">{rec.college_name}</h3>
            <p className="text-gray-600 mb-2"><strong>Location:</strong> {rec.location}</p>
            <p className="text-gray-600 mb-2"><strong>Affiliated University:</strong> {rec.affiliated_university}</p>
            <p className="text-gray-700">{rec.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState("form"); // "form" or "results"
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setRecommendations([]);
    try {
      const response = await axios.post(`${API_URL}/recommend`, formData);
      setRecommendations(response.data.recommendations);
      setPage("results");
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
      {page === "form" && <InputForm onSubmit={handleFormSubmit} loading={loading} />}
      {page === "results" && <Recommendations recommendations={recommendations} />}
      <ProcessingModal visible={loading} />
    </div>
  );
}

export default App;
