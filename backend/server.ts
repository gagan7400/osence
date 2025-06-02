import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniquePrefix = uuidv4();
    cb(null, uniquePrefix + '-' + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// Routes
app.post('/api/send-otp', async (req, res) => {
  try {
    const { mobileNumber } = req.body;
    // TODO: Implement OTP sending logic
    // For demo, we'll just return a success response
    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

app.post('/api/verify-otp', async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;
    // TODO: Implement OTP verification logic
    // For demo, we'll accept any 6-digit OTP
    if (/^\d{6}$/.test(otp)) {
      res.json({ success: true, message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to verify OTP' });
  }
});

app.post('/api/send-email-otp', async (req, res) => {
  try {
    const { email } = req.body;
    // TODO: Implement email OTP sending logic
    // For demo, we'll just return a success response
    res.json({ success: true, message: 'Email OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send email OTP' });
  }
});

app.post('/api/verify-email-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    // TODO: Implement email OTP verification logic
    // For demo, we'll accept any 6-digit OTP
    if (/^\d{6}$/.test(otp)) {
      res.json({ success: true, message: 'Email OTP verified successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to verify email OTP' });
  }
});

// File upload endpoints
app.post('/api/upload-documents', upload.fields([
  { name: 'aadhaarFront', maxCount: 1 },
  { name: 'aadhaarBack', maxCount: 1 },
  { name: 'panCard', maxCount: 1 },
  { name: 'bankProof', maxCount: 1 },
  { name: 'selfie', maxCount: 1 },
  { name: 'signature', maxCount: 1 },
]), async (req, res) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    // Process the uploaded files
    const uploadedFiles: { [key: string]: string } = {};
    Object.keys(files).forEach(key => {
      uploadedFiles[key] = files[key][0].filename;
    });

    res.json({
      success: true,
      message: 'Files uploaded successfully',
      files: uploadedFiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to upload files',
    });
  }
});

// Create uploads directory if it doesn't exist
import fs from 'fs';
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 