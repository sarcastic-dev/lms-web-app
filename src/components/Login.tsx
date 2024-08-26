"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Mail, Lock, Eye, EyeOff } from "lucide-react"; // Importing icons from Lucide
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import useOtpRequest from "../hooks/useOtpRequest";
import useCookie from "../hooks/useCookie";
import axiosInstance from "../lib/axiosInstance";
import {
  AuthSchema,
  AuthSchemaType,
} from "../schema/createInstitute/AuthSchema";
import { FormType } from "@/types";
import ForgotPassword from "./ForgotPassword";

interface LoginProps {
  onShowOTP: (contact: { email: string; phone: string }) => void;
  setFormType: (type: FormType) => void;
  setFormData: (data: any) => void;
}

const Login: React.FC<LoginProps> = ({
  onShowOTP,
  setFormType,
  setFormData,
}) => {
  const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [token, setToken, deleteToken] = useCookie("token");
  const requestOtp = useOtpRequest();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  const validateInput = (emailOrPhoneNumber: string): boolean => {
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
    setIsSendingOTP(false);
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
        setIsSendingOTP(true);
        const { data } = await axiosInstance.post("/request-otp", {
          email: userObj.email,
        });
        setToken({
          value: data.token,
          expirationDate: new Date(
            new Date().getTime() + 24 * 60 * 60 * 1000
          ).toISOString(),
        });
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
      const { data } = await axiosInstance.post("/users/login", {
        ...(emailRegex.test(emailOrPhoneNumber)
          ? { email: emailOrPhoneNumber }
          : { phone: emailOrPhoneNumber }),
        password,
      });
      const { accessToken, refreshToken } = data;

      setCookie("accessToken", accessToken, 1);
      setCookie("refreshToken", refreshToken, 7);

      router.push("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Error logging in. Please try again.");
    }
  };

  const handleForgotPasswordClick = () => {
    setIsForgotPassword(true);
    setFormType("forgotpassword"); // Set form type to forgot password
  };

  const form = useForm<AuthSchemaType>({
    resolver: zodResolver(AuthSchema),
  });

  const setCookie = (name: string, value: string, days: number) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };

  return (
    <div>
      {!isForgotPassword ? (
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
                        Email
                      </FormLabel>
                      <FormControl>
                        <div className="relative space-y-2">
                          <Input
                            id="email_or_phone_number"
                            type="text"
                            className="sm:w-[250px] md:w-[320px] lg:w-[402px] pl-10"
                            placeholder="Enter Email"
                            {...field}
                            value={emailOrPhoneNumber}
                            onChange={(e) =>
                              setEmailOrPhoneNumber(e.target.value)
                            }
                            ref={inputRef}
                          />

                          {emailOrPhoneNumber && (
                            <Mail className="absolute left-2 sm:top-[2px] lg:top-[4px] xl:top-[8px] w-5 h-5 text-gray-500" />
                          )}
                          {showPasswordInput && (
                            <>
                              <FormLabel
                                htmlFor="password"
                                className="pl-1 text-gray-500 text-sm"
                              >
                                Password
                              </FormLabel>
                              <div className="relative">
                                <Input
                                  id="password"
                                  type={passwordVisible ? "text" : "password"}
                                  className="sm:w-[250px] md:w-[320px] lg:w-[402px] pl-10 pr-10"
                                  placeholder="Password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                />

                                {password && (
                                  <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                )}
                                <div
                                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                  onClick={() =>
                                    setPasswordVisible(!passwordVisible)
                                  }
                                >
                                  {passwordVisible ? (
                                    <EyeOff className="w-5 h-5 text-gray-500" />
                                  ) : (
                                    <Eye className="w-5 h-5 text-gray-500" />
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={handleForgotPasswordClick}
                                className="bg-transparent tracking-wide text-sm font-medium text-[#115DB8] p-0"
                              >
                                Forgot Password?
                              </button>
                            </>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  variant={"lmsActive"}
                  className={`sm:w-[250px] md:w-[320px] lg:w-[402px] mt-5 mb-8`}
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
      ) : (
        // Show ForgotPassword component when forgot password is triggered
        <ForgotPassword setFormType={setFormType} formData={{
            email: ""
          }} />
      )}
    </div>
  );
};

export default Login;
