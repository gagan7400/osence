import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';

const OTPVerification = ({ formData, updateFormData, onNext, onBack }) => {
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timer > 0) {
      timerRef.current = setTimeout(() => setTimer(timer - 1), 1000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timer]);

  const handleResendOTP = async () => {
    try {
      const response = await fetch('/api/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobileNumber: formData.mobileNumber }),
      });

      if (response.ok) {
        setTimer(30);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to resend OTP');
      }
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onNext();

    // Uncomment this block to enable actual OTP verification

    // if (!formData.mobileOTP) {
    //   setError('Please enter the OTP');
    //   return;
    // }

    // if (!/^\d{6}$/.test(formData.mobileOTP)) {
    //   setError('Please enter a valid 6-digit OTP');
    //   return;
    // }

    // try {
    //   const response = await fetch('/api/verify-otp', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       mobileNumber: formData.mobileNumber,
    //       otp: formData.mobileOTP,
    //     }),
    //   });

    //   if (response.ok) {
    //     onNext();
    //   } else {
    //     const data = await response.json();
    //     setError(data.message || 'Invalid OTP');
    //   }
    // } catch (err) {
    //   setError('Failed to verify OTP. Please try again.');
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
        Enter OTP
      </Typography>

      <Typography variant="body2" align="center" color="textSecondary">
        We've sent an OTP to {formData.mobileNumber}
      </Typography>

      <TextField
        label="Enter OTP"
        variant="outlined"
        fullWidth
        value={formData.mobileOTP}
        onChange={(e) => {
          updateFormData({ mobileOTP: e.target.value });
          setError('');
        }}
        error={!!error}
        helperText={error}
        inputProps={{
          maxLength: 6,
          pattern: '\\d{6}',
        }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          type="button"
          variant="outlined"
          onClick={handleResendOTP}
          disabled={timer > 0}
        >
          {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          type="button"
          variant="outlined"
          onClick={onBack}
          fullWidth
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Verify & Continue
        </Button>
      </Box>
    </Box>
  );
};

export default OTPVerification;

// import React, { useState, useRef } from 'react';
// import { Box, Button, Typography, TextField } from '@mui/material';

// interface Props {
//   formData: {
//     mobileNumber: string;
//     mobileOTP: string;
//   };
//   updateFormData: (data: { mobileOTP: string }) => void;
//   onNext: () => void;
//   onBack: () => void;
// }

// const OTPVerification: React.FC<Props> = ({
//   formData,
//   updateFormData,
//   onNext,
//   onBack,
// }) => {
//   const [error, setError] = useState('');
//   const [timer, setTimer] = useState(30);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);

//   React.useEffect(() => {
//     if (timer > 0) {
//       timerRef.current = setTimeout(() => setTimer(timer - 1), 1000);
//     }
//     return () => {
//       if (timerRef.current) clearTimeout(timerRef.current);
//     };
//   }, [timer]);

//   const handleResendOTP = async () => {
//     try {
//       const response = await fetch('/api/resend-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ mobileNumber: formData.mobileNumber }),
//       });

//       if (response.ok) {
//         setTimer(30);
//       } else {
//         const data = await response.json();
//         setError(data.message || 'Failed to resend OTP');
//       }
//     } catch (err) {
//       setError('Failed to resend OTP. Please try again.');
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
// onNext();
//     // if (!formData.mobileOTP) {
//     //   setError('Please enter the OTP');
//     //   return;
//     // }

//     // if (!/^\d{6}$/.test(formData.mobileOTP)) {
//     //   setError('Please enter a valid 6-digit OTP');
//     //   return;
//     // }

//     // try {
//     //   const response = await fetch('/api/verify-otp', {
//     //     method: 'POST',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify({
//     //       mobileNumber: formData.mobileNumber,
//     //       otp: formData.mobileOTP,
//     //     }),
//     //   });

//     //   if (response.ok) {
//     //     onNext();
//     //   } else {
//     //     const data = await response.json();
//     //     setError(data.message || 'Invalid OTP');
//     //   }
//     // } catch (err) {
//     //   setError('Failed to verify OTP. Please try again.');
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
//         Enter OTP
//       </Typography>

//       <Typography variant="body2" align="center" color="textSecondary">
//         We've sent an OTP to {formData.mobileNumber}
//       </Typography>

//       <TextField
//         label="Enter OTP"
//         variant="outlined"
//         fullWidth
//         value={formData.mobileOTP}
//         onChange={(e) => {
//           updateFormData({ mobileOTP: e.target.value });
//           setError('');
//         }}
//         error={!!error}
//         helperText={error}
//         inputProps={{
//           maxLength: 6,
//           pattern: '\\d{6}',
//         }}
//       />

//       <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
//         <Button
//           type="button"
//           variant="outlined"
//           onClick={handleResendOTP}
//           disabled={timer > 0}
//         >
//           {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
//         </Button>
//       </Box>

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
//           Verify & Continue
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default OTPVerification; 