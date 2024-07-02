"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

axios.defaults.baseURL = "http://16.170.155.154:3300/api";

interface CreateInstituteProps {
  userId: string | null;
}

interface FormErrors {
  instituteName?: string;
  address?: string;
  phoneNumber?: string;
  general?: string;
  instituteAddress?: string;
}

const CreateInstitute: React.FC<CreateInstituteProps> = ({ userId }) => {
  // const [instituteName, setInstituteName] = useState("");
  // const [address, setAddress] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [city, setCity] = useState("");
  // const [instituteType, setInstituteType] = useState("");
  // const [instituteAddress, setInstituteAddress] = useState("");
  // const [errors, setErrors] = useState<FormErrors>({});
  // const [isFocused, setIsFocused] = useState<{ [key: string]: boolean }>({});
  // const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  // const [isCreating, setIsCreating] = useState(false); // State to track if form is being submitted
  // const router = useRouter();

  // useEffect(() => {
  //   if (
  //     instituteName.trim() &&
  //     address.trim() &&
  //     phoneNumber.trim() &&
  //     city.trim() &&
  //     instituteType.trim() &&
  //     instituteAddress.trim()
  //   ) {
  //     setIsButtonDisabled(false);
  //   } else {
  //     setIsButtonDisabled(true);
  //   }
  // }, [
  //   instituteName,
  //   address,
  //   phoneNumber,
  //   city,
  //   instituteType,
  //   instituteAddress,
  // ]);

  // const validateForm = () => {
  //   const newErrors: FormErrors = {};

  //   if (!instituteName.trim()) {
  //     newErrors.instituteName = "Institute name is required.";
  //   }

  //   if (!address.trim()) {
  //     newErrors.address = "Address is required.";
  //   }

  //   if (!phoneNumber.trim()) {
  //     newErrors.phoneNumber = "Phone number is required.";
  //   }

  //   if (!instituteAddress.trim()) {
  //     newErrors.instituteAddress = "Institute address is required.";
  //   }

  //   setErrors(newErrors);

  //   return Object.keys(newErrors).length === 0;
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (validateForm()) {
  //     setIsCreating(true);

  //     try {
  //       const instituteData = {
  //         name: instituteName,
  //         email: address,
  //         phone: phoneNumber,
  //         city: city,
  //         type: instituteType,
  //         address: instituteAddress,
  //         userId: userId, // <-- Replace with your UUID
  //       };

  //       console.log("Sending request with data:", instituteData);
  //       const response = await axios.post("/institutes", instituteData);
  //       console.log("Institute created:", response.data);

  //       // Simulate a delay for UX purposes
  //       setTimeout(() => {
  //         setIsCreating(false);
  //         router.push("/loader");
  //       }, 2000);
  //     } catch (error: any) {
  //       console.error("Error creating institute:", error);
  //       if (error.response) {
  //         console.error("Response data:", error.response.data);
  //         setErrors({
  //           ...errors,
  //           general:
  //             "Failed to create institute. Please check the provided information.",
  //         });
  //       } else {
  //         console.error("Error message:", error.message);
  //         setErrors({
  //           ...errors,
  //           general: "Failed to create institute. Please try again later.",
  //         });
  //       }
  //       setIsCreating(false);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   const fetchInstitutes = async () => {
  //     try {
  //       const response = await axios.get("/institutes");
  //       console.log("Fetched institutes:", response.data);
  //       // Handle response data as needed
  //     } catch (error) {
  //       console.error("Error fetching institutes:", error);
  //       // Handle error as needed
  //     }
  //   };

  //   fetchInstitutes();
  // }, []);

  // const handleFocus = (field: string) => {
  //   setIsFocused((prev) => ({ ...prev, [field]: true }));
  // };

  // const handleBlur = (field: string) => {
  //   setIsFocused((prev) => ({ ...prev, [field]: false }));
  // };

  // const getLabelClasses = (field: string, value: string) =>
  //   `absolute left-3 top-3 text-gray-500 font-medium transition-all duration-200 ease-in-out pointer-events-none ${
  //     isFocused[field] || value ? "text-xs -top-1 left-1 bg-white px-1" : ""
  //   }`;

  // const handleSelectChange = (
  //   e: React.ChangeEvent<HTMLSelectElement>,
  //   setter: React.Dispatch<React.SetStateAction<string>>
  // ) => {
  //   setter(e.target.value);
  //   setIsFocused((prev) => ({ ...prev, [e.target.name]: true }));
  // };

  return (
    <div className="bg-white border p-8 rounded-lg shadow-xl w-2/6 h-6/6 z-10">
      <h1 className="text-2xl text-center text-blue-500 font-bold mb-3">
        Create your Institute
      </h1>
      <p className="text-center text-gray-500 mb-6">
        Tell us about you and your institute
      </p>
    </div>
  );
};

export default CreateInstitute;
