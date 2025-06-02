# Multi-Step Client Registration Form – Share Market Firm

A comprehensive multi-step registration form built with the MERN stack (MongoDB, Express.js, React, Node.js) for a share market firm. The form includes mobile number verification, personal details collection, document uploads, and email verification.

## Features

- Mobile number verification with OTP
- Personal details collection
- Aadhaar card details and image upload
- PAN card details and image upload
- Bank account details and proof upload
- Selfie and signature upload
- Email verification with OTP
- Responsive design
- Form validation
- Progress tracking

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (if you plan to add database integration)

## Project Structure

```
.
├── frontend/             # React frontend application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── styles/      # CSS styles
│   │   └── ...
│   ├── package.json
│   └── ...
├── backend/             # Express backend application
│   ├── src/
│   │   ├── server.ts    # Express server
│   │   └── ...
│   ├── package.json
│   └── ...
└── README.md
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd multi-step-registration
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../backend
   npm install
   ```

4. Create a `.env` file in the backend directory:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

5. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

6. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

7. Open your browser and navigate to `http://localhost:3000`

## Development

### Frontend

The frontend is built with:
- React
- TypeScript
- Material-UI
- React Router
- Axios

### Backend

The backend is built with:
- Express.js
- TypeScript
- Multer (for file uploads)
- CORS

## API Endpoints

- `POST /api/send-otp` - Send OTP to mobile number
- `POST /api/verify-otp` - Verify mobile OTP
- `POST /api/send-email-otp` - Send OTP to email
- `POST /api/verify-email-otp` - Verify email OTP
- `POST /api/upload-documents` - Upload user documents

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material-UI for the beautiful components
- The MERN stack community for excellent documentation and resources 