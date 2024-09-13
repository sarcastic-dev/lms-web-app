"use client";
import Image from "next/image";
import React from "react";
import carouselData from "@/components/Welcome/HomeCaraousel.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const WelcomeCarousel = () => {
  return (
    <>
      <Carousel plugins={[Autoplay()]} className="w-[1350px]">
        <CarouselContent>
          {carouselData.map((data, index) => (
            <CarouselItem key={index}>
              <div className="relative flex items-center justify-around h-[550px] space-x-10">
                <div className="flex flex-col space-y-5 w-1/3">
                  <h1 className="text-4xl text-lmsPrimary font-bold">
                    {data.title}
                  </h1>
                  <p className="text-lg text-lmsSecondary font-medium">
                    {data.content}
                  </p>
                </div>
                <div className="relative h-80 w-[500px]">
                  <Image
                    src={data.image}
                    alt={"dashboardImage"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-sm shadow-2xl"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default WelcomeCarousel;
