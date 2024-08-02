"use client";
import React, { useState, useEffect, useRef } from "react";
import OTPComponent from "./Otp";

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
import CreateProfile from "./CreateUser";

interface LoginProps {
  onShowOTP: (contact: { email: string; phone: string }) => void;
  setFormType: (type: string) => void;
  setFormData: (data: any) => void;
}

const Login: React.FC<LoginProps> = ({
  onShowOTP,
  setFormType,
  setFormData,
}) => {
  const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isClient, setIsClient] = useState(false);
  // const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [showProfileCreation, setShowProfileCreation] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
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
    setFormData({
      email: emailRegex.test(emailOrPhoneNumber) ? emailOrPhoneNumber : "",
      phone: emailRegex.test(emailOrPhoneNumber) ? "" : emailOrPhoneNumber,
    });

    const userObj = emailRegex.test(emailOrPhoneNumber)
      ? { email: emailOrPhoneNumber, phone: "" }
      : { email: "", phone: emailOrPhoneNumber };

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
        // setShowOTP(true);
        setFormType("otp");
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
      // setIsLoading(true); // Show the loader
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
        // setIsLoading(false); // Hide the loader
      }, 5000);
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Error logging in. Please try again.");
      // setIsLoading(false); // Hide the loader on error
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
      // setIsButtonDisabled(password.trim() === "" || isSendingOTP);
    } else {
      // setIsButtonDisabled(emailOrPhoneNumber.trim() === "" || isSendingOTP);
    }
  }, [emailOrPhoneNumber, password, showPasswordInput, isSendingOTP]);

  const form = useForm<AuthSchemaType>({
    resolver: zodResolver(AuthSchema),
  });
  

  return (
    <div>
      <div className="flex flex-col sm:w-[320px] md:w-[380px] lg:w-[466px] bg-white p-8 rounded z-10">
        <Form {...form}>
          <form
            onSubmit={showPasswordInput ? handlePasswordSubmit : handleSubmit}
          >
            <div>
              <h4 className="text-2xl font-bold mb-5">Get Start New</h4>
              <FormField
                control={form.control}
                name="email_or_phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="email_or_phone_number"
                      className="pl-1 text-gray-500 text-sm"
                    >
                      Email or Phone Number
                    </FormLabel>
                    <FormControl>
                      <div className="relative space-y-2">
                        <Input
                          id="email_or_phone_number"
                          type="text"
                          className="border rounded sm:w-[250px] md:w-[320px] lg:w-[402px] border-gray-300 py-4 text-xs mb-2 tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                          placeholder="Enter Email or Phone Number"
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
                              className="pl-1 text-gray-500 text-sm"
                            >
                              Password
                            </FormLabel>
                            <Input
                              id="password"
                              type="password"
                              className="border rounded sm:w-[250px] md:w-[320px] lg:w-[402px] border-gray-300 py-4 text-xs tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
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
                className={`bg-[#115DB8] sm:w-[250px] md:w-[320px] lg:w-[402px] py-2 border-2 mt-5 font-semibold border-[#115DB8] rounded mb-8`}
              >
                {isSendingOTP && !showPasswordInput
                  ? "Sending OTP..."
                  : showPasswordInput
                  ? "Login"
                  : "Submit"}
              </Button>
              {errorMessage && (
                <div className="text-red-500 mt-2">{errorMessage}</div>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
