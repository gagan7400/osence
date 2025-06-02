import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const EmailVerification = ({ formData, updateFormData, onNext, onBack }) => {
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onNext();
    // Uncomment to enable validation and API integration
    // if (!formData.email) {
    //   setError('Email address is required');
    //   return;
    // }

    // if (!validateEmail(formData.email)) {
    //   setError('Please enter a valid email address');
    //   return;
    // }

    // try {
    //   const response = await fetch('/api/send-email-otp', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email: formData.email }),
    //   });

    //   if (response.ok) {
    //     onNext();
    //   } else {
    //     const data = await response.json();
    //     setError(data.message || 'Failed to send OTP');
    //   }
    // } catch (err) {
    //   setError('Failed to send OTP. Please try again.');
    // }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        maxWidth: 400,
        mx: 'auto',
        p: 3,
      }}
    >
      <Typography variant="h5" component="h2" align="center">
        Email Verification
      </Typography>

      <Typography variant="body2" color="textSecondary" align="center">
        Please enter your email address to receive a verification code
      </Typography>

      <TextField
        label="Email Address"
        variant="outlined"
        type="email"
        fullWidth
        value={formData.email}
        onChange={(e) => {
          updateFormData({ email: e.target.value });
          setError('');
        }}
        error={!!error}
        helperText={error}
      />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button type="button" variant="outlined" onClick={onBack} fullWidth>
          Back
        </Button>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Send OTP
        </Button>
      </Box>
    </Box>
  );
};

export default EmailVerification;


// import React, { useState } from 'react';
// import { Box, Button, TextField, Typography } from '@mui/material';

// interface Props {
//   formData: {
//     email: string;
//   };
//   updateFormData: (data: { email: string }) => void;
//   onNext: () => void;
//   onBack: () => void;
// }

// const EmailVerification: React.FC<Props> = ({
//   formData,
//   updateFormData,
//   onNext,
//   onBack,
// }) => {
//   const [error, setError] = useState('');

//   const validateEmail = (email: string) => {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
// onNext()
//     // if (!formData.email) {
//     //   setError('Email address is required');
//     //   return;
//     // }

//     // if (!validateEmail(formData.email)) {
//     //   setError('Please enter a valid email address');
//     //   return;
//     // }

//     // try {
//     //   // API call to send email OTP
//     //   const response = await fetch('/api/send-email-otp', {
//     //     method: 'POST',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify({ email: formData.email }),
//     //   });

//     //   if (response.ok) {
//     //     onNext();
//     //   } else {
//     //     const data = await response.json();
//     //     setError(data.message || 'Failed to send OTP');
//     //   }
//     // } catch (err) {
//     //   setError('Failed to send OTP. Please try again.');
//     // }
//   };

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit}
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         gap: 3,
//         maxWidth: 400,
//         mx: 'auto',
//         p: 3,
//       }}
//     >
//       <Typography variant="h5" component="h2" align="center">
//         Email Verification
//       </Typography>

//       <Typography variant="body2" color="textSecondary" align="center">
//         Please enter your email address to receive a verification code
//       </Typography>

//       <TextField
//         label="Email Address"
//         variant="outlined"
//         type="email"
//         fullWidth
//         value={formData.email}
//         onChange={(e) => {
//           updateFormData({ email: e.target.value });
//           setError('');
//         }}
//         error={!!error}
//         helperText={error}
//       />

//       <Box sx={{ display: 'flex', gap: 2 }}>
//         <Button
//           type="button"
//           variant="outlined"
//           onClick={onBack}
//           fullWidth
//         >
//           Back
//         </Button>
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//         >
//           Send OTP
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default EmailVerification; 