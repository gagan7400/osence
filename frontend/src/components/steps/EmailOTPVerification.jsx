import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const EmailOTPVerification = ({ formData, updateFormData, onNext, onBack }) => {
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timer > 0) {
      timerRef.current = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timer]);

  const handleResendOTP = async () => {
    try {
      const response = await fetch('/api/resend-email-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
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

    // Uncomment and update below for real OTP verification
    // if (!formData.emailOTP) {
    //   setError('Please enter the OTP');
    //   return;
    // }

    // if (!/^\d{6}$/.test(formData.emailOTP)) {
    //   setError('Please enter a valid 6-digit OTP');
    //   return;
    // }

    // try {
    //   const response = await fetch('/api/verify-email-otp', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       email: formData.email,
    //       otp: formData.emailOTP,
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
        Email Verification
      </Typography>

      <Typography variant="body2" align="center" color="textSecondary">
        We've sent an OTP to {formData.email}
      </Typography>

      <TextField
        label="Enter OTP"
        variant="outlined"
        fullWidth
        value={formData.emailOTP}
        onChange={(e) => {
          updateFormData({ emailOTP: e.target.value });
          setError('');
        }}
        error={!!error}
        helperText={error}
        inputProps={{
          maxLength: 6,
          pattern: '\\d*',
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
          Verify & Complete
        </Button>
      </Box>
    </Box>
  );
};

export default EmailOTPVerification;


// import React, { useState, useRef } from 'react';
// import { Box, Button, TextField, Typography } from '@mui/material';

// interface Props {
//   formData: {
//     email: string;
//     emailOTP: string;
//   };
//   updateFormData: (data: { emailOTP: string }) => void;
//   onNext: () => void;
//   onBack: () => void;
// }

// const EmailOTPVerification: React.FC<Props> = ({
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
//       const response = await fetch('/api/resend-email-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email: formData.email }),
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
//     onNext()
//     // if (!formData.emailOTP) {
//     //   setError('Please enter the OTP');
//     //   return;
//     // }

//     // if (!/^\d{6}$/.test(formData.emailOTP)) {
//     //   setError('Please enter a valid 6-digit OTP');
//     //   return;
//     // }

//     // try {
//     //   const response = await fetch('/api/verify-email-otp', {
//     //     method: 'POST',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify({
//     //       email: formData.email,
//     //       otp: formData.emailOTP,
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
//         Email Verification
//       </Typography>

//       <Typography variant="body2" align="center" color="textSecondary">
//         We've sent an OTP to {formData.email}
//       </Typography>

//       <TextField
//         label="Enter OTP"
//         variant="outlined"
//         fullWidth
//         value={formData.emailOTP}
//         onChange={(e) => {
//           updateFormData({ emailOTP: e.target.value });
//           setError('');
//         }}
//         error={!!error}
//         helperText={error}
//         inputProps={{
//           maxLength: 6,
//           pattern: '\\d*',
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
//           Verify & Complete
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default EmailOTPVerification; 