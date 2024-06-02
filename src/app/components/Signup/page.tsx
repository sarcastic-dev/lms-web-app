"use client"
import styles from './styles.module.css'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import OTPComponent from '../otp/page';
import ProfileSelect from '../profileselect/page';
import ProfileCreation from '../createprofile/page';
import SignInForm from '../signin/page';

const AuthPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Button disabled by default
  const [showOTP, setShowOTP] = useState(false); // State to control OTP form visibility
  const [showProfileCreation, setShowProfileCreation] = useState(false); // State to control Profile Creation form visibility
  const [showProfileSelect, setShowProfileSelect] = useState(false); // State to control Profile Selection visibility
  const [showSignInModal, setShowSignInModal] = useState(false); // State to control the sign-in modal
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
    setShowProfileCreation(true); // Show Profile Creation form
  };

  const handleSignInClick = () => {
    setShowSignInModal(true); // Show the sign-in modal
  };

  const handleSignInModalClose = () => {
    setShowSignInModal(false); // Close the sign-in modal
  };

  return (
    <div className="flex h-screen">
   <div className="relative flex-1 flex items-center justify-center overflow-hidden">
  {/* Background image */}
  <Image
    className="absolute inset-0 w-full h-full object-cover"
    src="/Main2.png"
    alt="Background Image"
    width={200}
    height={200}
    priority
  />

  {/* Blue overlay with transparency */}
  <div className="absolute inset-0 bg-blue-600 opacity-75"></div>
  
  {/* Content */}
  <div className="relative justify-center items-center z-10 text-white p-10">
    <h1 className="text-5xl text-center font-bold mb-16 font-serif">Welcome</h1>
    <p className="text-2xl w-96 text-center font-serif">Track and manage your <span className='font-bold'>Institute</span> in one place!</p>
    <div className="border-t-4 ml-36 border-white w-24 mt-7 max-w-xs"></div>
  </div>
</div>
    <div className="flex-1 flex items-center justify-center bg-white">
      <div className="bg-white border p-8 rounded-lg shadow-xl w-10/12 h-5/6">
        {showProfileCreation ? (
          <ProfileCreation />
        ) : showOTP ? (
          <OTPComponent input={input} onEdit={handleEdit} onSubmitOTP={handleOTPSubmit} />
        ) : (
          <>
            <h1 className="text-3xl text-blue-500 text-start ml-24 mt-4 font-bold mb-6">SignUp</h1>
            <p className="text-start text-gray-500 ml-24 mb-10">Are you looking to manage your Institute</p>
            <div className="flex flex-col items-center">
              <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
                <div className="w-96 mb-4 mt-6">
                  <label className="block text-gray-700 font-semibold mb-2">Email or mobile number</label>
                  <input
                    type="text"
                    className="w-full p-4 border border-gray-300 rounded-xl bg-slate-100 mb-2"
                    placeholder="Enter your email address or phone number"
                    value={input}
                    onChange={handleInputChange}
                  />
                  {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
                </div>
                {/* <div className="w-96 mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Password</label>
                  <input
                    type="password"
                    className="w-full p-4 border border-gray-300 rounded-xl bg-slate-100 mb-2"
                    placeholder="Enter password"
                  />
                  <a href="#" className="text-blue-500 ml-1 font-medium text-xs">Forgot Password?</a>
                </div>
                <div className="w-96 mb-4 flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <label className="text-gray-700">I agree with terms & conditions</label>
                </div> */}
                <button
                  type="submit"
                  className={`w-96 text-white py-2 rounded-xl mb-8 ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                  disabled={isButtonDisabled}
                >
                  Next
                </button>
                
                <div className="w-96 text-center mb-2">
                  <div className="text-gray-500">--------------- Or Sign up with ---------------</div>
                  <div className="flex justify-center mt-4 space-x-4">
                    <button className="bg-white border border-gray-300 p-2 rounded-full">
                      <Image src="/google.png" alt="Google" width={40} height={40} />
                    </button>
                    <button className="bg-white border border-gray-300 p-2 rounded-full">
                      <Image src="/facebook.png" alt="Facebook" width={40} height={40} />
                    </button>
                    <button className="bg-white border border-gray-300 p-2 rounded-full">
                      <Image src="/twitternew.png" alt="Twitter" width={40} height={40} />
                    </button>
                  </div>
                </div>
                <div className='mt-16'>
                  <p>Already have an Account? <button  className='text-blue-500 font-semibold' onClick={handleSignInClick}>Sign In</button></p>
                </div>
                {/* <p className="text-xs text-gray-500">
                  You do not have an account? <a href="#" className="text-blue-500">Create an account</a>
                </p> */}
              </form>
            </div>
          </>
        )}
   </div>

  </div>

  {/* Sign-in modal */}
  {showSignInModal && <SignInForm onClose={handleSignInModalClose} />}
  </div>
  )
}


export default AuthPage;