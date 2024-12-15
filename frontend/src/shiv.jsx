import React from 'react'
import { FaPlane, FaMapMarkedAlt, FaUserCircle } from 'react-icons/fa'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500">
      <header className="p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold flex items-center">
            <FaPlane className="mr-2" />
            TravelPal
          </div>
          <div>
            <button className="bg-white text-purple-500 px-4 py-2 rounded-full font-semibold hover:bg-purple-100 transition duration-300 mr-2">
              Log In
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-purple-700 transition duration-300">
              Sign Up
            </button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto mt-16 px-4">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Your Personal Travel Planner
          </h1>
          <p className="text-xl text-white mb-8">
            Create custom itineraries tailored to your preferences and budget
          </p>
          <button className="bg-yellow-400 text-gray-800 px-8 py-3 rounded-full text-xl font-bold hover:bg-yellow-300 transition duration-300">
            Start Planning
          </button>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<FaMapMarkedAlt className="text-5xl mb-4 text-yellow-400" />}
            title="Personalized Itineraries"
            description="Get custom travel plans based on your interests and preferences"
          />
          <FeatureCard 
            icon={<FaUserCircle className="text-5xl mb-4 text-yellow-400" />}
            title="User-Friendly Interface"
            description="Easy-to-use platform for seamless trip planning"
          />
          <FeatureCard 
            icon={<FaPlane className="text-5xl mb-4 text-yellow-400" />}
            title="Destination Insights"
            description="Discover hidden gems and popular attractions at your chosen locations"
          />
        </div>
      </main>

      <footer className="mt-20 bg-purple-600 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 TravelPal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300">
      <div className="text-center">
        {icon}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}

export default App
