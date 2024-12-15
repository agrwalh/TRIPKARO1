import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import ItineraryMap from '../components/itinerary/ItineraryMap';
import { createItinerary } from '../services/Helper';
import toast from 'react-hot-toast';
import DestinationSelector from '../components/itinerary/DestinationSelector';
import TripDetails from '../components/itinerary/TripDetails'
import PreferencesForm from '../components/itinerary/PreferencesForm'
import SpecialRequirements from '../components/itinerary/SpecialRequirements'


// Sample locations (this could be fetched from an API)
const allLocationOptions = [
  { value: { lat: 28.6139, lng: 77.2090 }, label: 'New Delhi, India' }, // India Gate, Rashtrapati Bhavan
  { value: { lat: 27.1751, lng: 78.0421 }, label: 'Agra, India' }, // Taj Mahal
  { value: { lat: 26.9124, lng: 75.7873 }, label: 'Jaipur, India' }, // Amer Fort, City Palace
  { value: { lat: 12.9716, lng: 77.5946 }, label: 'Bengaluru, India' }, // Lalbagh Botanical Garden, Bangalore Palace
  { value: { lat: 19.0760, lng: 72.8777 }, label: 'Mumbai, India' }, // Gateway of India, Marine Drive
  { value: { lat: 22.5726, lng: 88.3639 }, label: 'Kolkata, India' }, // Victoria Memorial, Howrah Bridge
  { value: { lat: 15.2993, lng: 74.1240 }, label: 'Goa, India' }, // Baga Beach, Basilica of Bom Jesus
  { value: { lat: 13.0827, lng: 80.2707 }, label: 'Chennai, India' }, // Marina Beach, Kapaleeshwarar Temple
  { value: { lat: 21.1702, lng: 72.8311 }, label: 'Surat, India' }, // Dumas Beach, Science Centre
  { value: { lat: 25.3176, lng: 82.9739 }, label: 'Varanasi, India' }, // Kashi Vishwanath Temple, Ganges River Ghats
  { value: { lat: 8.5241, lng: 76.9366 }, label: 'Thiruvananthapuram, India' }, // Kovalam Beach, Padmanabhaswamy Temple
  { value: { lat: 23.0225, lng: 72.5714 }, label: 'Ahmedabad, India' }, // Sabarmati Ashram, Sidi Saiyyed Mosque
  { value: { lat: 30.7333, lng: 76.7794 }, label: 'Chandigarh, India' }, // Rock Garden, Sukhna Lake
  { value: { lat: 11.9416, lng: 79.8083 }, label: 'Pondicherry, India' }, // Promenade Beach, Auroville
  { value: { lat: 32.2190, lng: 76.3234 }, label: 'Dharamshala, India' }, // Dalai Lama Temple, Bhagsu Waterfall
  { value: { lat: 32.2396, lng: 77.1887 }, label: 'Manali, India' }, // Solang Valley, Rohtang Pass
  { value: { lat: 34.0837, lng: 74.7973 }, label: 'Srinagar, India' }, // Dal Lake, Shalimar Bagh
  { value: { lat: 10.8505, lng: 76.2711 }, label: 'Kerala, India' }, // Alleppey Backwaters, Munnar
];


function CreateItinerary() {
  const [step, setStep] = useState(1);
  const [itineraryData, setItineraryData] = useState({ locations: [], destination: null });
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const navigate = useNavigate();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleLocationChange = (selectedOptions) => {
    setSelectedLocations(selectedOptions);
    setItineraryData((prevData) => ({
      ...prevData,
      locations: selectedOptions.map(option => ({
        name: option.label,
        location: option.value
      }))
    }));

    if (selectedOptions.length > 0) {
      setSelectedDestination(selectedOptions[selectedOptions.length - 1].label);
    }
  };

  const handleSubmit = async (finalData) => {
    try {
      const fullData = {
        ...itineraryData,
        ...finalData,
        travelers: Number(itineraryData.travelers) // Ensure travelers is a number
      };
      
      const response = await createItinerary(fullData);
      console.log(response)
      toast.success('Itinerary created successfully!');
      navigate(`/itinerary/${response._id}`);
    } catch (error) {
      toast.error(error.message || 'Failed to create itinerary');
      console.error('Failed to create itinerary', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Create Your Itinerary</h2>

        {/* Location Selection */}
        {step === 1 && <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select Locations</label>
          <Select
            options={allLocationOptions}
            isMulti
            onChange={handleLocationChange}
            placeholder="Select multiple locations..."
          />
        </div> }

        {/* Destination Selection from Selected Locations */}
        {step === 1 && selectedLocations.length >= 0 && (
          <DestinationSelector 
            selectedLocations={selectedLocations} 
            onNext={(data) => { setItineraryData({ ...itineraryData, ...data }); nextStep(); }} 
          />
        )}

        {/* Display selected locations on the map */}
        

        {/* Steps for Trip Details, Preferences, and Special Requirements */}
        {step === 2 && <TripDetails onNext={(data) => { setItineraryData({ ...itineraryData, ...data }); nextStep(); }} onPrev={prevStep} />}
        {step === 3 && <PreferencesForm onNext={(data) => { setItineraryData({ ...itineraryData, ...data }); nextStep(); }} onPrev={prevStep} />}
        {step === 4 && <SpecialRequirements onSubmit={handleSubmit} onPrev={prevStep} />}
        <ItineraryMap destinations={itineraryData.locations} destination={selectedDestination} />
      </div>
    </div>
  );
}

export default CreateItinerary;