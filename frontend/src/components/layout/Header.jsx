import React from 'react';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux';

function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-indigo-600 text-white">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="font-bold flex gap-2 items-center">
          <h1 className='text-3xl font-extrabold text-white'>TripKaro!!</h1>
          <FaMapMarkedAlt className="text-2xl mb-1 text-black" />
        </Link>
        <div className="flex items-center gap-6 text-lg">
          {/* Weather Link (Google Weather) */}
          <a 
            href="https://www.google.com/search?q=weather" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mr-4 text-white hover:text-gray-300 transition duration-300"
          >
            Weather
          </a>

          {/* Book Cab (Uber) Link */}
          <a 
            href="https://www.uber.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mr-4 text-white hover:text-gray-300 transition duration-300"
          >
            Book Cab 
          </a>

          {/* Make My Trip Link */}
          <a 
            href="https://www.makemytrip.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mr-4 text-white hover:text-gray-300 transition duration-300"
          >
            Hotel/Flight 
          </a>

          {/* Premium Feature Link */}
          <span className="mr-4 text-gray-300 font-semibold">
            Explore Premium Feature
          </span>

          {/* User specific links */}
          {currentUser ? (
            <>
              <Link to="/dashboard" className="mr-4 text-white hover:text-gray-300 transition duration-300">Dashboard</Link>
              <Link to="/profile" className="mr-4 text-white hover:text-gray-300 transition duration-300">Profile</Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4 text-white hover:text-gray-300 transition duration-300">Login</Link>
            </>
          )}
        </div>
      </nav>

      {/* Emergency Helplines Section */}
      <div className="bg-red-700 py-3">
        <div className="container mx-auto text-center">
          <p className="text-lg font-semibold mb-2">
            <span className="emergency-blink text-white">Emergency Helplines: Police - 100 | Ambulance - 108 | Women Helpline - 1091</span>
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
