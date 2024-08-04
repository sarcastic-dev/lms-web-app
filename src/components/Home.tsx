"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Login from "./Login";
import Otp from "./Otp";
import CreateProfile from "./CreateUser";
import CreateInstitute from "./CreateInstitute";
import Carousel from "./Carousel";
import { FormType } from "@/types";

type FormType = "login" | "otp" | "createProfile" | "createInstitute";

const HomePage: React.FC = () => {
  const [formType, setFormType] = useState<FormType>("login");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });
  const [userId, setUserId] = useState<string | null>(null);


  const handleShowOTP = (contact: { email: string; phone: string }) => {
    setFormType("otp");
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="w-1/2 relative h-screen">
          <div className="h-fit">
            <Image
              src="/mainBG.png"
              alt="Background Image"
              layout="fill"
              sizes="(max-width: 640px)"
              objectFit="cover"
              priority
            />
          </div>
          <div className="relative flex h-screen justify-center text-white items-end text-4xl font-bold pb-10 z-50">
            <Carousel formType={formType} />
          </div>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <div>
            {formType === "login" && (
              <Login
                onShowOTP={handleShowOTP}
                setFormData={setFormData}
                setFormType={setFormType}
              />
            )}
            {formType === "otp" && (
              <Otp
                setFormType={setFormType}
                onEdit={() => setFormType("login")}
                formData={formData}
              />
            )}
            {formType === "createProfile" && (
              <CreateProfile setFormType={setFormType} formData={formData} setUserId={setUserId} />
            )}
            {formType === "createInstitute" && (
              <CreateInstitute userId={userId} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
