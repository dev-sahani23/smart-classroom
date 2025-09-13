import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const features = [
    {
      title: "Smart Scheduling",
      description: "Automatically generate optimal timetables based on your requirements",
      icon: "📅"
    },
    {
      title: "Resource Management",
      description: "Efficiently manage classrooms, faculty, and subject allocations",
      icon: "🎯"
    },
    {
      title: "Conflict Resolution",
      description: "Automatically detect and resolve scheduling conflicts",
      icon: "⚡"
    },
    {
      title: "Easy Customization",
      description: "Flexible options to adjust and customize your timetables",
      icon: "⚙️"
    }
  ];

  return (
    <div className="h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-16 h-full">
        {/* Hero Section */}
        <div className="w-full text-center animate-fadeIn">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Smart-Classroom
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Revolutionize your class scheduling with intelligent timetable management
          </p>
          <button 
            onClick={handleLoginClick}
            className="transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl"
          >
            Get Started →
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slideIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="w-full text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to streamline your scheduling?
          </h2>
          <p className="text-gray-600 mb-8">
            Join thousands of educational institutions already using Smart-Classroom
          </p>
          <button 
            onClick={handleLoginClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Login to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;