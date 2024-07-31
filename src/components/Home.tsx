"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Login from "./Login";
import Otp from "./Otp";
import CreateProfile from "./CreateUser";
import CreateInstitute from "./CreateInstitute";

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Import Swiper types
import { Swiper as SwiperClass } from "swiper/types";

const HomePage: React.FC = () => {
  const [formType, setFormType] = useState("login");
  const [userContact, setUserContact] = useState({ email: "", phone: "" });

  // Swiper reference
  const swiperRef = useRef<SwiperClass | null>(null);

  // Function to programmatically slide to the desired index
  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      try {
        swiperRef.current.slideTo(index, 0);
      } catch (error) {
        console.error("Error navigating to slide:", error);
      }
    }
  };

  // Use useEffect to change the slide when formType changes
  useEffect(() => {
    switch (formType) {
      case "login":
        goToSlide(0);
        break;
      case "otp":
        goToSlide(1);
        break;
      case "createProfile":
        goToSlide(2);
        break;
      case "createInstitute":
        goToSlide(3);
        break;
      default:
        goToSlide(0);
    }
  }, [formType]);

  const handleShowOTP = (contact: { email: string; phone: string }) => {
    setUserContact(contact);
    setFormType("otp");
  };

  return (
    <>
      <style>
        {`
          .swiper-pagination-bullet {
            background-color: white !important; /* Default dot color */
          }
          
          .swiper-pagination-bullet-active {
            background-color: white !important; /* Active dot color */
          }
        `}
      </style>
      <div className="flex justify-between">
        <div className="w-1/2 relative">
          <Image
            src="/mainBG.png" // Your static background image path
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            priority
            className="absolute inset-0 z-0"
          />
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => (swiperRef.current = swiper)} // Store Swiper instance in ref
            allowTouchMove={false} // Disable touch movement
            className="h-screen"
            initialSlide={0}
          >
            <SwiperSlide>
              <div className="relative h-full flex items-end justify-center p-8 pb-12">
                <div className="text-white z-10">
                  <h2 className="text-2xl text-center font-normal mb-2">
                    Welcome Back!
                  </h2>
                  <p className="text-base font-light opacity-70">
                    Login to access your account.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative h-full flex items-end justify-center p-8 pb-12">
                <div className="text-white z-10">
                  <h2 className="text-2xl text-center font-normal mb-2">
                    Verify Your Identity
                  </h2>
                  <p className="text-base font-light opacity-70">
                    Enter the OTP sent to your device.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative h-full flex items-end justify-center p-8 pb-12">
                <div className="text-white z-10">
                  <h2 className="text-2xl text-center font-normal mb-2">
                    Create Your Profile
                  </h2>
                  <p className="text-base font-light opacity-70">
                    Let's set up your profile information.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative h-full flex items-end justify-center p-8 pb-12">
                <div className="text-white z-10">
                  <h2 className="text-2xl text-center font-normal mb-2">
                    Create an Institute
                  </h2>
                  <p className="text-base font-light opacity-70">
                    Start managing your own institute.
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <div>
            {formType === "login" && <Login onShowOTP={handleShowOTP} />}
            {formType === "otp" && (
              <Otp
                onShowProfile={() => setFormType("createProfile")}
                onEdit={() => setFormType("login")}
                input={userContact}
              />
            )}
            {formType === "createProfile" && (
              <CreateProfile
                input={userContact}
                onShowInstitute={() => setFormType("createInstitute")}
              />
            )}
            {formType === "createInstitute" && (
              <CreateInstitute userId={null} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
