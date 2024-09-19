"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation"; // Updated hook
import Image from "next/image";
import Login from "@/components/Login";
import Otp from "@/components/Otp";
import CreateProfile from "@/components/CreateUser";
import CreateInstitute from "@/components/CreateInstitute";
import ForgotPassword from "@/components/ForgotPassword";
import CreateNewPassword from "@/components/CreateNewPassword";
import Carousel from "@/components/Carousel";
import { FormType } from "@/types";
import { FormProvider, useForm } from "react-hook-form";
import { AuthSchema, AuthSchemaType } from "@/schema/createInstitute/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the type for formData (for example)
type FormData = {
  email: string;
  phone: string;
};

const FormPage: React.FC = () => {
  const searchParams = useSearchParams(); // Use this to access the query params
  const form = searchParams.get("form"); // Get the 'form' parameter from the URL

  // State to handle form data (for example, email, phone)
  const [formData, setFormData] = useState<FormData>({
    email: "",
    phone: "",
  });
  const [userId, setUserId] = useState<string | null>(null);

  const methods = useForm<AuthSchemaType>({
		resolver: zodResolver(AuthSchema),
	});

  const [formType, setFormType] = useState<FormType>("login");

  // Function to handle OTP display
  const handleShowOTP = (contact: { email: string; phone: string }) => {
    setFormType("otp");
    setFormData(contact); // Set form data when showing OTP
  };

  // Function to dynamically render the form based on the URL
  const renderForm = () => {
    switch (form) {
      case "login":
        return (
          <Login
            onShowOTP={handleShowOTP} // Pass function to handle OTP
            setFormData={setFormData} // Pass function to update formData
            setFormType={setFormType} // Pass function to update formType
          />
        );
      case "otp":
        return (
          <Otp
            setFormType={setFormType}
            onEdit={() => setFormType("login")}
            formData={formData}
          />
        );
      case "createProfile":
        return (
          <CreateProfile
            setFormType={setFormType}
            formData={formData}
            setUserId={setUserId}
          />
        );
      case "createInstitute":
        return (
          <CreateInstitute userId={formData.email} setFormType={setFormType} />
        );
      case "forgotPassword":
        return (
          <ForgotPassword
            setFormType={setFormType}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "createNewPassword":
        return (
          <CreateNewPassword
            setFormType={setFormType}
            formData={{ email: formData.email }}
          />
        );
      default:
        return (
          <Login
            onShowOTP={handleShowOTP}
            setFormData={setFormData}
            setFormType={setFormType}
          />
        ); // Fallback to login if no form matches
    }
  };

  return (
    <div className="flex justify-between">
      <div className="flex justify-center relative w-1/2">
        <div className="absolute h-full w-full">
          <Image
            src="/MainBG.png"
            alt="Background Image"
            fill
            sizes="(max-width: 640px)"
            priority
          />
        </div>
        <div className="h-screen flex justify-center text-white items-end text-4xl font-bold pb-10 z-50">
          <Carousel formType={formType} />
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <FormProvider {...methods}>{renderForm()} </FormProvider>
      </div>
    </div>
    // <div className="flex justify-between">
    //   <div className="w-1/2 flex justify-center items-center">
    //     {renderForm()}
    //   </div>
    //   <div className="w-1/2 relative">
    //     {/* You can add your static image and carousel here */}
    //     <Image
    //       src="/MainBG.png"
    //       alt="Background Image"
    //       fill
    //       sizes="(max-width: 640px)"
    //       priority
    //     />
    //     {/* You can include your Carousel component if needed */}
    //   </div>
    // </div>
  );
};

export default FormPage;
