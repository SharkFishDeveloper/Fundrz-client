import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-blue-600 text-white py-4 shadow-lg">
        <div className="container flex justify-between items-center mx-auto">
          <Link to="/" className="text-2xl font-bold ml-1">FunRaiser</Link>
          <div>
            <Link to="/campaigns" className="mx-2 hover:text-blue-300">Campaigns</Link>
            <Link to="/create-campaign" className="mx-2 hover:text-blue-300">Create Campaign</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        {/* Website Name and Other Messages */}
        <div className="text-center mb-4">
          <h1 className="text-5xl font-extrabold text-blue-600 mb-2">Fund-Raiser</h1>
          <p className="text-gray-700 text-lg">Your platform for exciting fundraising campaigns.</p>
        </div>

        {/* Image and Introduction */}
        <div className="max-w-4xl bg-white p-8 rounded-lg shadow-lg mb-6 flex flex-col md:flex-row items-center">
          <img
            className="w-full md:w-1/2 rounded-lg shadow-lg mb-4 md:mb-0 md:mr-4"
            src="https://img.freepik.com/premium-photo/world-environment-earth-day-concept-with-globe-nature-eco-friendly-environment-ai-generated_342644-1058.jpg"
            alt="FunRaiser Campaign"
          />
          <div className="md:w-1/2">
            <p className="text-gray-800 font-bold text-3xl mb-4">Welcome to FunRaiser!</p>
            <p className="text-gray-600">
              Join us to make a difference. FunRaiser is your platform for creating and supporting impactful fundraising campaigns. Whether you're an individual or a nonprofit, we provide the tools to achieve your goals.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row mb-6">
          <Link to="/campaigns">
            <button className="bg-purple-500 text-white py-3 px-6 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out mb-4 md:mr-4">
              Go to Campaigns
            </button>
          </Link>
          <Link to="/create-campaign">
            <button className="bg-purple-500 text-white py-3 px-6 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out mb-4">
              Create Campaign
            </button>
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg flex items-start">
            <span className="text-5xl mr-4">🚀</span>
            <div>
              <h2 className="text-xl font-bold">Start a Campaign</h2>
              <p>Launch your fundraising campaign and make an impact.</p>
            </div>
          </div>

          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg flex items-start">
            <span className="text-5xl mr-4">🌍</span>
            <div>
              <h2 className="text-xl font-bold">Support Causes</h2>
              <p>Discover and support campaigns that align with your values.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-gray-600 mt-10 text-center">
          © 2023 FunRaiser. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Home;
