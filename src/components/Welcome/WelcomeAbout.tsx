import React from "react";

const WelcomeAbout = () => {
  return (
    <div>
      <div className="relative flex flex-col items-center z-10">
        <h2 className="text-4xl text-lmsPrimary font-semibold mb-5">
          About Us
        </h2>

        <p className="text-center lg:text-base xl:text-lg px-48 mt-5 tracking-wide font-medium">
          At LMSBuddy, we revolutionize the educational experience for teachers,
          students, administrators, and institutes as a whole. Our all-in-one
          Learning Management System offers an intuitive and powerful suite of
          features tailored to streamline every aspect of academic management.
          From lesson planning and assignment tracking to grade management and
          performance analysis, LMSBuddy simplifies complex tasks for teachers,
          allowing them to focus more on instruction and less on administration.
        </p>
      </div>
    </div>
  );
};

export default WelcomeAbout;
