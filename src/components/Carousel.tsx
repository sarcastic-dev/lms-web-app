import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { FormType } from "@/types";

interface CarouselProps {
  formType: FormType;
}

const Carousel: React.FC<CarouselProps> = ({ formType }) => {
  // Map formType to active index
  const formTypeToIndex: { [key in FormType]: number } = {
    login: 0,
    otp: 1,
    createProfile: 2,
    createInstitute: 3,
  };

  // Determine active index based on formType
  const activeIndex = formTypeToIndex[formType];

  return (
    <div>
      {formType === "login" && (
        <span className="text-center space-y-3">
          <h1>Welcome!</h1>
          <p className="text-lg opacity-60">Get started with signup/login.</p>
        </span>
      )}
      {formType === "otp" && (
        <span className="text-center space-y-3">
          <h1>Verify!</h1>
          <p className="text-lg opacity-60">Verify your Email/Phone.</p>
        </span>
      )}
      {formType === "createProfile" && (
        <span className="text-center space-y-3">
          <h1>Create Account!</h1>
          <p className="text-lg opacity-60">Create your user acoount.</p>
        </span>
      )}
      {formType === "createInstitute" && (
        <span className="text-center space-y-3">
          <h1>Create Institute!</h1>
          <p className="text-lg opacity-60">Create your own institute.</p>
        </span>
      )}
      <span>
        <Pagination>
          <PaginationContent className="space-x-3">
            {["login", "otp", "createProfile", "createInstitute"].map(
              (type, index) => (
                <PaginationItem key={type} className="mt-5 flex items-center">
                  <PaginationLink
                    href="#"
                    className={`rounded-full ${
                      index === activeIndex
                        ? "h-4 w-4 bg-[#115DB8]"
                        : "h-2 w-2 bg-white"
                    }`}
                  />
                </PaginationItem>
              )
            )}
          </PaginationContent>
        </Pagination>
      </span>
    </div>
  );
};

export default Carousel;
