import Itinerary from '../models/itinerary.model.js';
import { errorHandler } from '../utils/error.js';

export const createItinerary = async (req, res, next) => {
  try {
    const { destination, startDate, endDate, travelers, interests, budget, specialRequirements, locations } = req.body; // Added locations
   

    const newItinerary = new Itinerary({
      destination,
      startDate,
      endDate,
      travelers: Number(travelers),
      interests,
      budget,
      specialRequirements,
      userId: req.user.id,
      locations // Added locations
    });

    const savedItinerary = await newItinerary.save();
    res.status(201).json(savedItinerary);
  } catch (error) {
    next(error);
  }
};

export const getItineraries = async (req, res, next) => {
  try {
   console.log(req.params.id , "User--- id")
    const itineraries = await Itinerary.find({ userId: req.params.id}).populate('destination');
    res.status(200).json(itineraries);
  } catch (error) {
    next(error);
  }
};

export const getItinerary = async (req, res, next) => {
  try {
    
    const itinerary = await Itinerary.findById(req.params.id).populate('destination');
    if (!itinerary) return next(errorHandler(404, 'Itinerary not found'));
  
    if (itinerary.userId.toString() !== req.user.id) {
      return next(errorHandler(401, 'You can only view your own itineraries'));
    }
    // console.log(itinerary , "Itinerary")
    res.status(200).json(itinerary);
  } catch (error) {
    next(error);
  }
};

export const updateItinerary = async (req, res, next) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) return next(errorHandler(404, 'Itinerary not found'));
    if (itinerary.user.toString() !== req.user.id) {
      return next(errorHandler(401, 'You can only update your own itineraries'));
    }
    const updatedItinerary = await Itinerary.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedItinerary);
  } catch (error) {
    next(error);
  }
};

export const deleteItinerary = async (req, res, next) => {
  try {
    // Check if the itinerary exists
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) {
      return next(errorHandler(404, 'Itinerary not found'));
    }

    // Ensure the user deleting the itinerary is the owner
    if (itinerary.userId.toString() !== req.user.id) {
      return next(errorHandler(401, 'You can only delete your own itineraries'));
    }

    // Delete the itinerary
    await Itinerary.findByIdAndDelete(req.params.id);
    s
    res.status(200).json({ message: 'Itinerary has been deleted successfully' });
  } catch (error) {
   
    next(error); // Pass the error to the global error handler
  }
};



// export const getTopItineraries = async (req, res, next) => {
//   try {
//     const topItineraries = await Itinerary.find({})
//       .sort({ selectionCount: -1 })
//       .limit(5)
//       .populate('destination');

//       console.log(topItineraries)

//     if (!topItineraries.length) {
//       return res.status(404).json({ message: 'No itineraries found' });
//     }

//     res.status(200).json(topItineraries);
//   } catch (error) {
//     console.error('Error fetching top itineraries:', error);
//     next(error);
//   }
// };

export const getTopItineraries = async (req, res, next) => {
  try {
    const topItineraries = await Itinerary.find({})
      .sort({ selectionCount: -1 })
      .limit(5)
      .populate('destination');

      console.log(topItineraries)

    if (!topItineraries.length) {
      return res.status(404).json({ message: 'No itineraries found' });
    }

    res.status(200).json(topItineraries);
  } catch (error) {
    console.error('Error fetching top itineraries:', error);
    next(error);
  }
};
