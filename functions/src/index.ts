
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { z } from 'zod';
import crypto from 'crypto';
import { Order, Post, DirectoryEntry } from './models';

// Initialize Firebase Admin
admin.initializeApp();

// Connect to MongoDB
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }

  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI environment variable is not set');
    }

    await mongoose.connect(mongoUri);
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

// Express app setup
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Validation schemas
const pickupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  address: z.string().min(5, 'Address is required'),
  items: z.string().min(10, 'Please describe the items')
});

const quoteSchema = z.object({
  company: z.string().min(1, 'Company name is required'),
  contact: z.string().min(1, 'Contact person is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  requirements: z.string().min(10, 'Please describe your requirements'),
  volume: z.string().optional(),
  frequency: z.string().optional()
});

// Helper function to verify admin
const verifyAdmin = async (req: express.Request): Promise<boolean> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    const adminEmails = process.env.ADMIN_ALLOWED_EMAILS?.split(',') || [];
    return adminEmails.includes(decodedToken.email || '');
  } catch (error) {
    console.error('Error verifying admin:', error);
    return false;
  }
};

// Helper function to generate MD5 signature for PayFast
const generatePayFastSignature = (data: Record<string, any>, passphrase?: string): string => {
  // Remove signature from data if present
  const { signature, ...cleanData } = data;
  
  // Sort keys and create query string
  const sortedKeys = Object.keys(cleanData).sort();
  const queryString = sortedKeys
    .map(key => `${key}=${encodeURIComponent(cleanData[key])}`)
    .join('&');
  
  // Add passphrase if provided
  const stringToSign = passphrase ? `${queryString}&passphrase=${passphrase}` : queryString;
  
  // Generate MD5 hash
  return crypto.createHash('md5').update(stringToSign).digest('hex');
};

// Routes

// Pickup request endpoint
app.post('/pickup', async (req, res) => {
  try {
    await connectToDatabase();
    
    const validatedData = pickupSchema.parse(req.body);
    
    const order = new Order({
      kind: 'pickup',
      email: validatedData.email,
      status: 'new',
      payload: validatedData
    });
    
    await order.save();
    
    res.json({ ok: true, id: order._id });
  } catch (error) {
    console.error('Error processing pickup request:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Validation error', 
        details: error.errors 
      });
    }
    
    res.status(500).json({ ok: false, error: 'Internal server error' });
  }
});

// Quote request endpoint
app.post('/quote', async (req, res) => {
  try {
    await connectToDatabase();
    
    const validatedData = quoteSchema.parse(req.body);
    
    const order = new Order({
      kind: 'quote',
      email: validatedData.email,
      status: 'new',
      payload: validatedData
    });
    
    await order.save();
    
    res.json({ ok: true, id: order._id });
  } catch (error) {
    console.error('Error processing quote request:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Validation error', 
        details: error.errors 
      });
    }
    
    res.status(500).json({ ok: false, error: 'Internal server error' });
  }
});

// PayFast ITN endpoint
app.post('/payfast/itn', async (req, res) => {
  try {
    await connectToDatabase();
    
    const data = req.body;
    const receivedSignature = data.signature;
    const passphrase = process.env.PAYFAST_PASSPHRASE;
    
    // Generate signature for verification
    const expectedSignature = generatePayFastSignature(data, passphrase);
    
    const isValid = receivedSignature === expectedSignature;
    
    const order = new Order({
      kind: 'payment',
      status: isValid ? 'verified' : 'invalid',
      payload: data,
      paymentId: data.m_payment_id,
      signature: receivedSignature
    });
    
    await order.save();
    
    // Always return 200 OK for PayFast
    res.sendStatus(200);
  } catch (error) {
    console.error('Error processing PayFast ITN:', error);
    res.sendStatus(200); // Still return 200 to prevent PayFast retries
  }
});

// Admin orders endpoint
app.get('/orders', async (req, res) => {
  try {
    await connectToDatabase();
    
    const isAdmin = await verifyAdmin(req);
    if (!isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const { kind, status, from, to } = req.query;
    
    const filter: any = {};
    if (kind) filter.kind = kind;
    if (status) filter.status = status;
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from as string);
      if (to) filter.createdAt.$lte = new Date(to as string);
    }
    
    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .limit(100);
    
    res.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update order status endpoint
app.patch('/orders/:id', async (req, res) => {
  try {
    await connectToDatabase();
    
    const isAdmin = await verifyAdmin(req);
    if (!isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['new', 'verified', 'invalid', 'processing', 'done'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json({ order });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Blog posts endpoints
app.get('/posts', async (req, res) => {
  try {
    await connectToDatabase();
    
    const posts = await Post.find({ published: true })
      .sort({ createdAt: -1 })
      .select('title body slug author createdAt tags');
    
    res.json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/posts', async (req, res) => {
  try {
    await connectToDatabase();
    
    const isAdmin = await verifyAdmin(req);
    if (!isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const { title, body, tags } = req.body;
    
    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const post = new Post({
      title,
      body,
      slug,
      tags: tags || [],
      published: true
    });
    
    await post.save();
    
    res.json({ post });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Directory endpoints
app.get('/directory', async (req, res) => {
  try {
    await connectToDatabase();
    
    const { city, service } = req.query;
    
    const filter: any = { verified: true };
    if (city) filter.city = city;
    if (service) filter.services = { $in: [service] };
    
    const entries = await DirectoryEntry.find(filter).sort({ name: 1 });
    
    res.json({ entries });
  } catch (error) {
    console.error('Error fetching directory:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/directory', async (req, res) => {
  try {
    await connectToDatabase();
    
    const isAdmin = await verifyAdmin(req);
    if (!isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const entry = new DirectoryEntry(req.body);
    await entry.save();
    
    res.json({ entry });
  } catch (error) {
    console.error('Error creating directory entry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export the Express app as a Firebase Function
export const api = functions.https.onRequest(app);
