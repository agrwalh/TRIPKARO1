import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { 
  updateUserStart, 
  updateUserSuccess, 
  updateUserFaliure 
} from '../redux/userSlice';
import toast from "react-hot-toast";

function Profile() {
  const dispatch = useDispatch();
  const { currentUser,  loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    email: '',
    preferences: {
      travelStyle: '',
      budget: '',
      interests: []
    }
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username || '',
        email: currentUser.email || '',
        preferences: {
          travelStyle: currentUser.preferences?.travelStyle || '',
          budget: currentUser.preferences?.budget || '',
          interests: currentUser.preferences?.interests || []
        }
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('preferences.')) {
      const prefName = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefName]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };


  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        interests: prev.preferences.interests.includes(interest)
          ? prev.preferences.interests.filter(i => i !== interest)
          : [...prev.preferences.interests, interest]
      }
    }));
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        dispatch(updateUserStart())
        formData.id = currentUser._id
        const res = await fetch(`/api/user/profile`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          }
          ,body: JSON.stringify(formData),
        });

        const data = await res.json();
        console.log(data);
        dispatch(updateUserSuccess(data))
        toast.success("Profile updated successfully")
    } catch (error) {
        toast.error(error.message)
        dispatch(updateUserFaliure(error.message))
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>;

  // if (error){
  //   toast.error(error)
  // }

  if (!currentUser) {
    toast.error("No user logged in")
  }

  if (!currentUser && !loading) {
    return <div>Please log in first. </div>;  // You can add a redirect to login page here
  }

  return (
    <div className="min-h-screen ">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-8 sm:p-10">
          <h2 className="text-3xl font-extrabold text-white text-center">Your Travel Profile</h2>
        </div>
        <div className="px-6 py-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3 text-gray-800 placeholder-gray-400"
                  />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3 text-gray-800 placeholder-gray-400"
                  />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
              <div>
                <label htmlFor="preferences.travelStyle" className="block text-sm font-medium text-gray-700">Travel Style</label>
                <select
                  id="preferences.travelStyle"
                  name="preferences.travelStyle"
                  value={formData.preferences.travelStyle}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3 text-gray-800"
                  >
                  <option value="">Select a travel style</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Relaxation">Relaxation</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>
              <div>
                <label htmlFor="preferences.budget" className="block text-sm font-medium text-gray-700">Budget</label>
                <select
                  id="preferences.budget"
                  name="preferences.budget"
                  value={formData.preferences.budget}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3 text-gray-800"
                  >
                  <option value="">Select a budget range</option>
                  <option value="Budget">Budget</option>
                  <option value="Mid-range">Mid-range</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-700 mb-2">Interests</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {['Hiking', 'Culture', 'Food', 'Beaches', 'City', 'Nature'].map(interest => (
                  <label key={interest} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.preferences.interests.includes(interest)}
                      onChange={() => handleInterestChange(interest)}
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    <span className="ml-2 text-sm text-gray-700">{interest}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-3 rounded-md font-medium hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;