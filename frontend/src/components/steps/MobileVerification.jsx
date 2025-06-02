import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const MobileVerification = ({ formData, updateFormData, onNext }) => {
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.mobileNumber) {
      setError('Please enter your mobile number');
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    try {
      // API call to send OTP would go here
      // const response = await fetch('/api/send-otp', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ mobileNumber: formData.mobileNumber }),
      // });

      // if (response.ok) {
        onNext();
      // } else {
      //   const data = await response.json();
      //   setError(data.message || 'Failed to send OTP');
      // }
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    }
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
        Enter Your Mobile Number
      </Typography>

      <TextField
        label="Mobile Number"
        variant="outlined"
        fullWidth
        value={formData.mobileNumber}
        onChange={(e) => {
          updateFormData({ mobileNumber: e.target.value });
          setError('');
        }}
        error={!!error}
        helperText={error}
        inputProps={{
          maxLength: 10,
          pattern: '[6-9][0-9]{9}',
        }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
      >
        Send OTP
      </Button>
    </Box>
  );
};

export default MobileVerification;



// import React, { useState } from 'react';
// import { TextField, Button, Typography, Box } from '@mui/material';

// interface Props {
//   formData: {
//     mobileNumber: string;
//   };
//   updateFormData: (data: { mobileNumber: string }) => void;
//   onNext: () => void;
// }

// const MobileVerification: React.FC<Props> = ({
//   formData,
//   updateFormData,
//   onNext,
// }) => {
//   const [error, setError] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.mobileNumber) {
//       setError('Please enter your mobile number');
//       return;
//     }

//     if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
//       setError('Please enter a valid 10-digit mobile number');
//       return;
//     }

//     try {
//       // // API call to send OTP would go here
//       // const response = await fetch('/api/send-otp', {
//       //   method: 'POST',
//       //   headers: {
//       //     'Content-Type': 'application/json',
//       //   },
//       //   body: JSON.stringify({ mobileNumber: formData.mobileNumber }),
//       // });

//       // if (response.ok) {
//         onNext();
//       // } else {
//       //   const data = await response.json();
//       //   setError(data.message || 'Failed to send OTP');
//       // }
//     } catch (err) {
//       setError('Failed to send OTP. Please try again.');
//     }
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
//         Enter Your Mobile Number
//       </Typography>

//       <TextField
//         label="Mobile Number"
//         variant="outlined"
//         fullWidth
//         value={formData.mobileNumber}
//         onChange={(e) => {
//           updateFormData({ mobileNumber: e.target.value });
//           setError('');
//         }}
//         error={!!error}
//         helperText={error}
//         inputProps={{
//           maxLength: 10,
//           pattern: '[6-9][0-9]{9}',
//         }}
//       />

//       <Button
//         type="submit"
//         variant="contained"
//         color="primary"
//         size="large"
//         fullWidth
//       >
//         Send OTP
//       </Button>
//     </Box>
//   );
// };

// export default MobileVerification; 