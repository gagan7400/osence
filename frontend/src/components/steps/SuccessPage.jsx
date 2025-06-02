import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

const SuccessPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
                maxWidth: 400,
                mx: 'auto',
                p: 3,
                textAlign: 'center',
            }}
        >
            <CheckCircle
                color="success"
                sx={{ fontSize: 64 }}
            />

            <Typography variant="h4" component="h2">
                Registration Complete!
            </Typography>

            <Typography variant="body1" color="textSecondary">
                Thank you for registering with us. Your account has been successfully created.
            </Typography>

            <Typography variant="body2" color="textSecondary">
                Our team will review your documents and contact you shortly.
            </Typography>

            <Button
                variant="contained"
                color="primary"
                href="/"
                sx={{ mt: 2 }}
            >
                Back to Home
            </Button>
        </Box>
    );
};

export default SuccessPage;


// import React from 'react';
// import { Box, Typography, Button } from '@mui/material';
// import { CheckCircle } from '@mui/icons-material';

// const SuccessPage: React.FC = () => {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         gap: 3,
//         maxWidth: 400,
//         mx: 'auto',
//         p: 3,
//         textAlign: 'center',
//       }}
//     >
//       <CheckCircle
//         color="success"
//         sx={{ fontSize: 64 }}
//       />

//       <Typography variant="h4" component="h2">
//         Registration Complete!
//       </Typography>

//       <Typography variant="body1" color="textSecondary">
//         Thank you for registering with us. Your account has been successfully created.
//       </Typography>

//       <Typography variant="body2" color="textSecondary">
//         Our team will review your documents and contact you shortly.
//       </Typography>

//       <Button
//         variant="contained"
//         color="primary"
//         href="/"
//         sx={{ mt: 2 }}
//       >
//         Back to Home
//       </Button>
//     </Box>
//   );
// };

// export default SuccessPage; 