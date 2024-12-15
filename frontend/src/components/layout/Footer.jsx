import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p className="text-lg mt-2">Email: <a href="mailto:contact@tripkaro.com" className="text-indigo-400">contact@tripkaro.com</a></p>
          <p className="text-lg">Phone: <a href="tel:+918176012564" className="text-indigo-400">+91 81760 12564</a></p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold">Follow Us</h3>
          <div className="flex justify-center gap-6 mt-4">
            <a href="https://www.facebook.com/TripKaro" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-white transition duration-300">
              <FaFacebook size={30} />
            </a>
            <a href="https://twitter.com/TripKaro" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-white transition duration-300">
              <FaTwitter size={30} />
            </a>
            <a href="https://www.instagram.com/TripKaro" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-white transition duration-300">
              <FaInstagram size={30} />
            </a>
            <a href="https://www.linkedin.com/company/TripKaro" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-white transition duration-300">
              <FaLinkedin size={30} />
            </a>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-400">
          <p>&copy; 2024 TripKaro. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
