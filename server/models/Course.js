import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['rag', 'agents', 'prompts', 'interview', 'web', 'ai', 'cloud'],
  },
  tag: {
    type: String,
    default: 'Popular',
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 4.9,
  },
  reviewsCount: {
    type: Number,
    default: 1200,
  },
  highlights: [{
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
