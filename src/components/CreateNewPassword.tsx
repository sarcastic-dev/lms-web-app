import React, { useState } from "react";
import { FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { KeyRound } from "lucide-react";
import { Button } from "./ui/button";

interface CreateNewPasswordProps {
  setFormType: (type: "login") => void; // Modify to accept a function to switch to the login form
}

const CreateNewPassword: React.FC<CreateNewPasswordProps> = ({ setFormType }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
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
      // Simulate password reset success
      console.log("Password reset successful!");

      // Optionally, you can reset the form fields
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
    <div>
      <form onSubmit={handleSetNewPasswordSubmit}>
        <div className="relative space-y-2">
          <FormLabel
            htmlFor="newPassword"
            className="pl-1 text-gray-500 text-sm"
          >
            New Password
          </FormLabel>
          <div>
            <Input
              id="newPassword"
              type="password"
              className="sm:w-[250px] md:w-[320px] lg:w-[402px] pl-10"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <KeyRound className="absolute left-2 top-[46px] w-5 h-5 text-gray-500" />
          </div>
          <FormLabel
            htmlFor="confirmNewPassword"
            className="pl-1 text-gray-500 text-sm"
          >
            Confirm New Password
          </FormLabel>
          <div>
            <Input
              id="confirmNewPassword"
              type="password"
              className="sm:w-[250px] md:w-[320px] lg:w-[402px] pl-10"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <KeyRound className="absolute left-2 bottom-16 w-5 h-5 text-gray-500" />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
          <Button type="submit" variant={"lmsActive"} className="w-full mt-5 mb-8">
            Set New Password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewPassword;
