import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const BankDetails = ({
  formData,
  updateFormData,
  onNext,
  onBack,
}) => {
  const [errors, setErrors] = useState({
    accountNumber: '',
    ifscCode: '',
    bankProof: '',
  });

  const fileInputRef = useRef(null);

  const validateIFSC = (code) => {
    return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(code);
  };

  const validateAccountNumber = (number) => {
    return /^\d{8,18}$/.test(number);
  };

  const validateForm = () => {
    const newErrors = {
      accountNumber: '',
      ifscCode: '',
      bankProof: '',
    };

    let isValid = true;

    if (!formData.accountNumber) {
      newErrors.accountNumber = 'Account number is required';
      isValid = false;
    } else if (!validateAccountNumber(formData.accountNumber)) {
      newErrors.accountNumber = 'Please enter a valid account number (8-18 digits)';
      isValid = false;
    }

    if (!formData.ifscCode) {
      newErrors.ifscCode = 'IFSC code is required';
      isValid = false;
    } else if (!validateIFSC(formData.ifscCode)) {
      newErrors.ifscCode = 'Please enter a valid IFSC code';
      isValid = false;
    }

    if (!formData.bankProof) {
      newErrors.bankProof = 'Bank proof document is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        updateFormData({ bankProof: file });
        setErrors((prev) => ({ ...prev, bankProof: '' }));
      } else {
        setErrors((prev) => ({
          ...prev,
          bankProof: 'Please upload an image file',
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
        Bank Account Details
      </Typography>

      <TextField
        label="Account Number"
        variant="outlined"
        fullWidth
        value={formData.accountNumber}
        onChange={(e) => {
          updateFormData({ accountNumber: e.target.value });
          setErrors((prev) => ({ ...prev, accountNumber: '' }));
        }}
        error={!!errors.accountNumber}
        helperText={errors.accountNumber}
        inputProps={{
          maxLength: 18,
          pattern: '\\d*',
        }}
      />

      <TextField
        label="IFSC Code"
        variant="outlined"
        fullWidth
        value={formData.ifscCode}
        onChange={(e) => {
          updateFormData({ ifscCode: e.target.value.toUpperCase() });
          setErrors((prev) => ({ ...prev, ifscCode: '' }));
        }}
        error={!!errors.ifscCode}
        helperText={errors.ifscCode}
        inputProps={{
          maxLength: 11,
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
          Upload Bank Proof (Passbook/Statement)
        </Typography>
        {formData.bankProof && (
          <Typography variant="caption" color="primary">
            {formData.bankProof.name}
          </Typography>
        )}
        {errors.bankProof && (
          <Typography variant="caption" color="error">
            {errors.bankProof}
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

export default BankDetails;



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
//     accountNumber: string;
//     ifscCode: string;
//     bankProof: File | null;
//   };
//   updateFormData: (data: Partial<{
//     accountNumber: string;
//     ifscCode: string;
//     bankProof: File | null;
//   }>) => void;
//   onNext: () => void;
//   onBack: () => void;
// }

// const BankDetails: React.FC<Props> = ({
//   formData,
//   updateFormData,
//   onNext,
//   onBack,
// }) => {
//   const [errors, setErrors] = useState({
//     accountNumber: '',
//     ifscCode: '',
//     bankProof: '',
//   });

//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const validateIFSC = (code: string) => {
//     // IFSC code format: 4 characters followed by 7 numbers
//     return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(code);
//   };

//   const validateAccountNumber = (number: string) => {
//     // Basic account number validation (8-18 digits)
//     return /^\d{8,18}$/.test(number);
//   };

//   const validateForm = () => {
//     const newErrors = {
//       accountNumber: '',
//       ifscCode: '',
//       bankProof: '',
//     };

//     let isValid = true;

//     if (!formData.accountNumber) {
//       newErrors.accountNumber = 'Account number is required';
//       isValid = false;
//     } else if (!validateAccountNumber(formData.accountNumber)) {
//       newErrors.accountNumber = 'Please enter a valid account number (8-18 digits)';
//       isValid = false;
//     }

//     if (!formData.ifscCode) {
//       newErrors.ifscCode = 'IFSC code is required';
//       isValid = false;
//     } else if (!validateIFSC(formData.ifscCode)) {
//       newErrors.ifscCode = 'Please enter a valid IFSC code';
//       isValid = false;
//     }

//     if (!formData.bankProof) {
//       newErrors.bankProof = 'Bank proof document is required';
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       if (file.type.startsWith('image/')) {
//         updateFormData({ bankProof: file });
//         setErrors((prev) => ({ ...prev, bankProof: '' }));
//       } else {
//         setErrors((prev) => ({
//           ...prev,
//           bankProof: 'Please upload an image file',
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
//         Bank Account Details
//       </Typography>

//       <TextField
//         label="Account Number"
//         variant="outlined"
//         fullWidth
//         value={formData.accountNumber}
//         onChange={(e) => {
//           updateFormData({ accountNumber: e.target.value });
//           setErrors((prev) => ({ ...prev, accountNumber: '' }));
//         }}
//         error={!!errors.accountNumber}
//         helperText={errors.accountNumber}
//         inputProps={{
//           maxLength: 18,
//           pattern: '\\d*',
//         }}
//       />

//       <TextField
//         label="IFSC Code"
//         variant="outlined"
//         fullWidth
//         value={formData.ifscCode}
//         onChange={(e) => {
//           updateFormData({ ifscCode: e.target.value.toUpperCase() });
//           setErrors((prev) => ({ ...prev, ifscCode: '' }));
//         }}
//         error={!!errors.ifscCode}
//         helperText={errors.ifscCode}
//         inputProps={{
//           maxLength: 11,
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
//           Upload Bank Proof (Passbook/Statement)
//         </Typography>
//         {formData.bankProof && (
//           <Typography variant="caption" color="primary">
//             {formData.bankProof.name}
//           </Typography>
//         )}
//         {errors.bankProof && (
//           <Typography variant="caption" color="error">
//             {errors.bankProof}
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

// export default BankDetails; 