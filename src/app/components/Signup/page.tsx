"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import OTPComponent from '../otp/page';
import ProfileSelect from '../profileselect/page';

const AuthPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Button disabled by default
  const [showOTP, setShowOTP] = useState(false); // State to control OTP form visibility
  const [showProfileSelect, setShowProfileSelect] = useState(false); // State to control Profile Selection visibility
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsClient(true); // Ensure the component is mounted and running on the client side
  }, []);

  const validateInput = (input: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    return emailRegex.test(input) || phoneRegex.test(input);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInput(input.trim())) {
      setErrorMessage('Invalid email or mobile number.');
      return;
    }
    setErrorMessage('');
    setShowOTP(true); // Show OTP form
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    // Enable button when input has content
    setIsButtonDisabled(e.target.value.trim() === '');
  };

  const handleEdit = () => {
    setShowOTP(false);
  };

  const handleOTPSubmit = () => {
    setShowProfileSelect(true); // Show Profile Selection form
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className='absolute w-full h-20 bg-white top-0 flex justify-between items-center shadow-md px-4'>
        <div className="flex items-center space-x-2">
          <Image src='/Logo.png' alt='logo' width={80} height={80} priority />
          <p className='text-3xl text-blue-400 font-bold underline cursor-pointer'>
            MySchoolBuddy
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-md shadow-md w-5/12 h-5/6 mt-20">
      {showProfileSelect ? (
          <ProfileSelect />
        ) : showOTP ? (
          <OTPComponent input={input} onEdit={handleEdit} onSubmitOTP={handleOTPSubmit} />
        ) : (
          <>
           <h1 className="text-2xl text-center font-bold mb-6">Login / Signup</h1>
           <div className="flex flex-col items-center">
            <p className="text-slate-500 mb-2 text-sm font-medium mr-56">Email or Mobile number</p>
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
              <input
                type="text"
                className="w-96 p-4 border border-gray-300 rounded-xl bg-slate-100 mb-4"
                placeholder="Email or Mobile Number"
                value={input}
                onChange={handleInputChange}
              />
              {errorMessage && <p className="text-red-500 text-xs mb-4">{errorMessage}</p>}
              <button
                type="submit"
                className={`w-96 text-white p-2 rounded-xl mt-10 ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                disabled={isButtonDisabled}
              >
                Next
              </button>
              <div className='flex mt-4'>
                <p className='text-xs text-slate-400 font-medium'>By Continuing, you agree to our <span className='underline text-slate-500 font-medium'>Terms of Service</span> and <span className='underline text-slate-500 font-medium'>Privacy Policy</span></p>
              </div>
            </form>
           </div>
          </>
        )}
      </div>
    </div>
  );
};




export default AuthPage;
