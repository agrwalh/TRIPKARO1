import React, { useState } from 'react';
import Select from 'react-select';

function DestinationSelector({ onNext, selectedLocations }) {
  const [destination, setDestination] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (destination) {
      console.log(destination)
      onNext({ destination });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Destination</label>
        <Select
          options={selectedLocations}
          onChange={(e) => {setDestination(e.label)}}
          placeholder="Select a destination..."
          isClearable
           menuPlacement="top"
          required
        />
      </div>
      <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition duration-300">
        Next
      </button>
    </form>
  );
}

export default DestinationSelector;