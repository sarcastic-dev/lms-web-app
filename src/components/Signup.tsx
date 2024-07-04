"use client";
import React, { useState, useEffect, useRef } from "react";
import OTPComponent from "../components/Otp";
import ProfileCreation from "@/components/CreateProfile";
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
} from "@/authFormSchema/AuthSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState("");
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
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  const validateInput = (email: string): boolean => {
    return emailRegex.test(email) || phoneRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInput(email.trim())) {
      setErrorMessage("Invalid email or mobile number.");
      return;
    }
    setErrorMessage("");
    setIsSendingOTP(true);

    const userObj =
      emailRegex.test(email) || phoneRegex.test(email)
        ? { email: email }
        : { phone: email };

    try {
      const { data } = await axiosInstance.post("/users/exists", userObj);

      if (data.exists) {
        setHasAccount(true);
        setShowPasswordInput(true);
        setIsButtonDisabled(password.trim() === "");
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
        ...(emailRegex.test(email) ? { email: email } : { phone: email }),
        password,
      });

      // Assuming successful login, you might want to store token or user info in state/context
      console.log("Login successful:", data);

      // Show loader for 5 seconds, then redirect to the dashboard
      setTimeout(() => {
        setIsLoading(true);
        router.push("/dashboard");
      }, 5000);
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Error logging in. Please try again.");
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
      setIsButtonDisabled(email.trim() === "" || isSendingOTP);
    }
  }, [email, password, showPasswordInput, isSendingOTP]);

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
            <ProfileCreation input={email} />
          ) : showOTP ? (
            <OTPComponent
              input={email}
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
              <Image
                src="/dummyIcon.png"
                alt="companyImage"
                width={200}
                height={200}
                className="ml-24"
                priority
              />
              <div className="flex flex-col items-center">
                <Form {...form}>
                  <form>
                    <div>
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel
                              htmlFor="student_mobile_number"
                              className="pl-1 text-blue-500 font-semibold"
                            >
                              Email or Phone Number{" "}
                              {/* <span className="text-red-500">*</span> */}
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  id="student_mobile_number"
                                  type="tel"
                                  className="border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 pl-10 placeholder:text-gray-400"
                                  placeholder="Mobile Number"
                                  {...field}
                                />
                                <span className="absolute left-3 top-[15px] flex items-center space-x-2 text-gray-500">
                                  <span>+91-</span>
                                </span>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
