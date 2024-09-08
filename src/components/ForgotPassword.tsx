import React, { useState, useEffect } from "react";
import { FormControl, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/newButton";
import { Mail } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { FormType } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { setToken, getToken, deleteToken } from "../lib/tokenService";

interface ForgotPasswordProps {
  setFormType: (type: FormType) => void;
  formData: {
    email: string;
  };
  setFormData: (data: any) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  setFormType,
  formData,
  setFormData,
}) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
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

    if (!isOtpSent) {
      try {
        const response = await axiosInstance.post("/reset-password-otp", {
          email,
        });
        const { token } = response.data;
        setToken(token);
        setIsOtpSent(true);
        setFormData({ ...formData, email });
        toast({
          variant: "default",
          title: "OTP sent successfully.",
        });
      } catch (error: any) {
        console.error("Error requesting OTP:", error);
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
        setFormType("createnewpassword");
      } catch (error: any) {
        console.error("Error verifying OTP:", error);
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

  return (
    <div className="flex flex-col sm:w-[320px] md:w-[380px] lg:w-[466px] space-y-5 bg-white p-8 rounded z-10">
      <form onSubmit={handleSubmit}>
        <h4 className="text-2xl font-bold mb-5">Forgot Your Password ?</h4>
        <FormLabel
          htmlFor="email_or_phone_number"
          className="text-gray-500 text-sm"
        >
          Email
        </FormLabel>
        <FormControl>
          <div className="relative">
            <Input
              id="email_or_phone_number"
              type="text"
              className={`sm:w-[250px] md:w-[320px] lg:w-[402px] mb-2 mt-2 ${
                email && "pl-10"
              }`}
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {email && (
              <Mail
                size={20}
                className="absolute left-2 sm:top-[2px] lg:top-[4px] xl:top-[23px] text-gray-500 ml-1"
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
                  className="mt-2"
                  required
                />
              </div>
            </FormControl>
          </div>
        )}

        <Button
          variant={"lmsActive"}
          type="submit"
          // className="sm:w-[250px] md:w-[320px] lg:w-[402px] mt-3 rounded"
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
  );
};

export default ForgotPassword;
