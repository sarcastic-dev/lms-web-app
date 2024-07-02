"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Switch } from "antd";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Separator } from "@/components/ui/separator";
import {
  ChevronRight,
  CircleUser,
  CircleUserRound,
  Ghost,
  Plus,
} from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="m-5">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="text-3xl text-gray-800 font-semibold">
          Classroom Setup
        </h2>
        <div className="flex items-center">
          <div>
            <span className="mr-4 font-semibold text-sm">
              Show inactive classes
            </span>
            <Switch />
          </div>
          <Button className="ml-5" variant={"secondary"}>
            Edit Structure
          </Button>
        </div>
      </div>
      <div className="mt-12">
        <Accordion
          type="single"
          collapsible
          className="bg-blue-50 px-5 rounded-md"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="hover:no-underline font-semibold">
              Senior Secondary
            </AccordionTrigger>
            <AccordionContent className="">
              <Separator className="bg-gray-400" />
              <div className="flex items-start justify-center flex-col mb-4 py-2 ">
                <div className="flex items-center justify-between w-full mb-2">
                  <h1 className="font-medium text-base ">Class - 12</h1>
                  <Button variant="ghost">
                    <span className="flex items-center">
                      <Plus size={10} className="mr-2" />
                      Add New Section
                    </span>
                  </Button>
                </div>
                <div className="flex items-center justify-start">
                  <div className="flex flex-col items-start justify-between w-64 h-24 bg-white p-3 rounded-md ">
                    <div className="flex items-center justify-between w-full">
                      <h6 className="font-semibold ml-1">12 - A</h6>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <CircleUserRound size={15} />
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-700 text-white">
                            <p className="text-[10px] font-light">
                              No class teacher is assigned
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="flex items-center justify-between bg-gray-200 w-12 h-5 px-1.5 rounded-md">
                              <CircleUser size={16} />
                              <p className="font-medium">10</p>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-700 text-white">
                            <p className="text-[10px] font-light">
                              10 Students
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Link href={"/viewclass"}>
                        <p className="flex items-center font-semibold text-blue-500">
                          View{" "}
                          <span className="flex items-center justify-center pt-1">
                            <ChevronRight size={17} />
                          </span>
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* <Separator /> */}
              {/* <div>Hii</div> */}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Page;
