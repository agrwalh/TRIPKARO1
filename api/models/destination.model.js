import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  image: String,
  popularActivities: [String],
}, { timestamps: true });

const Destination = mongoose.model('Destination', destinationSchema);

export default Destination;