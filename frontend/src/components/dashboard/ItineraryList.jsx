import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaTrash } from 'react-icons/fa';
import toast from "react-hot-toast";

function ItineraryList() {
  const { currentUser } = useSelector((state) => state.user);
  const [itineraries, setItineraries] = useState([]);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/itinerary/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      if (response) {
        // Filter out the deleted itinerary from the state
        setItineraries(itineraries.filter(itinerary => itinerary._id !== id));
        toast.success("Itinerary deleted successfully!");
      } else {
        const errorData = await response.json();
        toast.error(`Error deleting itinerary: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting itinerary:", error);
      toast.error("Failed to delete itinerary.");
      setError("Failed to delete itinerary.");
    }
  };

  const fetchItineraries = async () => {
    try {
      if (!currentUser) {
        setError("User is not authenticated.");
        return;
      }
      
     
      const id = currentUser._id;
      

      const response = await fetch(`/api/itinerary/all/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
     
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json(); 
      setItineraries(data);
    } catch (error) {
      console.error("Error fetching itineraries:", error);
      setError(`Failed to load itineraries: ${error.message}`);
    }
  };
  

  useEffect(() => {
    fetchItineraries();
  }, [currentUser]);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {error ? (
        <div className="text-center py-4">
          <p>{error}</p>
        </div>
      ) : itineraries.length > 0 ? (
        itineraries.map((itinerary) => (
          <div key={itinerary._id} className="block hover:bg-gray-50 flex justify-between items-center">
            <Link to={`/itinerary/${itinerary._id}`} className="flex-1 px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 truncate">
                  {itinerary.destination}
                </p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {new Date(itinerary.startDate).toLocaleDateString()} -{" "}
                    {new Date(itinerary.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    Travelers: {itinerary.travelers}
                  </p>
                  <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                    Budget: {itinerary.budget}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>Interests: {itinerary.interests.join(", ")}</p>
                </div>
              </div>
            </Link>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent link navigation
                handleDelete(itinerary._id);
              }}
              className="ml-4 text-black px-3 py-1 rounded hover:bg-gray-400"
            >
              <FaTrash className="h-3 w-3" />
            </button>
          </div>
        ))
      ) : (
        <div className="text-center py-4">
          <p>No itineraries found</p>
        </div>
      )}
    </div>
  );
}

export default ItineraryList;
