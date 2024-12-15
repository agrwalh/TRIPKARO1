import React, { useState } from 'react';

function PreferencesForm({ onNext, onPrev }) {
  const [interests, setInterests] = useState([]);
  const [budget, setBudget] = useState('medium');

  const interestOptions = ['Culture', 'Nature', 'Adventure', 'Relaxation', 'Food', 'Shopping'];

  const handleInterestChange = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ interests, budget });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Interests</h3>
        <div className="grid grid-cols-2 gap-2">
          {interestOptions.map(interest => (
            <label key={interest} className="flex items-center">
              <input
                type="checkbox"
                checked={interests.includes(interest)}
                onChange={() => handleInterestChange(interest)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{interest}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Budget</h3>
        <select
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="budget">Budget</option>
          <option value="medium">Medium</option>
          <option value="luxury">Luxury</option>
        </select>
      </div>
      <div className="flex justify-between">
        <button type="button" onClick={onPrev} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-400 transition duration-300">
          Previous
        </button>
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition duration-300">
          Next
        </button>
      </div>
    </form>
  );
}

export default PreferencesForm;