"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/newButton";
import WelcomeCarousel from "./WelcomeCarousel";
import WelcomeAbout from "./WelcomeAbout";
import WelcomeUpcoming from "./WelcomeUpcoming";
import Link from "next/link";

const WelcomeHome: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
            className={`sticky top-0 flex items-center justify-between sm:px-8 lg:px-14 h-16 z-50 transition-all duration-300 ${
              isScrolled ? "bg-white shadow-lg" : "bg-transparent"
            }`}
          >
            {" "}
            <div className="bg-gradient-to-r from-[#4568DC] via-[#C7DAFC] to-white absolute inset-0 z-0 opacity-10"></div>
            <div
              className="flex items-center z-50"
              onClick={() => handleScrollToSection("mainSection")}
            >
              <div className="flex items-center cursor-pointer">
                <img
                  src="/lmsBuddyLogo.png"
                  alt="Brand Logo"
                  className="sm:w-32 md:w-36 lg:w-40 sm:h-7 md:h-8 lg:h-10"
                />
                {/* LMS<span className="text-lmsAccent">Buddy</span> */}
              </div>
            </div>
            <div className="flex items-center space-x-10 z-50">
              <div className="flex space-x-5 z-50">
                {/* <Button
                  variant={"link"}
                  className="text-base font-medium text-lmsAccent"
                >
                  Services
                </Button> */}
                <Button
                  variant={"link"}
                  className="sm:text-xs md:text-sm lg:text-base font-medium text-lmsAccent p-0"
                  onClick={() => handleScrollToSection("aboutSection")}
                >
                  About
                </Button>
                <Button
                  variant={"link"}
                  className="sm:text-xs md:text-sm lg:text-base font-medium text-lmsAccent p-0"
                  onClick={() => handleScrollToSection("upcomingSection")}
                >
                  Upcoming Features
                </Button>
              </div>
              <div className="flex space-x-5 z-50">
                <Link href={"/login"}>
                  <Button
                    variant={"lmsBorder"}
                    className="sm:text-xs lg:text-sm sm:p-2 lg:p-4 sm:h-7 lg:h-10 bg-transparent hover:text-white hover:bg-lmsAccent"
                  >
                    Login
                  </Button>
                </Link>
                <Link href={"/signup"}>
                  <Button
                    variant={"lms"}
                    className="sm:text-xs lg:text-sm sm:h-7 lg:h-10 sm:p-3 lg:p-4 hover:text-lmsAccent hover:bg-white hover:border-2 hover:border-lmsAccent"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center relative h-screen overflow-hidden z-0">
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
