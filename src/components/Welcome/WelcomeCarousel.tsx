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
      <Carousel
        plugins={[Autoplay()]}
        className="sm:w-[500px] md:w-[650px] lg:w-[850px] xl:w-[1120px] 2xl:w-[1350px] sm:mt-28 lg:mt-20"
      >
        <CarouselContent>
          {carouselData.map((data, index) => (
            <CarouselItem key={index}>
              <div className="relative flex sm:flex-col lg:flex-row items-center justify-around h-[550px] space-y-10 lg:space-x-10">
                <div className="flex flex-col sm:text-center lg:text-start space-y-5 md:w-[500px] lg:w-[300px] xl:w-[400px]">
                  <h1 className="sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-lmsPrimary font-bold">
                    {data.title}
                  </h1>
                  <p className="sm:text-sm md:text-base xl:text-lg text-lmsSecondary font-medium">
                    {data.content}
                  </p>
                </div>
                <div className="relative sm:h-56 md:h-60 lg:h-60 xl:h-80 sm:w-[400px] md:w-[500px] lg:w-[350px] xl:w-[500px]">
                  <Image
                    src={data.image}
                    alt={"dashboardImage"}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-sm shadow-2xl"
                  />

                  <Image
                    src={data.mobileImage}
                    alt={"dashboardImage"}
                    // fill
                    width={170}
                    height={170}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-sm shadow-lg absolute sm:w-24 md:w-28 lg:w-32 xl:w-40 -top-16 sm:-right-10 2xl:-right-20"
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
