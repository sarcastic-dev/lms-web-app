"use client"
import Carousel from "@/components/Carousel";
import { FormType } from "@/types";
import Image from "next/image";
import React, { ReactNode, useState } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {

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
          <Carousel />
        </div>
      </div>
      <div className="flex items-center justify-center w-1/2">{children}</div>
    </div>
  );
};

export default AuthLayout;
