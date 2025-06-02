import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Grid,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const AadhaarDetails = ({ formData, updateFormData, onNext, onBack }) => {
  const [errors, setErrors] = useState({
    aadhaarNumber: '',
    aadhaarFront: '',
    aadhaarBack: '',
  });

  const frontInputRef = useRef(null);
  const backInputRef = useRef(null);

  const validateAadhaarNumber = (number) => {
    return /^\d{12}$/.test(number);
  };

  const validateForm = () => {
    const newErrors = {
      aadhaarNumber: '',
      aadhaarFront: '',
      aadhaarBack: '',
    };

    let isValid = true;

    if (!formData.aadhaarNumber) {
      newErrors.aadhaarNumber = 'Aadhaar number is required';
      isValid = false;
    } else if (!validateAadhaarNumber(formData.aadhaarNumber)) {
      newErrors.aadhaarNumber = 'Please enter a valid 12-digit Aadhaar number';
      isValid = false;
    }

    if (!formData.aadhaarFront) {
      newErrors.aadhaarFront = 'Front image of Aadhaar card is required';
      isValid = false;
    }

    if (!formData.aadhaarBack) {
      newErrors.aadhaarBack = 'Back image of Aadhaar card is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFileChange = (side) => (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        updateFormData({
          [side === 'front' ? 'aadhaarFront' : 'aadhaarBack']: file,
        });
        setErrors((prev) => ({
          ...prev,
          [side === 'front' ? 'aadhaarFront' : 'aadhaarBack']: '',
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [side === 'front' ? 'aadhaarFront' : 'aadhaarBack']: 'Please upload an image file',
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
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
        Aadhaar Details
      </Typography>

      <TextField
        label="Aadhaar Number"
        variant="outlined"
        fullWidth
        value={formData.aadhaarNumber}
        onChange={(e) => {
          updateFormData({ aadhaarNumber: e.target.value });
          setErrors((prev) => ({ ...prev, aadhaarNumber: '' }));
        }}
        error={!!errors.aadhaarNumber}
        helperText={errors.aadhaarNumber}
        inputProps={{
          maxLength: 12,
          pattern: '\\d*',
        }}
      />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={frontInputRef}
            onChange={handleFileChange('front')}
            capture="environment"
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <IconButton
              color="primary"
              onClick={() => frontInputRef.current?.click()}
            >
              <PhotoCamera />
            </IconButton>
            <Typography variant="body2" align="center">
              Front Side
            </Typography>
            {formData.aadhaarFront && (
              <Typography variant="caption" color="primary">
                {formData.aadhaarFront.name}
              </Typography>
            )}
            {errors.aadhaarFront && (
              <Typography variant="caption" color="error">
                {errors.aadhaarFront}
              </Typography>
            )}
          </Box>
        </Grid>

        <Grid item xs={6}>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={backInputRef}
            onChange={handleFileChange('back')}
            capture="environment"
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <IconButton
              color="primary"
              onClick={() => backInputRef.current?.click()}
            >
              <PhotoCamera />
            </IconButton>
            <Typography variant="body2" align="center">
              Back Side
            </Typography>
            {formData.aadhaarBack && (
              <Typography variant="caption" color="primary">
                {formData.aadhaarBack.name}
              </Typography>
            )}
            {errors.aadhaarBack && (
              <Typography variant="caption" color="error">
                {errors.aadhaarBack}
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>

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
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default AadhaarDetails;


// import React, { useState, useRef } from 'react';
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   IconButton,
//   Grid,
// } from '@mui/material';
// import { PhotoCamera } from '@mui/icons-material';

// interface Props {
//   formData: {
//     aadhaarNumber: string;
//     aadhaarFront: File | null;
//     aadhaarBack: File | null;
//   };
//   updateFormData: (data: Partial<{
//     aadhaarNumber: string;
//     aadhaarFront: File | null;
//     aadhaarBack: File | null;
//   }>) => void;
//   onNext: () => void;
//   onBack: () => void;
// }

// const AadhaarDetails: React.FC<Props> = ({
//   formData,
//   updateFormData,
//   onNext,
//   onBack,
// }) => {
//   const [errors, setErrors] = useState({
//     aadhaarNumber: '',
//     aadhaarFront: '',
//     aadhaarBack: '',
//   });

//   const frontInputRef = useRef<HTMLInputElement>(null);
//   const backInputRef = useRef<HTMLInputElement>(null);

//   const validateAadhaarNumber = (number: string) => {
//     // Basic Aadhaar number validation (12 digits)
//     return /^\d{12}$/.test(number);
//   };

//   const validateForm = () => {
//     const newErrors = {
//       aadhaarNumber: '',
//       aadhaarFront: '',
//       aadhaarBack: '',
//     };

//     let isValid = true;

//     if (!formData.aadhaarNumber) {
//       newErrors.aadhaarNumber = 'Aadhaar number is required';
//       isValid = false;
//     } else if (!validateAadhaarNumber(formData.aadhaarNumber)) {
//       newErrors.aadhaarNumber = 'Please enter a valid 12-digit Aadhaar number';
//       isValid = false;
//     }

//     if (!formData.aadhaarFront) {
//       newErrors.aadhaarFront = 'Front image of Aadhaar card is required';
//       isValid = false;
//     }

//     if (!formData.aadhaarBack) {
//       newErrors.aadhaarBack = 'Back image of Aadhaar card is required';
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleFileChange = (side: 'front' | 'back') => (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       if (file.type.startsWith('image/')) {
//         updateFormData({
//           [side === 'front' ? 'aadhaarFront' : 'aadhaarBack']: file,
//         });
//         setErrors((prev) => ({
//           ...prev,
//           [side === 'front' ? 'aadhaarFront' : 'aadhaarBack']: '',
//         }));
//       } else {
//         setErrors((prev) => ({
//           ...prev,
//           [side === 'front' ? 'aadhaarFront' : 'aadhaarBack']: 'Please upload an image file',
//         }));
//       }
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateForm()) {
//       onNext();
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
//         Aadhaar Details
//       </Typography>

//       <TextField
//         label="Aadhaar Number"
//         variant="outlined"
//         fullWidth
//         value={formData.aadhaarNumber}
//         onChange={(e) => {
//           updateFormData({ aadhaarNumber: e.target.value });
//           setErrors((prev) => ({ ...prev, aadhaarNumber: '' }));
//         }}
//         error={!!errors.aadhaarNumber}
//         helperText={errors.aadhaarNumber}
//         inputProps={{
//           maxLength: 12,
//           pattern: '\\d*',
//         }}
//       />

//       <Grid container spacing={2}>
//         <Grid item xs={6}>
//           <input
//             type="file"
//             accept="image/*"
//             hidden
//             ref={frontInputRef}
//             onChange={handleFileChange('front')}
//             capture="environment"
//           />
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               gap: 1,
//             }}
//           >
//             <IconButton
//               color="primary"
//               onClick={() => frontInputRef.current?.click()}
//             >
//               <PhotoCamera />
//             </IconButton>
//             <Typography variant="body2" align="center">
//               Front Side
//             </Typography>
//             {formData.aadhaarFront && (
//               <Typography variant="caption" color="primary">
//                 {formData.aadhaarFront.name}
//               </Typography>
//             )}
//             {errors.aadhaarFront && (
//               <Typography variant="caption" color="error">
//                 {errors.aadhaarFront}
//               </Typography>
//             )}
//           </Box>
//         </Grid>

//         <Grid item xs={6}>
//           <input
//             type="file"
//             accept="image/*"
//             hidden
//             ref={backInputRef}
//             onChange={handleFileChange('back')}
//             capture="environment"
//           />
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               gap: 1,
//             }}
//           >
//             <IconButton
//               color="primary"
//               onClick={() => backInputRef.current?.click()}
//             >
//               <PhotoCamera />
//             </IconButton>
//             <Typography variant="body2" align="center">
//               Back Side
//             </Typography>
//             {formData.aadhaarBack && (
//               <Typography variant="caption" color="primary">
//                 {formData.aadhaarBack.name}
//               </Typography>
//             )}
//             {errors.aadhaarBack && (
//               <Typography variant="caption" color="error">
//                 {errors.aadhaarBack}
//               </Typography>
//             )}
//           </Box>
//         </Grid>
//       </Grid>

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
//           Next
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default AadhaarDetails; 