"use client";
import React, { useState, useEffect, useRef } from "react";
import OTPComponent from "../components/Otp";
import ProfileCreation from "../components/createProfile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

axios.defaults.baseURL = "http://16.170.155.154:3300/api";

const AuthPage: React.FC = () => {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [showProfileCreation, setShowProfileCreation] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (showPasswordInput) {
      setIsButtonDisabled(password.trim() === "" || isSendingOTP);
    } else {
      setIsButtonDisabled(input.trim() === "" || isSendingOTP);
    }
  }, [input, password, showPasswordInput, isSendingOTP]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  const validateInput = (input: string): boolean => {
    return emailRegex.test(input) || phoneRegex.test(input);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInput(input.trim())) {
      setErrorMessage("Invalid email or mobile number.");
      return;
    }
    setErrorMessage("");
    setIsSendingOTP(true);

    const userObj = emailRegex.test(input) || phoneRegex.test(input) ? { email: input } : { phone: input };

    try {
      const { data } = await axios.post("/users/exists", userObj);

      console.log("Server response:", data); // Debugging log

      if (data.exists) {
        console.log("User exists, showing password input.");
        setHasAccount(true);
        setShowPasswordInput(true);
        setIsButtonDisabled(password.trim() === "");
        if (inputRef.current) {
          inputRef.current.blur();
        }
      } else {
        console.log("User does not exist, showing OTP input.");
        setHasAccount(false);
        setShowOTP(true);
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
      setErrorMessage("Error checking user existence.");
    } finally {
      setIsSendingOTP(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === "") {
      setErrorMessage("Password cannot be empty.");
      return;
    }
    setErrorMessage("");

    try {
      const { data } = await axios.post("/users/login", {
        ...(emailRegex.test(input) ? { email: input } : { phone: input }),
        password,
      });

      // Assuming successful login, you might want to store token or user info in state/context
      console.log("Login successful:", data);

      // Navigate to the loader or dashboard upon successful login
      router.push("/loader");
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Error logging in. Please try again.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEdit = () => {
    setShowOTP(false);
  };

  const handleOTPSubmit = () => {
    setShowProfileCreation(true);
  };

  return (
    <div className="relative flex-1 flex items-center justify-center bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400 h-screen overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="absolute top-16 right-80 w-48 h-48 bg-blue-300 rounded-full opacity-40 animate-ping"></div>
        <div className="absolute bottom-16 left-80 w-48 h-48 bg-blue-300 rounded-full opacity-40 animate-ping"></div>
      </div>
      <div className="absolute border-8 border-white -top-20 -left-20 w-2/6 h-4/6 bg-blue-500 shadow-2xl rounded-full opacity-60"></div>
      <div className="absolute border-8 border-white -bottom-40 -right-16 w-5/12 h-5/6 bg-blue-500 shadow-2xl rounded-full opacity-60"></div>
      
      {showProfileCreation ? (
        <ProfileCreation input={input} />
      ) : showOTP ? (
        <OTPComponent input={input} onEdit={handleEdit} onSubmitOTP={handleOTPSubmit} />
      ) : (
        <div className="bg-white border p-8 shadow-xl w-auto h-auto rounded-lg z-10">
          <Image
            src="/dummyIcon.png"
            alt="companyImage"
            width={200}
            height={200}
            className="ml-28"
            priority
          />
          <div className="flex flex-col items-center">
            <form onSubmit={showPasswordInput ? handlePasswordSubmit : handleSubmit} className="w-full flex flex-col items-center">
              <div className="relative w-96 mb-4 mt-6">
                <div className={`absolute left-5 top-4 text-gray-400 font-medium transition-all duration-200 ease-in-out pointer-events-none ${isFocused || input ? "text-xs -top-5 mt-7" : ""}`}>
                  Email Address or Phone Number
                </div>
                <input
                  type="text"
                  className="w-full p-2 pt-6 pl-5 font-medium focus:border-2 border-2 rounded-xl border-gray-400 mb-2 focus:border-blue-600 outline-none"
                  value={input}
                  onChange={handleInputChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  ref={inputRef}
                />
                {errorMessage && (
                  <p className="text-red-500 text-xs ml-2">{errorMessage}</p>
                )}
              </div>
              {showPasswordInput && (
                <div className="relative w-96 mb-4">
                  <div className={`absolute left-5 top-4 text-gray-400 font-medium transition-all duration-200 ease-in-out pointer-events-none ${isPasswordFocused || password ? "text-xs -top-5 mt-7" : ""}`}>
                    Password
                  </div>
                  <input
                    type="password"
                    className="w-full p-2 pt-6 pl-5 font-medium focus:border-2 border-2 rounded-xl border-gray-400 mb-2 focus:border-blue-600 outline-none"
                    value={password}
                    onChange={handlePasswordChange}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    ref={passwordRef}
                  />
                  {errorMessage && (
                    <p className="text-red-500 text-xs ml-2">{errorMessage}</p>
                  )}
                </div>
              )}
              <button
                type="submit"
                className={`w-96 py-2 border-2 font-semibold border-blue-500 rounded-xl mb-8 ${isButtonDisabled || isSendingOTP ? "text-blue-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                disabled={isButtonDisabled || isSendingOTP}
              >
                {isSendingOTP && !showPasswordInput ? "Sending OTP..." : "Next"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
