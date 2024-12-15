import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkedAlt, FaUserCircle, FaPlane, FaRegStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import Globe from "react-globe.gl"; // Import the globe component

// Feature Card Component
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
      <div className="text-center">
        {icon}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

// Testimonial Card
function TestimonialCard({ name, review }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <p className="text-gray-600 italic">"{review}"</p>
      <p className="font-semibold mt-4 text-right">- {name}</p>
    </div>
  );
}

function Home() {
  const { currentUser } = useSelector((state) => state.user);

  // Define markers with location coordinates (latitude, longitude)
  const markers = [
    { lat: 48.8566, lng: 2.3522, name: "Paris" }, // Paris
    { lat: 40.7128, lng: -74.0060, name: "New York" }, // New York
    { lat: 35.6762, lng: 139.6503, name: "Tokyo" }, // Tokyo
    { lat: -33.8688, lng: 151.2093, name: "Sydney" }, // Sydney
  ];

  return (
    <div className="text-center min-h-screen bg-gradient-to-r from-indigo-600 to-indigo-800">
      {/* Hero Section */}
      <div className="flex flex-col items-center py-16 px-4">
        <h1 className="text-5xl font-bold text-white mb-6">Your Personal Travel Planner</h1>
        <p className="text-xl text-white mb-8">Create custom itineraries tailored to your preferences and budget</p>
        <Link
          to={`${currentUser ? "/create-itinerary" : "/login"}`}
          className="bg-yellow-400 text-gray-800 px-8 py-3 rounded-full text-xl font-bold hover:bg-yellow-300 transition duration-300 shadow-lg"
        >
          Start Planning
        </Link>
      </div>

      {/* Interactive Globe with Markers */}
      <div className="flex justify-center items-center mb-10">
        <Globe
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          backgroundColor="rgba(0, 0, 0, 0.1)"
          width={700}
          height={700}
          pointsData={markers} // Pass markers as pointsData
          pointLat="lat" // Latitude key for the marker data
          pointLng="lng" // Longitude key for the marker data
          pointLabel="name" // Label for the markers when hovered
          pointColor="yellow" // Set marker color
          pointAltitude={0.03} // Set marker altitude (height above the globe)
          pointRadius={0.05} // Set marker radius size
        />
      </div>

      {/* Features Section */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
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

      {/* Testimonials Section */}
      <div className="bg-gray-100 py-10">
        <h2 className="text-3xl font-bold mb-6">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          <TestimonialCard
            name="John Doe"
            review="TripKaro helped me plan my entire European vacation, and I couldn't have asked for a better experience!"
          />
          <TestimonialCard
            name="Alice Smith"
            review="The personalized itineraries were perfect for my family trip to Japan. Everything was so organized!"
          />
          <TestimonialCard
            name="David Lee"
            review="I love the ease of use of this platform. It saved me so much time, and I got to explore places I never thought of."
          />
        </div>
      </div>

      {/* Popular Destinations Section */}
      <div className="mt-16 bg-gray-200 py-10">
        <h2 className="text-3xl font-bold text-center mb-6">Popular Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          <FeatureCard
            icon={<FaPlane className="text-5xl mb-4 text-yellow-400" />}
            title="Paris"
            description="Explore the Eiffel Tower and vibrant art scenes."
          />
          <FeatureCard
            icon={<FaPlane className="text-5xl mb-4 text-yellow-400" />}
            title="New York"
            description="The city that never sleeps with endless attractions."
          />
          <FeatureCard
            icon={<FaPlane className="text-5xl mb-4 text-yellow-400" />}
            title="Tokyo"
            description="A fusion of traditional culture and cutting-edge technology."
          />
          <FeatureCard
            icon={<FaPlane className="text-5xl mb-4 text-yellow-400" />}
            title="Sydney"
            description="Home to the iconic Sydney Opera House and beaches."
          />
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-indigo-700 py-10">
        <h2 className="text-3xl font-bold text-white mb-6">Stay Updated with Our Newsletter</h2>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-l-lg text-gray-800"
          />
          <button className="bg-yellow-400 px-6 py-2 rounded-r-lg text-gray-800 font-bold hover:bg-yellow-300 transition duration-300">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
