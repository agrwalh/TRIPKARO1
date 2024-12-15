import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';
import axios from 'axios'; // To make API call

const ItinerarySlider = () => {
  const [topItineraries, setTopItineraries] = useState([]);
  const responsiveSettings = {
    0: { items: 1 },
    600: { items: 2 },
    1024: { items: 3 }
  };

  useEffect(() => {
    const fetchTopItineraries = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/itinerary/top');
        setTopItineraries(response.data);
      } catch (error) {
        console.error('Error fetching itineraries:', error);
      }
    };
    
    fetchTopItineraries();
  }, []);

  return (
    <div className='bg-white mx-auto rounded-lg p-6 mt-20 grid grid-cols-1 gap-8 shadow-[0_4px_12px_rgba(0,0,0,0.1)] mb-6'>
      <div className='flex items-center mb-4 gap-2'>
        <span className='bg-blue-500 text-white p-2 rounded-full'>
          <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <p className='font-bold text-lg'>Top Itineraries</p>
      </div>

      <AliceCarousel 
        mouseTracking
        infinite
        autoPlayInterval={2000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsiveSettings}
        autoPlay
      >
        {topItineraries.map((itinerary) => (
          <div
            className='bg-gray-100 shadow-md hover:shadow-lg transition-shadow rounded-lg p-4 w-[250px] sm:w-[300px]'
            key={itinerary._id}
          >
            <Link to={`/itinerary/${itinerary._id}`}>
              <div className='mb-3'>
                <h2 className='text-lg font-bold text-blue-600 mb-2'>{itinerary.destination}</h2>
                <p className='text-sm text-gray-600 mb-1'>
                  {`From: ${new Date(itinerary.startDate).toLocaleDateString()} - To: ${new Date(itinerary.endDate).toLocaleDateString()}`}
                </p>
                <p className='text-sm text-gray-600 mb-1'>{`Travelers: ${itinerary.travelers}`}</p>
                <p className='text-sm text-gray-600 mb-1'>{`Interests: ${itinerary.interests.join(', ')}`}</p>
                <p className='text-sm text-gray-600 mb-1'>{`Budget: ${itinerary.budget.charAt(0).toUpperCase() + itinerary.budget.slice(1)}`}</p>
              </div>
            </Link>
            <div className='bg-blue-500 text-white text-xs p-1 rounded text-center mt-4'>
              View Itinerary Details
            </div>
          </div>
        ))}
      </AliceCarousel>
    </div>
  );
};

export default ItinerarySlider;
