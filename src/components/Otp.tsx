import React, { useState, useEffect, useRef } from "react";
import ProfileCreation from "@/components/CreateUser";
import { FormType } from "@/types";

interface OTPProps {
  setFormType: (type: FormType) => void;
  onEdit: () => void;
  formData: {
    email: string;
    phone: string;
  };
}

const Otp: React.FC<OTPProps> = ({ formData, onEdit, setFormType }) => {
  const [otp, setOTP] = useState(Array(6).fill(""));
  const [resendTimer, setResendTimer] = useState(30);
  const [submitted, setSubmitted] = useState(false); // State to track if OTP has been submitted
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track if OTP is being submitted

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleOTPChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newOTP = [...otp];
    newOTP[index] = e.target.value.slice(0, 1);
    setOTP(newOTP);

    // Focus next input
    if (e.target.value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true
    const otpValue = otp.join("");
    console.log("OTP submitted:", otpValue);

    // Simulate an async operation (e.g., API call)
    setTimeout(() => {
      setIsSubmitting(false); // Reset submitting state after 2 seconds
      setSubmitted(true); // Set submitted to true to render ProfileCreation component
      setFormType("createProfile"); // Call parent function to handle OTP submission
    }, 2000);
  };

  return (
    <div className="bg-white p-8 rounded sm:w-[320px] md:w-[380px] lg:w-[466px] h-3/6 z-10">
      <h1 className="text-2xl text-start font-bold -mt-2 mb-2">Verify OTP</h1>
      <div className="flex justify-between items-center text-start mt-3 mb-8">
        <p className="text-[#07254A] text-sm">
          OTP sent to <span>{formData.email || formData.phone}</span>
        </p>
        <button onClick={onEdit} className="text-[#115DB8] font-semibold">
          edit
        </button>
      </div>
      <p className="text-[#07254A] mb-2 text-sm">Enter OTP</p>

      <form onSubmit={handleOTPSubmit} className="flex flex-col items-center">
        <div className="flex space-x-4 mb-3 sm:mr-[35px] md:mr-[48px] lg:mr-[px]">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              className="sm:w-6 sm:h-[6] md:w-8 md:h-8 lg:w-10 lg:h-10 text-center text-lg border focus:border-2 focus:border-blue-500 outline-none rounded"
              value={digit}
              onChange={(e) => handleOTPChange(e, index)}
              maxLength={1}
              autoFocus={index === 0}
              autoComplete="off"
            />
          ))}
        </div>
        <div className="flex justify-between w-full">
          <p className="w-full text-sm">Didn&apos;t get the code?</p>
          <button className="text-sm font-semibold underline text-[#115DB8] mb-8">
            resend
          </button>
        </div>

        <button
          type="submit"
          className="sm:w-[255px] md:w-[320px] lg:w-[402px] text-white text-sm font-semibold py-[10px] rounded bg-[#115DB8] hover:bg-[#115DB8] disabled:bg-white disabled:text-[#115DB8] border-2 border-[#115DB8]"
          disabled={otp.some((digit) => digit === "") || isSubmitting}
        >
          {isSubmitting ? "Submitting OTP..." : "Submit OTP"}
        </button>
      </form>
    </div>
  );
};
export default Otp;
