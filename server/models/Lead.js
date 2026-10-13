import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  course: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    default: 'weekend',
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'enrolled'],
    default: 'new',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;
