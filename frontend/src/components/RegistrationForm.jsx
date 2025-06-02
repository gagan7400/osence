import React, { useState } from 'react';
import MobileVerification from './steps/MobileVerification';
import OTPVerification from './steps/OTPVerification';
import PersonalDetails from './steps/PersonalDetails';
import AadhaarDetails from './steps/AadhaarDetails';
import PANDetails from './steps/PANDetails';
import BankDetails from './steps/BankDetails';
import UploadDocuments from './steps/UploadDocuments';
import EmailVerification from './steps/EmailVerification';
import EmailOTPVerification from './steps/EmailOTPVerification';
import SuccessPage from './steps/SuccessPage';
import '../styles/RegistrationForm.css';

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    mobileNumber: '',
    mobileOTP: '',
    firstName: '',
    lastName: '',
    motherName: '',
    aadhaarNumber: '',
    aadhaarFront: null,
    aadhaarBack: null,
    panNumber: '',
    panCard: null,
    accountNumber: '',
    ifscCode: '',
    bankProof: null,
    selfie: null,
    signature: null,
    email: '',
    emailOTP: '',
  });

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <MobileVerification
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <OTPVerification
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <PersonalDetails
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <AadhaarDetails
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <PANDetails
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 6:
        return (
          <BankDetails
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 7:
        return (
          <UploadDocuments
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 8:
        return (
          <EmailVerification
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 9:
        return (
          <EmailOTPVerification
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 10:
        return <SuccessPage />;
      default:
        return null;
    }
  };

  return (
    <div className="registration-form">
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${(currentStep / 10) * 100}%` }}
        ></div>
      </div>
      <div className="step-content">{renderStep()}</div>
    </div>
  );
};

export default RegistrationForm;


// import React, { useState } from 'react';
// import MobileVerification from './steps/MobileVerification.tsx';
// import OTPVerification from './steps/OTPVerification.tsx';
// import PersonalDetails from './steps/PersonalDetails.tsx';
// import AadhaarDetails from './steps/AadhaarDetails.tsx';
// import PANDetails from './steps/PANDetails.tsx';
// import BankDetails from './steps/BankDetails.tsx';
// import UploadDocuments from './steps/UploadDocuments.tsx';
// import EmailVerification from './steps/EmailVerification.tsx';
// import EmailOTPVerification from './steps/EmailOTPVerification.tsx';
// import SuccessPage from './steps/SuccessPage.tsx';
// import '../styles/RegistrationForm.css';

// const RegistrationForm: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     mobileNumber: '',
//     mobileOTP: '',
//     firstName: '',
//     lastName: '',
//     motherName: '',
//     aadhaarNumber: '',
//     aadhaarFront: null as File | null,
//     aadhaarBack: null as File | null,
//     panNumber: '',
//     panCard: null as File | null,
//     accountNumber: '',
//     ifscCode: '',
//     bankProof: null as File | null,
//     selfie: null as File | null,
//     signature: null as File | null,
//     email: '',
//     emailOTP: '',
//   });

//   const handleNext = () => {
//     setCurrentStep((prev) => prev + 1);
//   };

//   const handleBack = () => {
//     setCurrentStep((prev) => prev - 1);
//   };

//   const updateFormData = (data: Partial<typeof formData>) => {
//     setFormData((prev) => ({ ...prev, ...data }));
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <MobileVerification
//             formData={formData}
//             updateFormData={updateFormData}
//             onNext={handleNext}
//           />
//         );
//       case 2:
//         return (
//           <OTPVerification
//             formData={formData}
//             updateFormData={updateFormData}
//             onNext={handleNext}
//             onBack={handleBack}
//           />
//         );
//       case 3:
//         return (
//           <PersonalDetails
//             formData={formData}
//             updateFormData={updateFormData}
//             onNext={handleNext}
//             onBack={handleBack}
//           />
//         );
//       case 4:
//         return (
//           <AadhaarDetails
//             formData={formData}
//             updateFormData={updateFormData}
//             onNext={handleNext}
//             onBack={handleBack}
//           />
//         );
//       case 5:
//         return (
//           <PANDetails
//             formData={formData}
//             updateFormData={updateFormData}
//             onNext={handleNext}
//             onBack={handleBack}
//           />
//         );
//       case 6:
//         return (
//           <BankDetails
//             formData={formData}
//             updateFormData={updateFormData}
//             onNext={handleNext}
//             onBack={handleBack}
//           />
//         );
//       case 7:
//         return (
//           <UploadDocuments
//             formData={formData}
//             updateFormData={updateFormData}
//             onNext={handleNext}
//             onBack={handleBack}
//           />
//         );
//       case 8:
//         return (
//           <EmailVerification
//             formData={formData}
//             updateFormData={updateFormData}
//             onNext={handleNext}
//             onBack={handleBack}
//           />
//         );
//       case 9:
//         return (
//           <EmailOTPVerification
//             formData={formData}
//             updateFormData={updateFormData}
//             onNext={handleNext}
//             onBack={handleBack}
//           />
//         );
//       case 10:
//         return <SuccessPage />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="registration-form">
//       <div className="progress-bar">
//         <div
//           className="progress"
//           style={{ width: `${(currentStep / 10) * 100}%` }}
//         ></div>
//       </div>
//       <div className="step-content">{renderStep()}</div>
//     </div>
//   );
// };

// export default RegistrationForm; 