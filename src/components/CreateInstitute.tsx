"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  instituteSchema,
  InstituteSchema,
} from "@/schema/createInstitute/instituteFormSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import axiosInstance from "@/lib/axiosInstance";

interface CreateInstituteProps {
  userId: string | null;
}

const CreateInstitute: React.FC<CreateInstituteProps> = ({ userId }) => {
  const [formData, setFormData] = useState<InstituteSchema>({
    instituteName: "",
    address: "",
    phoneNumber: "",
    city: "",
    instituteType: "",
    instituteAddress: "",
    academicBoard: "", // New state for Academic Board selection
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isValid = instituteSchema.safeParse(formData).success;
    setIsButtonDisabled(!isValid);
  }, [formData]);

  const validateForm = () => {
    const result = instituteSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach(
        (err: { path: string | any[]; message: string }) => {
          if (err.path.length > 0) {
            const field = err.path[0];
            newErrors[field] = err.message;
          }
        }
      );
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsCreating(true);

      try {
        const instituteData = { ...formData, userId };

        console.log("Sending request with data:", instituteData);
        const response = await axiosInstance.post("/institutes", instituteData);
        console.log("Institute created:", response.data);

        setTimeout(() => {
          setIsCreating(false);
          router.push("/loader");
        }, 2000);
      } catch (error: any) {
        console.error("Error creating institute:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          setErrors({
            general:
              "Failed to create institute. Please check the provided information.",
          });
        } else {
          console.error("Error message:", error.message);
          setErrors({
            general: "Failed to create institute. Please try again later.",
          });
        }
        setIsCreating(false);
      }
    }
  };

  const handleInputChange =
    (field: keyof InstituteSchema) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  const handleSelectChange =
    (field: keyof InstituteSchema) => (value: string) => {
      setFormData({ ...formData, [field]: value });
    };

  return (
    <div className="bg-white border p-8 rounded-lg shadow-xl w-2/6 h-6/6 z-10">
      <h1 className="text-2xl text-center text-blue-500 font-bold mb-3">
        Create your Institute
      </h1>
      <p className="text-center text-gray-500 mb-6">
        Tell us about you and your institute
      </p>
      <form onSubmit={handleSubmit}>
        <div className="relative mb-4">
          <Select
            value={formData.city}
            onValueChange={handleSelectChange("city")}
            required
          >
            <SelectTrigger className={`w-full font-medium border-2 rounded-xl bg-white focus:border-blue-500 outline-none ${!formData.city ? "text-gray-400" : ""}`}>
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Firozabad">Firozabad</SelectItem>
              <SelectItem value="New Delhi">New Delhi</SelectItem>
              <SelectItem value="Gurugram">Gurugram</SelectItem>
              <SelectItem value="Bangalore">Bangalore</SelectItem>
            </SelectContent>
          </Select>
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>
        <div className="relative mb-4">
          <Select
            value={formData.instituteType}
            onValueChange={handleSelectChange("instituteType")}
            required
          >
            <SelectTrigger className={`w-full font-medium border-2 rounded-xl bg-white focus:border-blue-500 outline-none ${!formData.instituteType ? "text-gray-400" : ""}`}>
              <SelectValue placeholder="Select your institute type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="School">School</SelectItem>
              <SelectItem value="College">College</SelectItem>
              <SelectItem value="Tuition">Tuition</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>
          {errors.instituteType && (
            <p className="text-red-500 text-sm mt-1">{errors.instituteType}</p>
          )}
        </div>
        <div className="relative mb-4">
          <Select
            value={formData.academicBoard}
            onValueChange={handleSelectChange("academicBoard")}
            required
          >
            <SelectTrigger className={`w-full font-medium border-2 rounded-xl bg-white focus:border-blue-500 outline-none ${!formData.academicBoard ? "text-gray-400" : ""}`}>
              <SelectValue
                placeholder="Select Academic Board"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CBSE">CBSE</SelectItem>
              <SelectItem value="ICSE">ICSE</SelectItem>
              <SelectItem value="State Board">State Board</SelectItem>
              <SelectItem value="IB">IB</SelectItem>
              {/* Add other options as needed */}
            </SelectContent>
          </Select>
          {errors.academicBoard && (
            <p className="text-red-500 text-sm mt-1">{errors.academicBoard}</p>
          )}
        </div>
        <div className="relative mb-4">
          <Input
            id="institute_name"
            type="text"
            className={`w-full font-medium border-2 rounded-xl placeholder:text-gray-400 bg-white focus:border-blue-500 outline-none ${
              errors.instituteName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Institute Name"
            value={formData.instituteName}
            onChange={handleInputChange("instituteName")}
            required
          />
          {errors.instituteName && (
            <p className="text-red-500 text-sm mt-1">{errors.instituteName}</p>
          )}
        </div>
        <div className="relative mb-4">
          <Input
            id="email_address"
            type="text"
            className={`w-full font-medium border-2 rounded-xl placeholder:text-gray-400 bg-white focus:border-blue-500 outline-none ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Email Address"
            value={formData.address}
            onChange={handleInputChange("address")}
            required
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>
        <div className="relative mb-4">
          <Input
            id="phone_number"
            type="text"
            className={`w-full font-medium border-2 rounded-xl placeholder:text-gray-400 bg-white focus:border-blue-500 outline-none ${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange("phoneNumber")}
            required
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
          )}
        </div>
        <div className="relative mb-4">
          <Input
            id="institute_address"
            type="text"
            className={`w-full font-medium border-2 rounded-xl placeholder:text-gray-400 bg-white focus:border-blue-500 outline-none ${
              errors.instituteAddress ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Institute Address"
            value={formData.instituteAddress}
            onChange={handleInputChange("instituteAddress")}
            required
          />
          {errors.instituteAddress && (
            <p className="text-red-500 text-sm mt-1">
              {errors.instituteAddress}
            </p>
          )}
        </div>
        {errors.general && (
          <p className="text-red-500 text-sm mt-1">{errors.general}</p>
        )}
        <button
          type="submit"
          className={`w-full py-2 mt-5 font-semibold text-blue-500 border-blue-500 border-2 rounded-xl ${
            isButtonDisabled || isCreating
              ? "bg-white cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          disabled={isButtonDisabled || isCreating}
        >
          {isCreating ? "Creating Institute..." : "Create Institute"}
        </button>
      </form>
    </div>
  );
};

export default CreateInstitute;
