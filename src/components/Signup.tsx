"use client";
import React, { useState, useEffect, useRef } from "react";
import OTPComponent from "../components/Otp";

import Image from "next/image";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { motion } from "framer-motion";
import Loader from "./Loader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthSchema,
  AuthSchemaType,
} from "@/schema/createInstitute/AuthSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import CreateProfile from "./CreateProfile";

const AuthPage: React.FC = () => {
  const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [showProfileCreation, setShowProfileCreation] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  const validateInput = (emailOrPhoneNumber: string): boolean => {
    console.log(emailOrPhoneNumber);
    return (
      emailRegex.test(emailOrPhoneNumber) || phoneRegex.test(emailOrPhoneNumber)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInput(emailOrPhoneNumber.trim())) {
      setErrorMessage("Invalid email or mobile number.");
      return;
    }
    setErrorMessage("");
    setIsSendingOTP(true);

    const userObj =
      emailRegex.test(emailOrPhoneNumber) || phoneRegex.test(emailOrPhoneNumber)
        ? { email: emailOrPhoneNumber }
        : { phone: emailOrPhoneNumber };

    try {
      const { data } = await axiosInstance.post("/users/exists", userObj);

      if (data.exists) {
        setHasAccount(true);
        setShowPasswordInput(true);
        if (inputRef.current) {
          inputRef.current.blur();
        }
      } else {
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
      setIsLoading(true); // Show the loader
      const { data } = await axiosInstance.post("/users/login", {
        ...(emailRegex.test(emailOrPhoneNumber)
          ? { email: emailOrPhoneNumber }
          : { phone: emailOrPhoneNumber }),
        password,
      });

      // Assuming successful login, you might want to store token or user info in state/context
      console.log("Login successful:", data);

      // Show loader for 5 seconds, then redirect to the dashboard
      setTimeout(() => {
        router.push("/dashboard");
        setIsLoading(false); // Hide the loader
      }, 5000);
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Error logging in. Please try again.");
      setIsLoading(false); // Hide the loader on error
    }
  };

  const handleEdit = () => {
    setShowOTP(false);
  };

  const handleOTPSubmit = () => {
    setShowProfileCreation(true);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (showPasswordInput) {
      setIsButtonDisabled(password.trim() === "" || isSendingOTP);
    } else {
      setIsButtonDisabled(emailOrPhoneNumber.trim() === "" || isSendingOTP);
    }
  }, [emailOrPhoneNumber, password, showPasswordInput, isSendingOTP]);

  const form = useForm<AuthSchemaType>({
    resolver: zodResolver(AuthSchema),
  });

  return (
    <div className="relative flex-1 flex items-center justify-center h-screen overflow-hidden">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-blue-500">
          <Loader />
        </div>
      )}
      {!isLoading && (
        <>
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("/NewAppBG2.png")',
              backgroundPosition: "0% 0%",
            }}
            animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
          ></motion.div>

          <motion.div
            className="absolute border-8 border-white -top-20 -left-20 w-96 h-96 bg-blue-500 rounded-full opacity-100"
            animate={{
              scale: [1, 1, 1.5, 1, 1],
              rotate: [0, 270, 270, 270, 0],
              borderRadius: ["40%", "45%", "50%", "45%", "40%"],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          ></motion.div>
          <motion.div
            className="absolute border-8 border-white -bottom-20 -right-20 w-96 h-96 bg-blue-500 rounded-full opacity-100"
            animate={{
              scale: [1, 1, 1.5, 1, 1],
              rotate: [0, 270, 270, 270, 0],
              borderRadius: ["40%", "45%", "50%", "45%", "40%"],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          ></motion.div>

          {showProfileCreation ? (
            <CreateProfile
              input={{
                email: emailRegex.test(emailOrPhoneNumber)
                  ? emailOrPhoneNumber
                  : "",
                phone: phoneRegex.test(emailOrPhoneNumber)
                  ? emailOrPhoneNumber
                  : "",
              }}
            />
          ) : showOTP ? (
            <OTPComponent
              input={emailOrPhoneNumber}
              onEdit={handleEdit}
              onSubmitOTP={handleOTPSubmit}
            />
          ) : (
            <motion.div
              className="bg-white border p-8 shadow-xl w-auto h-auto rounded-lg z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center mb-5">
                <Image
                  src="/dummyIcon.png"
                  alt="companyImage"
                  width={200}
                  height={200}
                  priority
                />
              </div>
              <div className="flex flex-col">
                <Form {...form}>
                  <form
                    onSubmit={
                      showPasswordInput ? handlePasswordSubmit : handleSubmit
                    }
                  >
                    <div>
                      <FormField
                        control={form.control}
                        name="email_or_phone_number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel
                              htmlFor="email_or_phone_number"
                              className="pl-1 text-blue-500 font-semibold"
                            >
                              Email or Phone Number
                            </FormLabel>
                            <FormControl>
                              <div className="relative space-y-3">
                                <Input
                                  id="email_or_phone_number"
                                  type="text"
                                  className="border w-80 border-gray-300 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                                  placeholder="Email or Phone Number"
                                  {...field}
                                  value={emailOrPhoneNumber}
                                  onChange={(e) =>
                                    setEmailOrPhoneNumber(e.target.value)
                                  }
                                  ref={inputRef}
                                />
                                {showPasswordInput && (
                                  <>
                                    <FormLabel
                                      htmlFor="password"
                                      className="pl-1 text-blue-500 font-semibold"
                                    >
                                      Password
                                    </FormLabel>
                                    <Input
                                      id="password"
                                      type="password"
                                      className="border w-80 border-gray-300 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                                      placeholder="Password"
                                      value={password}
                                      onChange={(e) =>
                                        setPassword(e.target.value)
                                      }
                                    />
                                  </>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        className={`w-80 py-2 border-2 mt-5 font-semibold border-blue-500 rounded-xl mb-8 ${
                          isButtonDisabled || isSendingOTP
                            ? "text-blue-500 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                        disabled={isButtonDisabled || isSendingOTP}
                      >
                        {isSendingOTP && !showPasswordInput
                          ? "Sending OTP..."
                          : showPasswordInput
                          ? "Login"
                          : "Next"}
                      </Button>
                      {errorMessage && (
                        <div className="text-red-500 mt-2">{errorMessage}</div>
                      )}
                    </div>
                  </form>
                </Form>
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default AuthPage;
