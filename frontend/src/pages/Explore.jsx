import React from 'react';
import DestinationCard from '../components/explore/DestinationCard';

function Explore() {
  // Mock data - replace with actual data fetching logic
  const destinations = [
    { id: 1, name: 'Paris', image: 'https://example.com/paris.jpg', description: 'The City of Light' },
    { id: 2, name: 'Tokyo', image: 'https://example.com/tokyo.jpg', description: 'A blend of the ultramodern and the traditional' },
    { id: 3, name: 'New York', image: 'https://example.com/newyork.jpg', description: 'The city that never sleeps' },
    // ... more destinations
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">Explore Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map(destination => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </div>
  );
}

export default Explore;