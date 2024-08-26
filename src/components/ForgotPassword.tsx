import React, { useState, useEffect } from "react";
import { FormControl, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Mail } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { FormType } from "@/types";
import { useToast } from "@/components/ui/use-toast"; // Assuming you have a toast hook
import { setToken, getToken, deleteToken } from "../lib/tokenService"; // Token management functions

interface ForgotPasswordProps {
  setFormType: (type: FormType) => void;
  formData: { email: string }; // Pass formData as prop
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ setFormType, formData }) => {
  const [email, setEmail] = useState(formData.email || "");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (formData.email) {
      setEmail(formData.email);
    }
  }, [formData.email]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!email) {
      toast({
        variant: "destructive",
        title: "Email is required.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/request-otp", { email });
      const { token } = response.data;
      setToken(token);
      setIsOtpSent(true);
      toast({
        variant: "default",
        title: "OTP sent successfully.",
      });
    } catch (error: any) {
      console.error("Error requesting OTP:", error);
      toast({
        variant: "destructive",
        title: error.response?.data?.message || "Failed to send OTP. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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
      setFormType("createnewpassword"); // Proceed to create new password
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      toast({
        variant: "destructive",
        title: error.response?.data?.message || "Invalid OTP. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post("/request-otp", { email });
      const { token } = response.data;
      setToken(token);
      toast({
        variant: "default",
        title: "OTP resent successfully.",
      });
    } catch (error: any) {
      console.error("Error resending OTP:", error);
      toast({
        variant: "destructive",
        title: error.response?.data?.message || "Failed to resend OTP. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-[366px]">
      {!isOtpSent ? (
        <form onSubmit={handleEmailSubmit}>
          <FormLabel htmlFor="email" className="mb-2 text-gray-700">
            Enter Email
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </FormControl>
          <Button type="submit" className="w-full mt-4 rounded" disabled={isSubmitting}>
            {isSubmitting ? "Sending OTP..." : "Send OTP"}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit}>
          <FormLabel htmlFor="otp" className="mb-2 text-gray-700">
            Enter OTP sent to your email
          </FormLabel>
          <FormControl>
            <Input
              id="otp"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </FormControl>
          <Button type="submit" className="w-full rounded mt-4" disabled={isSubmitting}>
            {isSubmitting ? "Verifying OTP..." : "Verify OTP"}
          </Button>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isSubmitting}
              className="text-blue-500 hover:underline"
            >
              Resend OTP
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
