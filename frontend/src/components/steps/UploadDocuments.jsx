import React, { useState, useRef } from 'react';
import {
    Box,
    Button,
    Typography,
    IconButton,
    Grid,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const UploadDocuments = ({ formData, updateFormData, onNext, onBack }) => {
    const [errors, setErrors] = useState({
        selfie: '',
        signature: '',
    });

    const selfieInputRef = useRef(null);
    const signatureInputRef = useRef(null);

    const handleFileChange = (type) => (event) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                updateFormData({ [type]: file });
                setErrors((prev) => ({ ...prev, [type]: '' }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    [type]: 'Please upload an image file',
                }));
            }
        }
    };

    const validateForm = () => {
        const newErrors = {
            selfie: '',
            signature: '',
        };

        let isValid = true;

        if (!formData.selfie) {
            newErrors.selfie = 'Selfie is required';
            isValid = false;
        }

        if (!formData.signature) {
            newErrors.signature = 'Signature image is required';
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
                Upload Documents
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={6}>
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
                            ref={selfieInputRef}
                            onChange={handleFileChange('selfie')}
                            capture="user"
                        />
                        <IconButton
                            color="primary"
                            onClick={() => selfieInputRef.current?.click()}
                        >
                            <PhotoCamera />
                        </IconButton>
                        <Typography variant="body2" align="center">
                            Take Selfie
                        </Typography>
                        {formData.selfie && (
                            <Typography variant="caption" color="primary">
                                {formData.selfie.name}
                            </Typography>
                        )}
                        {errors.selfie && (
                            <Typography variant="caption" color="error">
                                {errors.selfie}
                            </Typography>
                        )}
                    </Box>
                </Grid>

                <Grid item xs={6}>
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
                            ref={signatureInputRef}
                            onChange={handleFileChange('signature')}
                        />
                        <IconButton
                            color="primary"
                            onClick={() => signatureInputRef.current?.click()}
                        >
                            <PhotoCamera />
                        </IconButton>
                        <Typography variant="body2" align="center">
                            Upload Signature
                        </Typography>
                        {formData.signature && (
                            <Typography variant="caption" color="primary">
                                {formData.signature.name}
                            </Typography>
                        )}
                        {errors.signature && (
                            <Typography variant="caption" color="error">
                                {errors.signature}
                            </Typography>
                        )}
                    </Box>
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
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

export default UploadDocuments;


// import React, { useState, useRef } from 'react';
// import {
//   Box,
//   Button,
//   Typography,
//   IconButton,
//   Grid,
// } from '@mui/material';
// import { PhotoCamera } from '@mui/icons-material';

// interface Props {
//   formData: {
//     selfie: File | null;
//     signature: File | null;
//   };
//   updateFormData: (data: Partial<{
//     selfie: File | null;
//     signature: File | null;
//   }>) => void;
//   onNext: () => void;
//   onBack: () => void;
// }

// const UploadDocuments: React.FC<Props> = ({
//   formData,
//   updateFormData,
//   onNext,
//   onBack,
// }) => {
//   const [errors, setErrors] = useState({
//     selfie: '',
//     signature: '',
//   });

//   const selfieInputRef = useRef<HTMLInputElement>(null);
//   const signatureInputRef = useRef<HTMLInputElement>(null);

//   const handleFileChange = (type: 'selfie' | 'signature') => (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       if (file.type.startsWith('image/')) {
//         updateFormData({ [type]: file });
//         setErrors((prev) => ({ ...prev, [type]: '' }));
//       } else {
//         setErrors((prev) => ({
//           ...prev,
//           [type]: 'Please upload an image file',
//         }));
//       }
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {
//       selfie: '',
//       signature: '',
//     };

//     let isValid = true;

//     if (!formData.selfie) {
//       newErrors.selfie = 'Selfie is required';
//       isValid = false;
//     }

//     if (!formData.signature) {
//       newErrors.signature = 'Signature image is required';
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
//         Upload Documents
//       </Typography>

//       <Grid container spacing={3}>
//         <Grid item xs={6}>
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               gap: 2,
//             }}
//           >
//             <input
//               type="file"
//               accept="image/*"
//               hidden
//               ref={selfieInputRef}
//               onChange={handleFileChange('selfie')}
//               capture="user"
//             />
//             <IconButton
//               color="primary"
//               onClick={() => selfieInputRef.current?.click()}
//             >
//               <PhotoCamera />
//             </IconButton>
//             <Typography variant="body2" align="center">
//               Take Selfie
//             </Typography>
//             {formData.selfie && (
//               <Typography variant="caption" color="primary">
//                 {formData.selfie.name}
//               </Typography>
//             )}
//             {errors.selfie && (
//               <Typography variant="caption" color="error">
//                 {errors.selfie}
//               </Typography>
//             )}
//           </Box>
//         </Grid>

//         <Grid item xs={6}>
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               gap: 2,
//             }}
//           >
//             <input
//               type="file"
//               accept="image/*"
//               hidden
//               ref={signatureInputRef}
//               onChange={handleFileChange('signature')}
//             />
//             <IconButton
//               color="primary"
//               onClick={() => signatureInputRef.current?.click()}
//             >
//               <PhotoCamera />
//             </IconButton>
//             <Typography variant="body2" align="center">
//               Upload Signature
//             </Typography>
//             {formData.signature && (
//               <Typography variant="caption" color="primary">
//                 {formData.signature.name}
//               </Typography>
//             )}
//             {errors.signature && (
//               <Typography variant="caption" color="error">
//                 {errors.signature}
//               </Typography>
//             )}
//           </Box>
//         </Grid>
//       </Grid>

//       <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
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

// export default UploadDocuments; 