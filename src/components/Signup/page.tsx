"use client";
import styles from "./styles.module.css";
import React, { useState, useEffect, useRef } from "react";
import OTPComponent from "../otp/page";
import ProfileCreation from "../createprofile/page";
import SignInForm from "../signin/page";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AuthPage: React.FC = () => {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [showProfileCreation, setShowProfileCreation] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null); // Create a ref for the input field
  const passwordRef = useRef<HTMLInputElement>(null); // Create a ref for the password field
  const router = useRouter();

  const dummyData = [
    "test@example.com",
    "user@example.com",
    "1234567890", // Add dummy phone numbers here
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  const validateInput = (input: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    return emailRegex.test(input) || phoneRegex.test(input);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInput(input.trim())) {
      setErrorMessage("Invalid email or mobile number.");
      return;
    }
    setErrorMessage("");

    // Check if the input matches any dummy data
    if (dummyData.includes(input.trim())) {
      setHasAccount(true);
      setIsButtonDisabled(true); // Disable button until password is filled
      if (inputRef.current) {
        inputRef.current.blur(); // Unfocus the input field
      }
    } else {
      setHasAccount(false);
      setShowOTP(true);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === "") {
      setErrorMessage("Password cannot be empty.");
      return;
    }
    setErrorMessage("");
    router.push("/dashboard"); // Navigate to the dashboard
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setIsButtonDisabled(e.target.value.trim() === "");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsButtonDisabled(e.target.value.trim() === "");
  };

  const handleEdit = () => {
    setShowOTP(false);
  };

  const handleOTPSubmit = () => {
    setShowProfileCreation(true);
  };

  const handleSignInClick = () => {
    setShowSignInModal(true);
  };

  const handleSignInModalClose = () => {
    setShowSignInModal(false);
  };

  return (
    <div className="relative flex-1 flex items-center justify-center border-slate-900 shadow-2xl bg-gray-100 h-screen overflow-hidden">
      <div className="absolute border-8 border-white -top-20 -left-20 w-2/6 h-4/6 bg-blue-500 shadow-2xl rounded-full opacity-60"></div>
      <div className="absolute border-8 border-white -bottom-40 -right-16 w-5/12 h-5/6 bg-blue-500 shadow-2xl rounded-full opacity-60"></div>

      {showProfileCreation ? (
        <ProfileCreation input={input} />
      ) : showOTP ? (
        <OTPComponent
          input={input}
          onEdit={handleEdit}
          onSubmitOTP={handleOTPSubmit}
        />
      ) : (
        <>
          <div className="bg-white border p-8 shadow-xl w-2/6 h-3/6 rounded-lg z-10">
            <Image
              src="/dummyIcon.png"
              alt="companyImage"
              width={200}
              height={200}
              className="ml-28"
            />
            <div className="flex flex-col items-center">
              <form
                onSubmit={hasAccount ? handlePasswordSubmit : handleSubmit}
                className="w-full flex flex-col items-center"
              >
                {hasAccount ? (
                  <div className="relative w-96 mb-4 mt-6">
                    <div
                      className={`absolute left-5 top-4 text-gray-400 font-medium transition-all duration-200 ease-in-out pointer-events-none ${
                        isPasswordFocused || password
                          ? "text-xs -top-2 mt-4"
                          : ""
                      }`}
                    >
                      Password
                    </div>
                    <input
                      type="password"
                      className="w-full p-2 pt-6 pl-5 font-medium focus:border-2 border-2 rounded-xl border-gray-400 mb-2 focus:border-blue-600 outline-none"
                      value={password}
                      onChange={handlePasswordChange}
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                      ref={passwordRef} // Attach the ref to the password field
                    />
                    {errorMessage && (
                      <p className="text-red-500 text-xs">{errorMessage}</p>
                    )}
                  </div>
                ) : (
                  <div className="relative w-96 mb-4 mt-6">
                    <label
                      className={`absolute left-5 top-4 text-gray-400 font-medium transition-all duration-200 ease-in-out ${
                        isFocused || input ? "text-xs -top-1 -mt-1.5" : ""
                      }`}
                    >
                      Email Address or Phone Number
                    </div>
                    <input
                      type="text"
                      className="w-full p-2 pt-6 pl-5 font-medium focus:border-2 border-2 rounded-xl border-gray-400 mb-2 focus:border-blue-600 outline-none"
                      value={input}
                      onChange={handleInputChange}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      ref={inputRef} // Attach the ref to the input field
                    />
                    {errorMessage && (
                      <p className="text-red-500 text-xs">{errorMessage}</p>
                    )}
                  </div>
                )}
                <button
                  type="submit"
                  className={`w-96 py-2 border-2 font-semibold border-blue-500 rounded-xl mb-8 ${
                    isButtonDisabled
                      ? "text-blue-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  disabled={isButtonDisabled}
                >
                  Next
                </button>
              </form>
            </div>
          </div>
        </>
      )}
      {showSignInModal && <SignInForm onClose={handleSignInModalClose} />}
    </div>
  );
};

export default AuthPage;
