import React, { useState, useEffect } from 'react';
import ProfileSelect from '../profileselect/page';
import ProfileCreation from '../createprofile/page';

interface OTPComponentProps {
  input: string;
  onEdit: () => void; // Function to handle editing
  onSubmitOTP: () => void; // Function to handle OTP submit
}

const OTPComponent: React.FC<OTPComponentProps> = ({ input, onEdit, onSubmitOTP}) => {
  const [otp, setOTP] = useState(Array(6).fill(''));
  const [resendTimer, setResendTimer] = useState(30);
  const [submitted, setSubmitted] = useState(false); // State to track if OTP has been submitted

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newOTP = [...otp];
    newOTP[index] = e.target.value.slice(0, 1);
    setOTP(newOTP);

    // Focus next input
    if (e.target.value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    console.log('OTP submitted:', otpValue);
    setSubmitted(true); // Set submitted to true to render ProfileSelect component
    onSubmitOTP(); // Call parent function to handle OTP submission
  };

  // Render ProfileSelect component if submitted is true
  if (submitted) {
    return <ProfileCreation />;
  }

  return (
    <div>
      <h1 className="text-2xl text-center font-bold mb-4">Verify with OTP</h1>
      <div className='ml-16'>
       <p className="text-gray-500 mb-2 ml-10 text-sm">OTP <span className='text-xs'>sent to</span></p>
        <div className="flex items-center justify-between mb-4 w-full">
          <p className='text-gray-600 ml-10'>{input}</p>
          <button onClick={onEdit} className="text-blue-400 font-medium mb-4 mr-24">Edit</button>
        </div>
       <p className='text-gray-500 ml-10 mb-2 text-sm'>Enter OTP</p>
        
      </div>
      <form onSubmit={handleOTPSubmit} className="flex flex-col items-center">
        <div className="flex space-x-2 mb-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              className="w-14 h-14 text-center text-lg border border-gray-300 rounded-xl bg-slate-100"
              value={digit}
              onChange={(e) => handleOTPChange(e, index)}
              maxLength={1}
            />
          ))}
        </div>
        <p className="text-gray-500 mb-8 ml-56">
          Resend OTP in 0:{resendTimer < 10 ? `0${resendTimer}` : resendTimer}
        </p>
        <button
          type="submit"
          className="w-96 text-white py-2 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400"
          disabled={otp.some(digit => digit === '')}
        >
          Submit OTP
        </button>
      </form>
    </div>
  );
};
  export default OTPComponent;