import React from 'react';
import { Link } from 'react-router-dom';

function DestinationCard({ destination }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={destination.image} alt={destination.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
        <p className="text-gray-600 mb-4">{destination.description}</p>
        <Link to={`/create-itinerary?destination=${destination.name}`} className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition duration-300">
          Plan a Trip
        </Link>
      </div>
    </div>
  );
}

export default DestinationCard;