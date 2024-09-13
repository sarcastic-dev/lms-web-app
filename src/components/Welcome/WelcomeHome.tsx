"use client";
import React from "react";
import { Button } from "../ui/newButton";
import Image from "next/image";
import WelcomeCarousel from "./WelcomeCarousel";
import WelcomeAbout from "./WelcomeAbout";
import WelcomeUpcoming from "./WelcomeUpcoming";

interface WelcomeHomeProps {
  onNavigateToHome: () => void;
}

const WelcomeHome: React.FC<WelcomeHomeProps> = ({ onNavigateToHome }) => {
  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <div className="relative bg-[#F3F5F7] h-screen" id="mainSection">
        <div className="absolute inset-0">
          <Image
            src="/welcomeBGNew.png"
            alt="Background Image"
            fill
            sizes="(max-width: 640px)"
            className="absolute inset-0 z-0 ob"
            priority
          />
        </div>
        <div className="bg-[#F3F5F7] h-screen absolute inset-0 z-0 opacity-80"></div>
        <div className="relative z-10">
          <div className="bg-white sticky top-0 flex items-center justify-between px-16 w-full h-20 shadow-md z-50">
            <div className="flex items-center space-x-16">
              <h3 className="text-3xl font-bold tracking-wider cursor-pointer" onClick={() => handleScrollToSection("mainSection")}>
                LMS<span className="text-lmsAccent">Buddy</span>
              </h3>
              <div className="flex space-x-5">
                {/* <Button
                  variant={"link"}
                  className="text-base font-medium text-lmsAccent"
                >
                  Services
                </Button> */}
                <Button
                  variant={"link"}
                  className="text-base font-medium text-lmsAccent p-0"
                  onClick={() => handleScrollToSection("aboutSection")}
                >
                  About
                </Button>
                <Button
                  variant={"link"}
                  className="text-base font-medium text-lmsAccent p-0"
                  onClick={() => handleScrollToSection("upcomingSection")}
                >
                  Upcoming Features
                </Button>
              </div>
            </div>
            <div className="flex space-x-5">
              <Button variant={"lmsBorder"} onClick={onNavigateToHome}>
                Login
              </Button>
              <Button variant={"lms"} onClick={onNavigateToHome}>
                Get Started
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-center relative z-10 mt-10">
            {/* <h2 className="text-4xl text-lmsPrimary font-semibold">
              Welcome to{" "}
              <span className="tracking-wider">
                {" "}
                LMS<span className="text-lmsAccent">Buddy</span>
              </span>
            </h2> */}
            <WelcomeCarousel />
          </div>

          <div className="relative bg-[#F3F5F7] h-screen pb-5" id="aboutSection">
            <div className="absolute inset-0">
              <Image
                src="/welcomeBG2.png"
                alt="Background Image"
                fill
                sizes="(max-width: 640px)"
                className="absolute inset-0 z-0"
                priority
              />
            </div>
            <div className="bg-[#F3F5F7] h-screen absolute inset-0 z-0 opacity-80"></div>
            <WelcomeAbout />
          </div>
          <div className="relative bg-[#F3F5F7] h-full pb-20" id="upcomingSection">
            <div className="absolute h-full inset-0">
              <Image
                src="/welcomeBG3.png"
                alt="Background Image"
                fill
                sizes="(max-width: 640px)"
                className="absolute inset-0 z-0"
                priority
              />
            </div>
            <div className="bg-[#F3F5F7] h-full absolute inset-0 z-0 opacity-80"></div>
            <WelcomeUpcoming />
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeHome;
