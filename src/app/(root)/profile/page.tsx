"use client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  CloudUpload,
  ExternalLink,
  ExternalLinkIcon,
  Pencil,
  School,
  Settings,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className="2xl:px-16 2xl:py-2 xl:px-8 xl:py-2 lg:px-12 lg:py-4">
      <div className="my-4">
        <h4 className="text-lmsPrimary text-2xl font-bold">
          Institute Profile
        </h4>
      </div>
      <div className="h-60">
        <div className="h-32 bg-lms-100"></div>
        <div className="bg-white h-28 flex justify-between items-center">
          <div className=" flex items-center ml-10 absolute top-44">
            <div className="h-28 w-28 bg-lmsAccent rounded-full border-[3px] border-white shadow-md	"></div>
            <div className="pl-4">
              <h5 className="text-2xl text-lmsPrimary font-bold">
                St. Johns Sr. Secondary School
              </h5>
              <p className="flex items-center text-xs text-lmsSecondary font-medium">
                school@good.com{" "}
                <span className="pl-1">
                  <ExternalLinkIcon size={12} />
                </span>
              </p>
            </div>
          </div>
          {/* <div className="mr-12 absolute right-12 top-[215px]">
            <Button
              variant={"lmsOutline"}
              size={"sm"}
              className="rounded h-8 text-sm "
            >
              <span className="pr-1.5">
                <Pencil size={15} />
              </span>{" "}
              Edit Profile
            </Button>
          </div> */}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg text-lmsAccent font-bold">
            Institute Profile
          </h5>
          <p className="text-sm text-lms-300 font-medium">
            Update your institute profile details here.
          </p>
        </div>
        <div className="space-x-3">
          {isEdit ? (
            <>
              <Button variant={"lmsOutline"} size={"sm"} className="rounded">
                Cancel
              </Button>
              <Button variant={"lmsActive"} className="rounded">
                Save changes
              </Button>
            </>
          ) : (
            <Button
              variant={"lmsOutline"}
              size={"sm"}
              className="rounded h-8 text-sm "
            >
              <span className="pr-1.5">
                <Pencil size={15} />
              </span>{" "}
              Edit Profile
            </Button>
          )}
        </div>
      </div>
      <Separator className="mt-4 bg-lms-300" />

      <div className="flex justify-between mt-4">
        <div>
          <p className="text-lg text-lmsAccent font-bold">Public Profile</p>
          <p className="text-sm text-lms-300 font-medium">
            This will be dispalyed on your profile.
          </p>
        </div>
        <div className="grid grid-cols-2 items-center gap-5">
          <Input
            value={"St. Johns Sr. Secondary School"}
            className="w-96 xl:py-5"
          />
          <Input value={"school@good.com"} className="w-96 xl:py-5" />
          <div className="relative">
            <Input value={"9865646544"} className="w-96 xl:py-5 pl-10" />
            <span className="absolute font-semibold text-sm text-lms-600 top-[11px] left-3">
              +91-
            </span>
          </div>
          <div>
            <Input value={"www.stjohnsschool.com"} className="w-96 xl:py-5" />
          </div>
        </div>
      </div>
      <Separator className="mt-4 bg-lms-300" />
      <div className="flex justify-between mt-4">
        <div>
          <p className="text-lg text-lmsAccent font-bold">Institute Logo</p>
          <p className="text-sm text-lms-300 font-medium">
            Update your institute logo and then
            <br />
            choose where you want it to display.
          </p>
        </div>
        <div className="flex space-x-10">
          <div className="h-24 w-24 rounded-full bg-black flex items-center justify-center">
            <Image
              src={"/logoCircle.jpg"}
              alt={"logo"}
              width={130}
              height={130}
            />
          </div>
          <div>
            <label className="col-span-3  h-36 w-80 rounded flex flex-col justify-center items-center cursor-pointer border border-lms-200">
              <CloudUpload className="text-lmsAccent mb-2 z-40" size={25} />
              <span className="text-lms-500">
                {/* {fileName ? (
											<>
												Selected file:{" "}
												<span className='text-lmsAccent'>
													{fileName}
												</span>
											</>
										) : ( */}
                <>
                  <span className="text-xs text-lmsAccent">Click to upload file</span>{" "}
                  
                  <span className="text-xs">or drag and drop<br/>SVG, PNG, JPG or GIF&#40;max.800*400px&#41;</span>
                </>
                {/*  )} */}
              </span>
              <Input
                id="file"
                type="file"
                className="hidden"
                accept=".xlsx, .csv"
                // onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
