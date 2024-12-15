import React, { useState } from 'react';

function SpecialRequirements({ onSubmit, onPrev }) {
  const [requirements, setRequirements] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ specialRequirements: requirements });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
          Special Requirements or Preferences
        </label>
        <textarea
          id="requirements"
          rows="4"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="E.g., accessibility needs, dietary restrictions, etc."
        ></textarea>
      </div>
      <div className="flex justify-between">
        <button type="button" onClick={onPrev} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-400 transition duration-300">
          Previous
        </button>
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition duration-300">
          Create Itinerary
        </button>
      </div>
    </form>
  );
}

export default SpecialRequirements;