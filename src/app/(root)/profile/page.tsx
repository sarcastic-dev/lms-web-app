"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import axiosInstance from "@/lib/axiosInstance";
import { CloudUpload, ExternalLinkIcon, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import Image from "next/image";

const page: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [profileDetails, setProfileDetails] = useState({
    instituteId: "",
    instituteImageUrl: "",
    instituteName: "",
    instituteEmail: "",
    institutePhoneNumber: "",
    instituteAddress: "",
    city: "",
    userId: "",
    adminImageUrl: "",
    adminFirstName: "",
    adminLastName: "",
    adminEmail: "",
    adminPhone: "",
  });
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedAdminFile, setSelectedAdminFile] = useState<any>(null);
  const [adminPreviewUrl, setAdminPreviewUrl] = useState<string | null>(null);

  const s3Client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
    },
  });

  const uploadFileToS3 = async (selectedFile: any, type: "logo" | "admin") => {
    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: `uploads/${selectedFile.name}`,
      Body: selectedFile,
      ContentType: selectedFile.type,
    };

    try {
      const data = await s3Client.send(new PutObjectCommand(params));
      const s3Url = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.amazonaws.com/uploads/${selectedFile.name}`;
      console.log("File uploaded successfully:", s3Url);

      if (type === "logo") {
        Cookies.set("logoImageUrl", s3Url);
        console.log(
          "Logo image stored in cookies:",
          Cookies.get("logoImageUrl")
        );
        setPreviewUrl(s3Url);
      } else if (type === "admin") {
        Cookies.set("adminImageUrl", s3Url, {
          expires: 365 * 10,
          path: "/",
          secure: true,
        });
        console.log("Admin image cookie set: ", Cookies.get("adminImageUrl"));
        setAdminPreviewUrl(s3Url);
      }
      return s3Url;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  const sendToBackend = async (
    s3Url: string,
    type: "logo" | "admin",
    profileDetails: any
  ) => {
    const payload = {
      user: {
        firstName: profileDetails.adminFirstName,
        lastName: profileDetails.adminLastName,
        email: profileDetails.adminEmail,
        phone: profileDetails.adminPhone,
        imageUrl: type === "admin" ? s3Url : profileDetails.adminImageUrl,
        id: profileDetails.userId,
      },
      institute: {
        id: profileDetails.instituteId,
        city: profileDetails.city,
        name: profileDetails.instituteName,
        email: profileDetails.instituteEmail,
        address: profileDetails.instituteAddress,
        phone: profileDetails.institutePhoneNumber,
        imageUrl: type === "logo" ? s3Url : profileDetails.instituteImageUrl,
      },
    };

    try {
      console.log("Sending updated profile data to backend...", payload);

      const response = await axiosInstance.put("/admin", payload);
      console.log(
        "Image URL saved to backend and profile updated:",
        response.data
      );
    } catch (error) {
      console.error("Error sending image URL to backend:", error);
    }
  };

  const handleFileChange = (e: any, type: "logo" | "admin") => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const preview = URL.createObjectURL(file);

      if (type === "logo") {
        setSelectedFile(file);
        setPreviewUrl(preview);
      } else if (type === "admin") {
        setSelectedAdminFile(file);
        setAdminPreviewUrl(preview);
      }
    }
  };

  const handleUpload = async (type: "logo" | "admin") => {
    if (type === "logo" && selectedFile) {
      const s3Url = await uploadFileToS3(selectedFile, "logo");
      if (s3Url) {
        sendToBackend(s3Url, "logo", profileDetails);
        Cookies.set("logoImageUrl", s3Url);
        window.dispatchEvent(new Event("storage"));
      }
    } else if (type === "admin" && selectedAdminFile) {
      const s3Url = await uploadFileToS3(selectedAdminFile, "admin");
      if (s3Url) {
        sendToBackend(s3Url, "admin", profileDetails);
        Cookies.set("adminImageUrl", s3Url);
        window.dispatchEvent(new Event("storage"));
      }
    } else {
      console.log("No file selected for", type);
    }
  };

  useEffect(() => {
    const savedLogoUrl = Cookies.get("logoImageUrl");
    const savedAdminUrl = Cookies.get("adminImageUrl");

    if (savedLogoUrl) {
      console.log("Retrieved logo from cookies:", savedLogoUrl);

      setPreviewUrl(savedLogoUrl);
    }
    if (savedAdminUrl) {
      setAdminPreviewUrl(savedAdminUrl);
    }

    const fetchProfileData = async () => {
      try {
        const userId = Cookies.get("userId");
        if (!userId) return;

        const response = await axiosInstance.get(`/admin/${userId}`);
        const { user: fetchedUser, institute } = response.data;
        console.log("data:", response.data);

        setProfileDetails({
          instituteId: institute.id,
          instituteImageUrl: institute.imageUrl,
          instituteName: institute.name,
          instituteEmail: institute.email,
          institutePhoneNumber: institute.phone,
          instituteAddress: institute.address,
          city: institute.city,
          userId: fetchedUser.id,
          adminImageUrl: fetchedUser.imageUrl,
          adminFirstName: fetchedUser.firstName,
          adminLastName: fetchedUser.lastName,
          adminEmail: fetchedUser.email,
          adminPhone: fetchedUser.phone,
        });
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleUpdatePassword = async () => {
    if (newPassword.trim() === "" || confirmNewPassword.trim() === "") {
      setErrorMessage("Passwords cannot be empty.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage("");

    try {
      const email = Cookies.get("email");

      if (!email) {
        setErrorMessage("User email is missing. Please check your session.");
        return;
      }

      const response = await axiosInstance.post("users/reset-password", {
        email,
        newPassword,
      });

      console.log("Password reset successful!", response.data);

      setNewPassword("");
      setConfirmNewPassword("");

      router.push("/login");
    } catch (error: any) {
      console.error("Error resetting password:", error);

      const message =
        error?.response?.data?.message ||
        "Error resetting password. Please try again.";
      setErrorMessage(message);
    }
  };

  const handleSaveChanges = async () => {
    const payload = {
      user: {
        firstName: profileDetails.adminFirstName,
        lastName: profileDetails.adminLastName,
        email: profileDetails.adminEmail,
        phone: profileDetails.adminPhone,
        id: profileDetails.userId,
      },
      institute: {
        id: profileDetails.instituteId,
        city: profileDetails.city,
        name: profileDetails.instituteName,
        email: profileDetails.instituteEmail,
        address: profileDetails.instituteAddress,
        phone: profileDetails.institutePhoneNumber,
      },
    };

    try {
      console.log("Saving changes...", payload);

      const response = await axiosInstance.put("/admin", payload);

      console.log("Changes saved successfully:", response.data);
      setIsEdit(false);
    } catch (error) {
      console.error("Error saving profile details:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfileDetails((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEdit((prev) => !prev);
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  return (
    <div className="2xl:px-16 2xl:py-2 xl:px-8 xl:py-2 lg:px-12 lg:py-4">
      <div className="my-4">
        <h4 className="text-lmsPrimary text-2xl font-bold">Profile</h4>
      </div>
      <div className="h-60">
        <div className="h-32 bg-gradient-to-tr from-[#B06AB3] via-lmsAccent to-[#B06AB3] rounded"></div>
        <div className="bg-white h-28 flex justify-between items-center relative">
          <div className=" flex items-center ml-10 absolute -top-6">
            <div className="h-28 w-28 bg-gradient-to-tr from-[#B06AB3] via-lmsAccent to-[#B06AB3] rounded-full border-[3px] border-white shadow-md	">
              {profileDetails.instituteImageUrl !== null ? (
                <img
                  src={profileDetails.instituteImageUrl}
                  alt="Selected file preview"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <div className="text-center text-white flex items-center justify-center h-full w-full">
                  No Image
                </div>
              )}{" "}
            </div>
            <div className="pl-4">
              <h5 className="text-2xl text-lmsPrimary font-bold mt-3">
                {profileDetails.instituteName}{" "}
              </h5>
              {/* <p className="flex items-center text-xs text-lmsSecondary font-medium">
                school@good.com{" "}
                <span className="pl-1">
                  <ExternalLinkIcon size={12} />
                </span>
              </p> */}
            </div>
          </div>
        </div>
      </div>

      <div className="border border-lms-100 p-5 rounded shadow-xl">
        <div className="flex items-start justify-between">
          <div className="">
            <h5 className="text-xl text-lmsPrimary font-bold">
              Institute Profile
            </h5>
            <p className="text-sm text-lms-300 font-medium">
              Update institute details
            </p>
          </div>
          <div className="space-x-3">
            {isEdit ? (
              <>
                <Button
                  size={"sm"}
                  className="rounded text-lmsAccent border-2 font-semibold border-lmsAccent bg-white hover:bg-white"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  className="rounded text-white border-2 h-9 font-semibold border-lmsAccent bg-lmsAccent hover:bg-lmsAccent"
                  onClick={handleSaveChanges}
                >
                  Save changes
                </Button>
              </>
            ) : (
              <Button
                size={"sm"}
                className="rounded h-8 text-sm text-lmsAccent font-semibold border-2 border-lmsAccent hover:bg-white bg-white"
                onClick={handleEditToggle}
              >
                <span className="pr-1.5 text-lmsAccent font-semibold text-sm">
                  <Pencil size={15} />
                </span>{" "}
                Edit Profile
              </Button>
            )}
          </div>
        </div>
        {/* <Separator className="mt-4 bg-lms-300" /> */}

        <div className="flex justify-between mt-10">
          <div className="mt-2">
            <p className="text-lg text-lmsAccent font-bold">
              Institute Basic Details
            </p>
            <p className="text-sm text-lms-300 font-medium">
              This will be dispalyed on your profile.
            </p>
          </div>

          <div className="grid grid-cols-2 2xl:grid-cols-3 justify-between items-center gap-5 mt-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="instituteName">Name</Label>
              <Input
                disabled={!isEdit}
                id="instituteName"
                value={profileDetails.instituteName}
                onChange={handleInputChange}
                className="w-60 xl:h-10 xl:py-0"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="instituteEmail">Email</Label>
              <Input
                disabled={!isEdit}
                id="instituteEmail"
                value={profileDetails.instituteEmail}
                onChange={handleInputChange}
                className="w-60 xl:h-10 xl:py-0"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="institutePhoneNumber" className="mr-5">
                Phone Number
              </Label>
              <div className="relative">
                <Input
                  disabled={!isEdit}
                  id="institutePhoneNumber"
                  value={profileDetails.institutePhoneNumber}
                  onChange={handleInputChange}
                  className="w-60 xl:h-10 xl:py-0 pl-[37px]"
                />
                <span className="absolute font-semibold text-sm text-lms-600 top-[10px] left-2">
                  +91-
                </span>
              </div>
            </div>
            {/* <div className="flex flex-col gap-2">
            <Label htmlFor="website">Website URL</Label>
            <Input
              disabled={!isEdit}
              id="website"
              value={profileDetails.website}
              onChange={handleInputChange}
              className="w-80 xl:h-10 xl:py-0"
            />
          </div> */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="instituteaddress" className="mr-8">
                Address
              </Label>
              <Input
                disabled={!isEdit}
                id="instituteaddress"
                value={profileDetails.instituteAddress}
                onChange={handleInputChange}
                className="w-60 xl:h-10 xl:py-0"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="city" className="mr-8">
                City
              </Label>
              <Input
                disabled={!isEdit}
                id="city"
                value={profileDetails.city}
                onChange={handleInputChange}
                className="w-60 xl:h-10 xl:py-0"
              />
            </div>
          </div>
        </div>
        {/* <Separator className="mt-4 bg-lms-300" /> */}
        <div className="flex justify-between mt-10">
          <div className="mt-2">
            <p className="text-lg text-lmsAccent font-bold">Institute Logo</p>
            {/* <p className="text-sm text-lms-300 font-medium">
              Update institute logo
            </p> */}
          </div>
          <div className="flex items-center space-x-10 2xl:pr-36 xl:pr-20 mt-2">
            {/* <div className="h-24 w-24 rounded-full bg-black flex items-center justify-center mr-16">
            <Image
              src={"/logoCircle.jpg"}
              alt={"logo"}
              width={130}
              height={130}
            />
          </div> */}
            <div className="w-[615px] flex items-center space-x-20">
              <div className="h-32 w-32 flex items-center justify-center bg-gradient-to-tr from-[#B06AB3] via-lmsAccent to-[#B06AB3] rounded-full border-[3px] shadow-md	">
                <div className="bg-white h-[115px] w-[115px] rounded-full">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="File Preview"
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-white flex items-center justify-center h-full w-full">
                      No Image
                    </div>
                  )}{" "}
                </div>
              </div>
              <div>
                <label className="col-span-3 h-20 w-64 rounded flex flex-col justify-center items-center cursor-pointer border border-lms-200 hover:shadow-md">
                  <CloudUpload className="text-lmsAccent z-40" size={25} />
                  <div className="">
                    <span className="text-lmsPrimary text-xs font-medium">
                      Click to upload file
                    </span>
                    <span className="text-xs text-lmsSecondary">
                      &#40;SVG, PNG, JPG, JPEG&#41;
                    </span>
                  </div>
                  <Input
                    id="file"
                    type="file"
                    className="hidden"
                    accept=".svg, .png, .jpg, .jpeg"
                    onChange={(e) => handleFileChange(e, "logo")}
                  />
                </label>
                <Button
                  className="rounded w-64 mt-3 text-xs text-white border-2 h-9 font-semibold border-lmsAccent bg-lmsAccent hover:bg-lmsAccent"
                  onClick={() => handleUpload("logo")}
                >
                  Upload Logo
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* <Separator className="mt-4 bg-lms-300" /> */}
        {/* <div className="flex justify-between mt-4">
        <div className="">
          <h5 className="text-lg text-lmsAccent font-bold">
            Institute Address Information
          </h5>
          <p className="text-sm text-lms-300 font-medium">
            Update your institute address details here.
          </p>
        </div>
        <div className="grid grid-cols-1 items-center gap-5 2xl:pr-36 xl:pr-20 mt-2">
          <div className="flex justify-between space-x-5"></div>
        </div>
      </div> */}

        {/* Owner Profile Starts Here */}
        <Separator className="mt-4 bg-lms-300" />
        <div className="flex items-center justify-between mt-8">
          <div className="">
            <h5 className="text-xl text-lmsPrimary font-bold">Admin Profile</h5>
            <p className="text-sm text-lms-300 font-medium">
              Update Admin details
            </p>
          </div>
        </div>
        {/* <Separator className="mt-4 bg-lms-300" /> */}
        <div className="flex justify-between mt-10">
          <div className="mt-2">
            <p className="text-lg text-lmsAccent font-bold">
              Admin Basic Details
            </p>
            <p className="text-sm text-lms-300 font-medium">
              This will be dispalyed on your profile.
            </p>
          </div>
          <div className="grid grid-cols-2 2xl:grid-cols-3 items-center justify-between gap-5 mt-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="username">Name</Label>
              <Input
                disabled={!isEdit}
                id="name"
                value={`${profileDetails.adminFirstName} ${profileDetails.adminLastName}`}
                onChange={handleInputChange}
                className="w-60 xl:h-10 xl:py-0"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                disabled={!isEdit}
                id="email"
                value={profileDetails.adminEmail}
                onChange={handleInputChange}
                className="w-60 xl:h-10 xl:py-0"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phoneNumber" className="mr-5">
                Phone Number
              </Label>
              <div className="relative">
                <Input
                  id="phone"
                  disabled={!isEdit}
                  value={profileDetails.adminPhone}
                  onChange={handleInputChange}
                  className="w-60 xl:h-10 xl:py-0 pl-[37px]"
                />
                <span className="absolute font-semibold text-sm text-lms-600 top-[10px] left-2">
                  +91-
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between my-10">
          <div className="mt-2">
            <p className="text-lg text-lmsAccent font-bold">
              Admin Profile Picture
            </p>
            {/* <p className="text-sm text-lms-300 font-medium">
              Update your profile picture and then
              <br />
              choose where you want it to display.
            </p> */}
          </div>
          <div className="flex items-center mt-2">
            {/* <div className="h-24 w-24 rounded-full bg-black flex items-center justify-center">
            <Image
              src={"/logoCircle.jpg"}
              alt={"logo"}
              width={130}
              height={130}
            />
          </div> */}
            <div className="w-[760px] flex items-center space-x-20">
              <div className="h-32 w-32 flex items-center justify-center bg-gradient-to-tr from-[#B06AB3] via-lmsAccent to-[#B06AB3] rounded-full border-[3px] shadow-md	">
                <div className="bg-white h-[115px] w-[115px] rounded-full">
                  {adminPreviewUrl ? (
                    <img
                      src={adminPreviewUrl}
                      alt="Selected file preview"
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-white flex items-center justify-center h-full w-full">
                      No Image
                    </div>
                  )}{" "}
                </div>
              </div>
              <div>
                <label className="col-span-3 h-20 w-64 rounded flex flex-col justify-center items-center cursor-pointer border border-lms-200 hover:shadow-md">
                  <CloudUpload className="text-lmsAccent z-40" size={25} />
                  <div className="">
                    <span className="text-lmsPrimary text-xs font-medium">
                      Click to upload file
                    </span>
                    <span className="text-xs text-lmsSecondary">
                      &#40;SVG, PNG, JPG, JPEG&#41;
                    </span>
                  </div>
                  <Input
                    id="file"
                    type="file"
                    className="hidden"
                    accept=".svg, .png, .jpg, .jpeg, .gif"
                    onChange={(e) => handleFileChange(e, "admin")}
                  />
                </label>
                <Button
                  className="rounded w-64 mt-3 text-xs text-white border-2 h-9 font-semibold border-lmsAccent bg-lmsAccent hover:bg-lmsAccent"
                  onClick={() => handleUpload("admin")}
                >
                  Upload Picture
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border border-lms-100 p-5 rounded shadow-xl mb-5 mt-10">
        <div className="flex items-center justify-between">
          <div className="">
            <p className="text-lg text-lmsAccent font-bold">Admin Password</p>
            {/* <p className="text-sm text-lms-300 font-medium">
              Create your password and then click
              <br />
              on update password button.
            </p> */}
          </div>
          <div className="flex gap-5 items-end">
            <div className="flex flex-col gap-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                // disabled={!isEdit}
                // id="newPassword"
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-60 xl:h-10 xl:py-0"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
              <Input
                // disabled={!isEdit}
                // id="confirmNewPassword"
                type="password"
                placeholder="Create New Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-60 xl:h-10 xl:py-0"
              />
            </div>
            <Button
              type="submit"
              size={"sm"}
              className="rounded h-10 text-sm text-lmsAccent font-semibold border-2 border-lmsAccent hover:bg-white bg-white"
              onClick={handleUpdatePassword}
            >
              Update Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
