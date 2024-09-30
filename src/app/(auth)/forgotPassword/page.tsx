"use client";
import React, { useState, useEffect } from "react";
import { FormControl, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/newButton";
import { Mail } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { FormType } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { setToken, getToken, deleteToken } from "@/lib/tokenService";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "@/context/store";
import { useRouter } from "next/navigation";

const ForgotPassword: React.FC = () => {
  const user = useSelector((state: RootState) => state.userInfo);
  const [email, setEmail] = useState(user.formData.userData.email);
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const methods = useForm();
  const { handleSubmit } = methods; // Destructure form methods

  useEffect(() => {
    if (user.formData.userData.email) {
      setEmail(user.formData.userData.email);
    } else {
    }
  }, [user]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);

    if (!email) {
      toast({
        variant: "destructive",
        title: "Email is required.",
      });
      setIsSubmitting(false);
      return;
    }

    if (!isOtpSent) {
      try {
        const response = await axiosInstance.post("/reset-password-otp", {
          email,
        });
        const { token } = response.data;
        setToken(token);
        setIsOtpSent(true);
        toast({
          variant: "default",
          title: "OTP sent successfully.",
        });
      } catch (error: any) {
        toast({
          variant: "destructive",
          title:
            error.response?.data?.message ||
            "Failed to send OTP. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      if (!otp) {
        toast({
          variant: "destructive",
          title: "OTP is required.",
        });
        setIsSubmitting(false);
        return;
      }

      const token = getToken();

      if (!token) {
        toast({
          variant: "destructive",
          title: "OTP token is missing. Please request a new OTP.",
        });
        setIsSubmitting(false);
        return;
      }

      try {
        await axiosInstance.post("/verify-otp", { email, otp, token });
        deleteToken();
        toast({
          variant: "default",
          title: "OTP verified successfully.",
        });
        router.push("/createNewPassword");
      } catch (error: any) {
        toast({
          variant: "destructive",
          title:
            error.response?.data?.message || "Invalid OTP. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col sm:w-[320px] md:w-[380px] lg:w-[466px] space-y-5 bg-white p-8 rounded z-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4 className="text-2xl font-bold mb-5">Forgot Your Password ?</h4>
          <FormLabel htmlFor="email" className="text-gray-500 text-sm">
            Email
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                id="email"
                type="text"
                className={`sm:w-[250px] md:w-[320px] lg:w-[402px] mb-2 mt-2 xl:h-10 xl:py-0 placeholder:text-xs ${
                  email && "pl-10"
                }`}
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown} // Add this line
              />
              {email && (
                <Mail
                  size={20}
                  className="absolute left-2 sm:top-[19px] text-gray-500 ml-1"
                />
              )}
            </div>
          </FormControl>

          {isOtpSent && (
            <div className="mt-3">
              <FormLabel htmlFor="otp" className={`mb-2 text-gray-700`}>
                Enter OTP sent to your email
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="mt-2 xl:h-10 xl:py-0 placeholder:text-xs"
                    required
                  />
                </div>
              </FormControl>
            </div>
          )}

          <Button
            variant={"lmsActive"}
            type="submit"
            size={"lms"}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? isOtpSent
                ? "Verifying OTP..."
                : "Sending OTP..."
              : isOtpSent
              ? "Verify OTP"
              : "Send OTP"}
          </Button>
        </form>
      </div>
    </FormProvider>
  );
};

export default ForgotPassword;
