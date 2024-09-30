"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/newButton";
import WelcomeCarousel from "./WelcomeCarousel";
import WelcomeAbout from "./WelcomeAbout";
import WelcomeUpcoming from "./WelcomeUpcoming";
import { useRouter } from "next/navigation";

const WelcomeHome: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="relative bg-white h-screen" id="mainSection">
        <div className="relative z-10">
          <div
            className={`sticky top-0 flex items-center justify-between px-14 h-16 z-50 transition-all duration-300 ${
              isScrolled ? "bg-white shadow-lg" : "bg-transparent"
            }`}
          >
            {" "}
            <div className="bg-gradient-to-r from-[#4568DC] via-[#C7DAFC] to-white absolute inset-0 z-0 opacity-10"></div>
            <div
              className="flex items-center z-50"
              onClick={() => handleScrollToSection("mainSection")}
            >
              <h3 className="md:text-2xl lg:text-3xl font-bold tracking-wider cursor-pointer">
                <img
                  src="/lmsBuddyLogo.png"
                  alt="Brand Logo"
                  className="w-40"
                />
                {/* LMS<span className="text-lmsAccent">Buddy</span> */}
              </h3>
            </div>
            <div className="flex space-x-10 z-50">
              <div className="flex space-x-5 z-50">
                {/* <Button
                  variant={"link"}
                  className="text-base font-medium text-lmsAccent"
                >
                  Services
                </Button> */}
                <Button
                  variant={"link"}
                  className="md:text-sm lg:text-base font-medium text-lmsAccent p-0"
                  onClick={() => handleScrollToSection("aboutSection")}
                >
                  About
                </Button>
                <Button
                  variant={"link"}
                  className="md:text-sm lg:text-base font-medium text-lmsAccent p-0"
                  onClick={() => handleScrollToSection("upcomingSection")}
                >
                  Upcoming Features
                </Button>
              </div>
              <div className="flex space-x-5 z-50">
                <Button
                  variant={"lmsBorder"}
                  className="md:text-xs lg:text-sm md:p-2 lg:p-4 md:h-8 lg:h-10 bg-transparent"
                  onClick={() => router.push("/login")}
                >
                  Login
                </Button>
                <Button
                  variant={"lms"}
                  className="md:text-sm "
                  onClick={() => router.push("/signup")}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center relative h-screen overflow-hidden z-0">
            {/* <h2 className="text-4xl text-lmsPrimary font-semibold">
              Welcome to{" "}
              <span className="tracking-wider">
                {" "}
                LMS<span className="text-lmsAccent">Buddy</span>
              </span>
            </h2> */}
            <div className="bg-gradient-to-r from-[#4568DC] via-[#86A1EC] to-[#C7DAFC] h-[1000px] w-[1000px] -top-28 left-[1000px] overflow-hidden rounded-full absolute inset-0 z-0 opacity-15"></div>
            <div className="bg-gradient-to-r from-[#4568DC] via-[#C7DAFC] to-white w-screen absolute inset-0 z-0 opacity-10"></div>
            <WelcomeCarousel />
          </div>

          <div
            className="relative bg-white h-screen flex items-center overflow-hidden"
            id="aboutSection"
          >
            <div className="bg-gradient-to-r from-[#4568DC] via-[#86A1EC] to-[#C7DAFC] h-[300px] w-[300px] top-10 left-[550px]  rounded-full absolute inset-0 z-0 opacity-20"></div>
            <div className="bg-gradient-to-r from-[#4568DC] via-[#86A1EC] to-[#C7DAFC] h-[300px] w-[300px] top-96 left-[1100px]  rounded-full absolute inset-0 z-0 opacity-20"></div>
            <div className="bg-gradient-to-r from-[#4568DC] via-[#C7DAFC] to-white w-screen -left-48 -top-24 absolute inset-0 z-0 opacity-10"></div>
            <WelcomeAbout />
          </div>
          <div
            className="relative bg-white h-full pb-20 overflow-hidden"
            id="upcomingSection"
          >
            <div className="bg-gradient-to-r from-[#4568DC] via-[#86A1EC] to-[#C7DAFC] h-[300px] w-[300px] -top-10 left-[600px]  rounded-full absolute inset-0 z-0 opacity-20"></div>
            <div className="bg-gradient-to-r from-[#4568DC] via-[#86A1EC] to-[#C7DAFC] h-[300px] w-[300px] top-72 left-[1100px]  rounded-full absolute inset-0 z-0 opacity-20"></div>
            <div className="bg-gradient-to-r from-[#4568DC] via-[#86A1EC] to-[#C7DAFC] h-[300px] w-[300px] top-96 left-[200px]  rounded-full absolute inset-0 z-0 opacity-20"></div>
            <div className="bg-gradient-to-r from-[#4568DC] via-[#C7DAFC] to-white w-screen -left-48 -top-24 absolute inset-0 z-0 opacity-10"></div>{" "}
            <div className="bg-gradient-to-r from-white via-[#C7DAFC] to-[#4568DC] w-screen -top-24 absolute inset-0 z-0 opacity-5 overflow-hidden"></div>{" "}
            <WelcomeUpcoming />
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeHome;
