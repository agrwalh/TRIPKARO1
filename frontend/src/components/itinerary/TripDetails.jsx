import React, { useState , useRef} from 'react';

function TripDetails({ onNext, onPrev }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ startDate, endDate, travelers });
  };


  const handleStartDateFocus = () => {
    startDateRef.current.showPicker(); // May vary based on browser
  };

  const handleEndDateFocus = () => {
    endDateRef.current.showPicker(); // May vary based on browser
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          ref={startDateRef}
          onClick={handleStartDateFocus}
          onChange={(e) => setStartDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          ref={endDateRef}
          onClick={handleEndDateFocus}
          onChange={(e) => setEndDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="travelers" className="block text-sm font-medium text-gray-700">Number of Travelers</label>
        <input
          type="number"
          id="travelers"
          value={travelers}
          onChange={(e) => setTravelers(e.target.value)}
          min="1"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
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

export default TripDetails;