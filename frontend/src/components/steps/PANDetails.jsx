import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const PANDetails = ({ formData, updateFormData, onNext, onBack }) => {
  const [errors, setErrors] = useState({
    panNumber: '',
    panCard: '',
  });

  const fileInputRef = useRef(null);

  const validatePANNumber = (number) => {
    // PAN card format: ABCDE1234F
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(number);
  };

  const validateForm = () => {
    const newErrors = {
      panNumber: '',
      panCard: '',
    };

    let isValid = true;

    if (!formData.panNumber) {
      newErrors.panNumber = 'PAN number is required';
      isValid = false;
    } else if (!validatePANNumber(formData.panNumber)) {
      newErrors.panNumber = 'Please enter a valid PAN number';
      isValid = false;
    }

    if (!formData.panCard) {
      newErrors.panCard = 'PAN card image is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        updateFormData({ panCard: file });
        setErrors((prev) => ({ ...prev, panCard: '' }));
      } else {
        setErrors((prev) => ({
          ...prev,
          panCard: 'Please upload an image file',
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
        PAN Card Details
      </Typography>

      <TextField
        label="PAN Number"
        variant="outlined"
        fullWidth
        value={formData.panNumber}
        onChange={(e) => {
          updateFormData({ panNumber: e.target.value.toUpperCase() });
          setErrors((prev) => ({ ...prev, panNumber: '' }));
        }}
        error={!!errors.panNumber}
        helperText={errors.panNumber}
        inputProps={{
          maxLength: 10,
          style: { textTransform: 'uppercase' },
        }}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <input
          type="file"
          accept="image/*"
          hidden
          ref={fileInputRef}
          onChange={handleFileChange}
          capture="environment"
        />
        <IconButton
          color="primary"
          onClick={() => fileInputRef.current?.click()}
        >
          <PhotoCamera />
        </IconButton>
        <Typography variant="body2">
          Upload PAN Card Image
        </Typography>
        {formData.panCard && (
          <Typography variant="caption" color="primary">
            {formData.panCard.name}
          </Typography>
        )}
        {errors.panCard && (
          <Typography variant="caption" color="error">
            {errors.panCard}
          </Typography>
        )}
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
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default PANDetails;




// import React, { useState, useRef } from 'react';
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   IconButton,
// } from '@mui/material';
// import { PhotoCamera } from '@mui/icons-material';

// interface Props {
//   formData: {
//     panNumber: string;
//     panCard: File | null;
//   };
//   updateFormData: (data: Partial<{
//     panNumber: string;
//     panCard: File | null;
//   }>) => void;
//   onNext: () => void;
//   onBack: () => void;
// }

// const PANDetails: React.FC<Props> = ({
//   formData,
//   updateFormData,
//   onNext,
//   onBack,
// }) => {
//   const [errors, setErrors] = useState({
//     panNumber: '',
//     panCard: '',
//   });

//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const validatePANNumber = (number: string) => {
//     // PAN card format: ABCDE1234F
//     return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(number);
//   };

//   const validateForm = () => {
//     const newErrors = {
//       panNumber: '',
//       panCard: '',
//     };

//     let isValid = true;

//     if (!formData.panNumber) {
//       newErrors.panNumber = 'PAN number is required';
//       isValid = false;
//     } else if (!validatePANNumber(formData.panNumber)) {
//       newErrors.panNumber = 'Please enter a valid PAN number';
//       isValid = false;
//     }

//     if (!formData.panCard) {
//       newErrors.panCard = 'PAN card image is required';
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       if (file.type.startsWith('image/')) {
//         updateFormData({ panCard: file });
//         setErrors((prev) => ({ ...prev, panCard: '' }));
//       } else {
//         setErrors((prev) => ({
//           ...prev,
//           panCard: 'Please upload an image file',
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
//         PAN Card Details
//       </Typography>

//       <TextField
//         label="PAN Number"
//         variant="outlined"
//         fullWidth
//         value={formData.panNumber}
//         onChange={(e) => {
//           updateFormData({ panNumber: e.target.value.toUpperCase() });
//           setErrors((prev) => ({ ...prev, panNumber: '' }));
//         }}
//         error={!!errors.panNumber}
//         helperText={errors.panNumber}
//         inputProps={{
//           maxLength: 10,
//           style: { textTransform: 'uppercase' },
//         }}
//       />

//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           gap: 2,
//         }}
//       >
//         <input
//           type="file"
//           accept="image/*"
//           hidden
//           ref={fileInputRef}
//           onChange={handleFileChange}
//           capture="environment"
//         />
//         <IconButton
//           color="primary"
//           onClick={() => fileInputRef.current?.click()}
//         >
//           <PhotoCamera />
//         </IconButton>
//         <Typography variant="body2">
//           Upload PAN Card Image
//         </Typography>
//         {formData.panCard && (
//           <Typography variant="caption" color="primary">
//             {formData.panCard.name}
//           </Typography>
//         )}
//         {errors.panCard && (
//           <Typography variant="caption" color="error">
//             {errors.panCard}
//           </Typography>
//         )}
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
//           Next
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default PANDetails; 