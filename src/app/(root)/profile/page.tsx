"use client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CloudUpload, ExternalLinkIcon, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isEdit, setIsEdit] = useState(false);

  const [selectedFile, setSelectedFile] = useState<any>(null);

  const s3Client = new S3Client({
    region: "eu-north-1", // e.g., 'us-east-1'
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
    },
  });

  const uploadFileToS3 = async () => {
    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: `uploads/${selectedFile.name}`, // Specify path and filename
      Body: selectedFile,
      ContentType: selectedFile.type,
    };

    try {
      const data = await s3Client.send(new PutObjectCommand(params));
      console.log("File uploaded successfully:", data);

      // Generate public URL
      const s3Url = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.amazonaws.com/uploads/${selectedFile.name}`;
      console.log("s3Url", s3Url);
      // Send this URL to your Go Fiber backend
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // const sendToBackend = async (s3Url) => {
  //   try {
  //     const response = await fetch('/api/save-image-url', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ imageUrl: s3Url }),
  //     });
  //     const data = await response.json();
  //     console.log('Image URL saved to backend:', data);
  //   } catch (error) {
  //     console.error('Error sending image URL to backend:', error);
  //   }
  // };

  const handleFileChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      uploadFileToS3();
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div className="2xl:px-16 2xl:py-2 xl:px-8 xl:py-2 lg:px-12 lg:py-4">
      <div className="my-4">
        <h4 className="text-lmsPrimary text-2xl font-bold">Profile Section</h4>
      </div>
      <div className="h-60">
        <div className="h-32 bg-lms-100 rounded"></div>
        <div className="bg-white h-28 flex justify-between items-center relative">
          <div className=" flex items-center ml-10 absolute -top-6">
            <div className="h-28 w-28 bg-lmsAccent rounded-full border-[3px] border-white shadow-md	"></div>
            <div className="pl-4">
              <h5 className="text-2xl text-lmsPrimary font-bold mt-3">
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
      <div className="flex items-center justify-between mt-4">
        <div className="">
          <h5 className="text-xl text-lmsPrimary font-bold">
            Institute Profile Section
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
        <div className="mt-2">
          <p className="text-lg text-lmsAccent font-bold">
            Institute Basic Details
          </p>
          <p className="text-sm text-lms-300 font-medium">
            This will be dispalyed on your profile.
          </p>
        </div>
        {/* <div className='grid grid-cols-1 items-center gap-3 2xl:pr-64 xl:pr-20 mt-2'>
					<div className='flex justify-between items-center'>
						<Label htmlFor='username'>Name:</Label>
						<Input
							disabled
							id='username'
							defaultValue={"St. Johns Sr. Secondary School"}
							className='w-96 '
						/>
					</div>

					<div className='flex justify-between items-center'>
						<Label htmlFor='email'>Email:</Label>
						<Input
							disabled
							id='email'
							defaultValue={"akshayjain2823@gmail.com"}
							className='w-96 '
						/>
					</div>
					<div className='flex  justify-between items-center'>
						<Label
							htmlFor='webUrl'
							className='mr-5'
						>
							Phone Number:
						</Label>
						<div className='relative'>
							<Input
								disabled
								defaultValue={"9865646544"}
								className='w-96  pl-10'
							/>
							<span className='absolute font-semibold text-sm text-lms-600 top-[15px] left-3'>
								+91-
							</span>
						</div>
					</div>
					<div className='flex justify-between items-center'>
						<Label htmlFor='webUrl'>Website URL:</Label>
						<Input
							disabled
							id='webUrl'
							defaultValue={"https//:www.school.com"}
							className='w-96 '
						/>
					</div>
				</div> */}
        <div className="grid grid-cols-2 items-center gap-5 2xl:pr-36 xl:pr-20 mt-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Name</Label>
            <Input
              disabled
              id="username"
              defaultValue={"St. Johns Sr. Secondary School"}
              className="w-80 "
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              disabled
              id="email"
              defaultValue={"akshayjain2823@gmail.com"}
              className="w-80 "
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="webUrl" className="mr-5">
              Phone Number
            </Label>
            <div className="relative">
              <Input
                disabled
                defaultValue={"9865646544"}
                className="w-80  pl-10"
              />
              <span className="absolute font-semibold text-sm text-lms-600 top-[15px] left-3">
                +91-
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="webUrl">Website URL</Label>
            <Input
              disabled
              id="webUrl"
              defaultValue={"https//:www.school.com"}
              className="w-80 "
            />
          </div>
        </div>
      </div>
      <Separator className="mt-4 bg-lms-300" />
      <div className="flex justify-between mt-4">
        <div className="mt-2">
          <p className="text-lg text-lmsAccent font-bold">Institute Logo</p>
          <p className="text-sm text-lms-300 font-medium">
            Update your institute logo and then
            <br />
            choose where you want it to display.
          </p>
        </div>
        <div className="flex  items-center space-x-10 2xl:pr-36 xl:pr-20 mt-2">
          <div className="h-24 w-24 rounded-full bg-black flex items-center justify-center mr-16">
            <Image
              src={"/logoCircle.jpg"}
              alt={"logo"}
              width={130}
              height={130}
            />
          </div>
          <div>
            <label className="col-span-3  h-36 w-96 rounded flex flex-col justify-center items-center cursor-pointer border border-lms-200">
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
                  <span className="text-xs text-lmsPrimary">
                    Click to upload file
                  </span>{" "}
                  <span className="text-xs">
                    or drag and drop
                    <br />
                    SVG, PNG, JPG or GIF&#40;max.800*400px&#41;
                  </span>
                </>
                {/*  )} */}
              </span>
              <Input
                id="file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <button onClick={handleUpload}>upload</button>
          </div>
        </div>
      </div>

      <Separator className="mt-4 bg-lms-300" />
      <div className="flex justify-between mt-4">
        <div className="">
          <h5 className="text-lg text-lmsAccent font-bold">
            Institute Address Information
          </h5>
          <p className="text-sm text-lms-300 font-medium">
            Update your institute address details here.
          </p>
        </div>
        <div className="grid grid-cols-1 items-center gap-5 2xl:pr-36 xl:pr-20 mt-2">
          <div className="flex justify-between space-x-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="username" className="mr-8">
                Address Line 1
              </Label>
              <Input
                disabled
                id="username"
                defaultValue={"5999+QXW, Humaunpur"}
                className="w-80 "
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="mr-8">
                Address Line 2
              </Label>
              <Input
                disabled
                id="email"
                defaultValue={"Agra Road"}
                className="w-80 "
              />
            </div>
          </div>

          <div className="flex justify-between space-x-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="city" className="mr-8">
                City
              </Label>
              <Input
                disabled
                id="city"
                defaultValue={"5999+QXW, Humaunpur"}
                className="w-80 "
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="pincode" className="mr-8">
                Pin Code
              </Label>
              <Input
                disabled
                id="pincode"
                defaultValue={"Agra Road"}
                className="w-80 "
              />
            </div>
          </div>
          <div className="flex justify-between space-x-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="state" className="mr-8">
                State
              </Label>
              <Input
                disabled
                id="state"
                defaultValue={"5999+QXW, Humaunpur"}
                className="w-80 "
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="country" className="mr-8">
                Country
              </Label>
              <Input
                disabled
                id="country"
                defaultValue={"Agra Road"}
                className="w-80 "
              />
            </div>
          </div>
        </div>
      </div>

      {/* Owner Profile Starts Here */}

      <div className="flex items-center justify-between mt-8">
        <div className="">
          <h5 className="text-xl text-lmsPrimary font-bold">
            Owner Profile Section
          </h5>
          <p className="text-sm text-lms-300 font-medium">
            Update your Owner profile details here.
          </p>
        </div>
        {/* <div className='space-x-3'>
					{isEdit ? (
						<>
							<Button
								variant={"lmsOutline"}
								size={"sm"}
								className='rounded'
							>
								Cancel
							</Button>
							<Button
								variant={"lmsActive"}
								className='rounded'
							>
								Save changes
							</Button>
						</>
					) : (
						<Button
							variant={"lmsOutline"}
							size={"sm"}
							className='rounded h-8 text-sm '
						>
							<span className='pr-1.5'>
								<Pencil size={15} />
							</span>{" "}
							Edit Profile
						</Button>
					)}
				</div> */}
      </div>
      <Separator className="mt-4 bg-lms-300" />
      <div className="flex justify-between mt-4 ">
        <div className="mt-2">
          <p className="text-lg text-lmsAccent font-bold">
            Owner Basic Details
          </p>
          <p className="text-sm text-lms-300 font-medium">
            This will be dispalyed on your profile.
          </p>
        </div>
        <div className="grid grid-cols-2 items-center gap-5 2xl:pr-36 xl:pr-20 mt-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Name</Label>
            <Input
              disabled
              id="username"
              defaultValue={"St. Johns Sr. Secondary School"}
              className="w-80 "
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              disabled
              id="email"
              defaultValue={"akshayjain2823@gmail.com"}
              className="w-80 "
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="webUrl" className="mr-5">
              Phone Number
            </Label>
            <div className="relative">
              <Input
                disabled
                defaultValue={"9865646544"}
                className="w-80  pl-10"
              />
              <span className="absolute font-semibold text-sm text-lms-600 top-[15px] left-3">
                +91-
              </span>
            </div>
          </div>
        </div>
      </div>
      <Separator className="mt-4 bg-lms-300" />
      <div className="flex justify-between mt-4 mb-8">
        <div className="mt-2">
          <p className="text-lg text-lmsAccent font-bold">
            Owner Profile Picture
          </p>
          <p className="text-sm text-lms-300 font-medium">
            Update your profile picture and then
            <br />
            choose where you want it to display.
          </p>
        </div>
        <div className="flex space-x-10 2xl:pr-64 xl:pr-20 mt-2">
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
                  <span className="text-xs text-lmsPrimary">
                    Click to upload file
                  </span>{" "}
                  <span className="text-xs">
                    or drag and drop
                    <br />
                    SVG, PNG, JPG or GIF&#40;max.800*400px&#41;
                  </span>
                </>
                {/*  )} */}
              </span>
              <Input
                id="file"
                type="file"
                className="hidden"
                accept=".xlsx, .csv"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
