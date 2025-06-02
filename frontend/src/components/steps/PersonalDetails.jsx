import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const PersonalDetails = ({ formData, updateFormData, onNext, onBack }) => {
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    motherName: '',
  });

  const validateForm = () => {
    const newErrors = {
      firstName: '',
      lastName: '',
      motherName: '',
    };

    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    } else if (!/^[A-Za-z\s]{1,50}$/.test(formData.firstName)) {
      newErrors.firstName = 'Please enter a valid first name';
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    } else if (!/^[A-Za-z\s]{1,50}$/.test(formData.lastName)) {
      newErrors.lastName = 'Please enter a valid last name';
      isValid = false;
    }

    if (!formData.motherName.trim()) {
      newErrors.motherName = "Mother's name is required";
      isValid = false;
    } else if (!/^[A-Za-z\s]{1,50}$/.test(formData.motherName)) {
      newErrors.motherName = "Please enter a valid mother's name";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
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
        Personal Details
      </Typography>

      <TextField
        label="First Name"
        variant="outlined"
        fullWidth
        value={formData.firstName}
        onChange={(e) => {
          updateFormData({ firstName: e.target.value });
          setErrors((prev) => ({ ...prev, firstName: '' }));
        }}
        error={!!errors.firstName}
        helperText={errors.firstName}
        inputProps={{ maxLength: 50 }}
      />

      <TextField
        label="Last Name"
        variant="outlined"
        fullWidth
        value={formData.lastName}
        onChange={(e) => {
          updateFormData({ lastName: e.target.value });
          setErrors((prev) => ({ ...prev, lastName: '' }));
        }}
        error={!!errors.lastName}
        helperText={errors.lastName}
        inputProps={{ maxLength: 50 }}
      />

      <TextField
        label="Mother's Name"
        variant="outlined"
        fullWidth
        value={formData.motherName}
        onChange={(e) => {
          updateFormData({ motherName: e.target.value });
          setErrors((prev) => ({ ...prev, motherName: '' }));
        }}
        error={!!errors.motherName}
        helperText={errors.motherName}
        inputProps={{ maxLength: 50 }}
      />

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

export default PersonalDetails;


// import React, { useState } from 'react';
// import { Box, Button, TextField, Typography } from '@mui/material';

// interface Props {
//   formData: {
//     firstName: string;
//     lastName: string;
//     motherName: string;
//   };
//   updateFormData: (data: Partial<{
//     firstName: string;
//     lastName: string;
//     motherName: string;
//   }>) => void;
//   onNext: () => void;
//   onBack: () => void;
// }

// const PersonalDetails: React.FC<Props> = ({
//   formData,
//   updateFormData,
//   onNext,
//   onBack,
// }) => {
//   const [errors, setErrors] = useState({
//     firstName: '',
//     lastName: '',
//     motherName: '',
//   });

//   const validateForm = () => {
//     const newErrors = {
//       firstName: '',
//       lastName: '',
//       motherName: '',
//     };

//     let isValid = true;

//     if (!formData.firstName.trim()) {
//       newErrors.firstName = 'First name is required';
//       isValid = false;
//     } else if (!/^[A-Za-z\s]{1,50}$/.test(formData.firstName)) {
//       newErrors.firstName = 'Please enter a valid first name';
//       isValid = false;
//     }

//     if (!formData.lastName.trim()) {
//       newErrors.lastName = 'Last name is required';
//       isValid = false;
//     } else if (!/^[A-Za-z\s]{1,50}$/.test(formData.lastName)) {
//       newErrors.lastName = 'Please enter a valid last name';
//       isValid = false;
//     }

//     if (!formData.motherName.trim()) {
//       newErrors.motherName = "Mother's name is required";
//       isValid = false;
//     } else if (!/^[A-Za-z\s]{1,50}$/.test(formData.motherName)) {
//       newErrors.motherName = "Please enter a valid mother's name";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
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
//         Personal Details
//       </Typography>

//       <TextField
//         label="First Name"
//         variant="outlined"
//         fullWidth
//         value={formData.firstName}
//         onChange={(e) => {
//           updateFormData({ firstName: e.target.value });
//           setErrors((prev) => ({ ...prev, firstName: '' }));
//         }}
//         error={!!errors.firstName}
//         helperText={errors.firstName}
//         inputProps={{
//           maxLength: 50,
//         }}
//       />

//       <TextField
//         label="Last Name"
//         variant="outlined"
//         fullWidth
//         value={formData.lastName}
//         onChange={(e) => {
//           updateFormData({ lastName: e.target.value });
//           setErrors((prev) => ({ ...prev, lastName: '' }));
//         }}
//         error={!!errors.lastName}
//         helperText={errors.lastName}
//         inputProps={{
//           maxLength: 50,
//         }}
//       />

//       <TextField
//         label="Mother's Name"
//         variant="outlined"
//         fullWidth
//         value={formData.motherName}
//         onChange={(e) => {
//           updateFormData({ motherName: e.target.value });
//           setErrors((prev) => ({ ...prev, motherName: '' }));
//         }}
//         error={!!errors.motherName}
//         helperText={errors.motherName}
//         inputProps={{
//           maxLength: 50,
//         }}
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
//           Next
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default PersonalDetails; 