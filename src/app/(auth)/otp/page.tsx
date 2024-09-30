"use client";
import React, { useState, useEffect } from "react";

import { useToast } from "@/components/ui/use-toast";
import useCookie from "@/hooks/useCookie";
import axiosInstance from "@/lib/axiosInstance";
import { Button } from "@/components/ui/newButton";
import { showToast } from "@/utils/toastHelper";
import { upperFirst } from "lodash";
import { CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/context/store";
import Cookies from "js-cookie";
const Otp: React.FC = () => {
  const [otp, setOTP] = useState(Array(6).fill(""));
  const [resendTimer, setResendTimer] = useState(30);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setToken, deleteToken] = useCookie("token");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const user = useSelector((state: RootState) => state.userInfo);
  const token = Cookies.get("token");
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleOTPChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    const newOTP = [...otp];
    newOTP[index] = value.slice(0, 1);
    setOTP(newOTP);

    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    } else if (!value && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const otpValue = otp.join("");
    try {
      const { data } = await axiosInstance.post("/verify-otp", {
        email: user.formData.userData.email,
        otp: otpValue,
        token,
      });
      deleteToken();
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 2000);
      router.push("/createuser");
    } catch (error: any) {
      setErrorMessage(error.response.data.error);
      setIsSubmitting(false);
      deleteToken();
    }
  };

  const handleResend = async () => {
    try {
      const { data } = await axiosInstance.post("/request-otp", {
        email: user.formData.userData.email,
      });
      setToken({
        value: data.token,
        expirationDate: new Date(
          new Date().getTime() + 24 * 60 * 60 * 1000
        ).toISOString(),
      });
      showToast("success", "New OTP has been sent successfully");
    } catch (erro: any) {
      showToast("error", "Something went wrong");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleOTPSubmit(e)    }
  };

  return (
    <div className="bg-white p-8 rounded sm:w-[320px] md:w-[380px] lg:w-[466px] h-3/6 z-10">
      <h1 className="text-2xl text-start font-bold -mt-2 mb-2">Verify OTP</h1>
      <div className="flex justify-between items-center text-start mt-3 mb-8">
        <p className="text-lmsPrimary text-sm">
          OTP sent to{" "}
          <span>
            {user.formData.userData.email || user.formData.userData.phone}
          </span>
        </p>
        <button
          type="button"
          onClick={() => router.push("/signup")}
          className="text-lmsAccent font-semibold"
        >
          edit
        </button>
      </div>
      <p className="text-lmsPrimary mb-2 text-sm">Enter OTP</p>

      <div className="flex flex-col items-center">
        <div className="flex space-x-4 mb-3 sm:mr-[35px] md:mr-[48px] lg:mr-[80px]">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              className="sm:w-6 sm:h-[6] md:w-8 md:h-8 lg:w-10 lg:h-10 text-center text-lg border focus:border-2 focus:border-lmsAccent outline-none rounded"
              value={digit}
              onChange={(e) => handleOTPChange(e, index)}
              onKeyDown={handleKeyDown}
              maxLength={1}
              autoFocus={index === 0}
              autoComplete="off"
            />
          ))}
        </div>
        <div className="flex justify-between w-full">
          <p className="w-full text-sm">Didn&lsquo;t get the code?</p>
          <button
            type="button"
            className="text-sm font-semibold underline text-[#115DB8] mb-8"
            onClick={handleResend}
          >
            resend
          </button>
        </div>

        <Button
          variant={"lmsActive"}
          type="submit"
          className="sm:w-[255px] md:w-[320px] lg:w-[402px]"
          onClick={handleOTPSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting OTP..." : "Submit OTP"}
        </Button>
        {errorMessage && (
          <div className="bg-red-200 text-lmsError h-10 px-3 w-full mt-5 rounded flex items-center gap-2 text-sm">
            <CircleX size={20} /> {upperFirst(errorMessage)}
          </div>
        )}
      </div>
    </div>
  );
};
export default Otp;
