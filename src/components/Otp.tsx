import React, { useState, useEffect, useRef } from 'react';
import ProfileCreation from '@/components/CreateProfile';

interface OTPComponentProps {
  input: string;
  onEdit: () => void; // Function to handle editing
  onSubmitOTP: () => void; // Function to handle OTP submit
}

const Otp:React.FC<OTPComponentProps> = ({ input, onEdit, onSubmitOTP}) => {
  const [otp, setOTP] = useState(Array(6).fill(''));
  const [resendTimer, setResendTimer] = useState(30);
  const [submitted, setSubmitted] = useState(false); // State to track if OTP has been submitted
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track if OTP is being submitted

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
    setIsSubmitting(true); // Set submitting state to true
    const otpValue = otp.join('');
    console.log('OTP submitted:', otpValue);

    // Simulate an async operation (e.g., API call)
    setTimeout(() => {
      setIsSubmitting(false); // Reset submitting state after 2 seconds
      setSubmitted(true); // Set submitted to true to render ProfileCreation component
      onSubmitOTP(); // Call parent function to handle OTP submission
    }, 2000);
  };

  // Render ProfileSelect component if submitted is true
  if (submitted) {
    return <ProfileCreation input={input} />;
  }

  return (
      <div className="bg-white border p-8 rounded-lg shadow-xl w-2/6 h-3/6 z-10">
      <h1 className="text-2xl text-center text-blue-500 font-bold -mt-2 mb-2">Verify with OTP</h1>
      <div className='ml-10'>
       <p className="text-gray-500 mt-5 mb-2 text-sm">OTP <span className='text-xs'>sent to</span></p>
        <div className="flex items-center justify-between mb-4 w-full">
          <p className='text-gray-600 font-medium'>{input}</p>
          <button onClick={onEdit} className="text-blue-400 font-semibold mr-9">Edit</button>
        </div>
       <p className='text-gray-500 mb-2 text-sm'>Enter OTP</p>
        
      </div>
      <form onSubmit={handleOTPSubmit} className="flex flex-col items-center">
        <div className="flex space-x-2 mb-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              className="w-14 h-14 text-center text-lg border-2 focus:border-2 focus:border-blue-500 outline-none rounded-xl"
              value={digit}
              onChange={(e) => handleOTPChange(e, index)}
              maxLength={1}
              autoFocus={index === 0}
              autoComplete="off"
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 mb-8 ml-60">
          Resend OTP in 0:{resendTimer < 10 ? `0${resendTimer}` : resendTimer}
        </p>
        <button
          type="submit"
          className="w-96 text-white font-semibold py-2 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:bg-white disabled:text-blue-500 border-2 border-blue-400"
          disabled={otp.some((digit) => digit === '') || isSubmitting}
        >
          {isSubmitting ? 'Submitting OTP...' : 'Submit OTP'}
        </button>
      </form>
      </div>
  );
};
  export default Otp;