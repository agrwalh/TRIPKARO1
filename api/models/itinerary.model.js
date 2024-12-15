import mongoose from 'mongoose';
const itinerarySchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  travelers: {
    type: Number,
    required: true
  },
  interests: {
    type: [String],
    default: []
  },
  budget: {
    type: String,
    enum: ['budget', 'medium', 'luxury'],
    default: 'medium'
  },
  specialRequirements: {
    type: String,
    default: ''
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  locations: [{
    name: String,
    location: {
      lat: Number,
      lng: Number
    }
  }]
}, { timestamps: true });

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

export default Itinerary;