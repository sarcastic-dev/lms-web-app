import React, { useState } from "react";
import { FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { Button } from "./ui/button";
import axiosInstance from "@/lib/axiosInstance";

interface CreateNewPasswordProps {
  setFormType: (type: "login") => void;
  formData: { email: string };
}

const CreateNewPassword: React.FC<CreateNewPasswordProps> = ({
  setFormType,
  formData,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSetNewPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      const response = await axiosInstance.post("/users/reset-password", {
        email: formData.email, // include the email in the request body
        newPassword, // include the new password in the request body
      });

      console.log("Password reset successful!", response.data);

      // Reset the form fields
      setNewPassword("");
      setConfirmNewPassword("");

      // Redirect to login page
      setFormType("login");
    } catch (error) {
      console.error("Error resetting password:", error);
      setErrorMessage("Error resetting password. Please try again.");
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSetNewPasswordSubmit}>
        <div className="relative space-y-2">
          <h4 className="text-2xl font-bold mb-5">Create New Password</h4>
          <FormLabel htmlFor="newPassword" className="text-gray-500 text-sm">
            New Password
          </FormLabel>
          <div className="relative">
            <Input
              id="newPassword"
              type="password"
              className={`sm:w-[250px] md:w-[320px] lg:w-[402px] mb-5 ${
                newPassword && "pl-10"
              }`}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {newPassword && (
              <KeyRound className="absolute left-2 bottom-[35px] w-5 h-5 text-gray-500" />
            )}
          </div>
          <FormLabel
            htmlFor="confirmNewPassword"
            className="text-gray-500 text-sm"
          >
            Confirm New Password
          </FormLabel>
          <div className="relative">
            <Input
              id="confirmNewPassword"
              type={passwordVisible ? "text" : "password"}
              className={`sm:w-[250px] md:w-[320px] lg:w-[402px] mb-2 ${
                confirmNewPassword && "pl-10"
              } `}
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            {confirmNewPassword && (
              <KeyRound className="absolute left-2 bottom-[22px] w-5 h-5 text-gray-500" />
            )}
            <div
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <EyeOff className="w-5 h-5 text-gray-500 mr-2" />
              ) : (
                <Eye className="w-5 h-5 text-gray-500 mr-2" />
              )}
            </div>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
          <Button
            type="submit"
            variant={"lmsActive"}
            className="w-full mt-3 mb-8"
          >
            Set New Password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewPassword;
