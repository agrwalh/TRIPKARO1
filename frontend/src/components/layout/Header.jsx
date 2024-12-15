import React from 'react';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux';

function Header() {
  const { currentUser } = useSelector((state) => state.user);

  

  return (
    <header className="bg-indigo-600 text-white">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="font-bold flex gap-2">
          <h1 className='text-2xl'>TripTales!!</h1> <FaMapMarkedAlt className="text-2xl mb-4 text-black" />
        </Link>
        <div>
          {currentUser ? (
            <>
              <Link to="/dashboard" className="mr-4">Dashboard</Link>
              <Link to="/profile" className="mr-4">Profile</Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
            </>
          )}
        </div>
      </nav>
     
    </header>
  );
}

export default Header;