
import mongoose from 'mongoose';

// Order schema for all types of requests
const orderSchema = new mongoose.Schema({
  kind: {
    type: String,
    enum: ['pickup', 'quote', 'payment'],
    required: true
  },
  email: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['new', 'verified', 'invalid', 'processing', 'done'],
    default: 'new'
  },
  payload: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  paymentId: {
    type: String,
    required: false
  },
  signature: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

export const Order = mongoose.model('Order', orderSchema);

// Blog post schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    default: 'Bantu Team'
  },
  published: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String
  }]
}, {
  timestamps: true
});

export const Post = mongoose.model('Post', postSchema);

// Directory schema
const directorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  phone: String,
  email: String,
  website: String,
  address: String,
  services: [{
    type: String
  }],
  lat: Number,
  lng: Number,
  verified: {
    type: Boolean,
    default: false
  },
  hours: String
}, {
  timestamps: true
});

export const DirectoryEntry = mongoose.model('DirectoryEntry', directorySchema);
