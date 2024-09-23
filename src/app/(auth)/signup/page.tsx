"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/newButton";
import { Mail, CircleX, Phone } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useOtpRequest from "@/hooks/useOtpRequest";
import useCookie from "@/hooks/useCookie";
import axiosInstance from "@/lib/axiosInstance";
import {
  AuthSchema,
  AuthSchemaType,
} from "@/schema/createInstitute/AuthSchema";
import { showToast } from "@/utils/toastHelper";
import { upperFirst } from "lodash";
import { useDispatch } from "react-redux";
import { setUserInfoData } from "@/context/auth/signupSlice";

const Login: React.FC = () => {
  const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [token, setToken] = useCookie("token");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  const validateInput = (emailOrPhoneNumber: string): boolean => {
    return (
      emailRegex.test(emailOrPhoneNumber) || phoneRegex.test(emailOrPhoneNumber)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInput(emailOrPhoneNumber.trim())) {
      setErrorMessage("Please enter valid input");
      return;
    }
    setErrorMessage("");
    setIsSendingOTP(false);

    const userObj = emailRegex.test(emailOrPhoneNumber)
      ? { email: emailOrPhoneNumber, phone: "" }
      : { email: "", phone: emailOrPhoneNumber };

    try {
      setIsSendingOTP(true);
      const { data } = await axiosInstance.post("/request-otp", {
        email: userObj.email,
      });
      setToken({
        value: data.token,
        expirationDate: new Date(
          new Date().getTime() + 24 * 60 * 60 * 1000
        ).toISOString(),
      });
      showToast("success", `OTP sent Successfully`);
      console.log(userObj);
      dispatch(
        setUserInfoData({
          email: userObj.email,
          phone: "",
        })
      ),
        router.push("/otp");
    } catch (error) {
      setErrorMessage("Network error please try again.");
    } finally {
      setIsSendingOTP(false);
    }
  };

  const form = useForm<AuthSchemaType>({
    resolver: zodResolver(AuthSchema),
  });

  return (
    <div>
      <div className="flex flex-col sm:w-[320px] md:w-[380px] lg:w-[466px] bg-white p-8 rounded z-10">
        <FormProvider {...form}>
          <Form {...form}>
            <form onSubmit={handleSubmit}>
              <div>
                <h4 className="text-2xl font-bold mb-5">Get Start New</h4>
                <FormField
                  control={form.control}
                  name="email_or_phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="email_or_phone_number"
                        className="pl-1 text-gray-500 text-sm"
                      >
                        Email
                      </FormLabel>
                      <FormControl>
                        <div className="relative space-y-2">
                          <Input
                            id="email_or_phone_number"
                            type="text"
                            className={`sm:w-[250px] md:w-[320px] lg:w-[402px] xl:h-10 xl:py-0 placeholder:text-xs ${
                              emailOrPhoneNumber && "pl-10"
                            }`}
                            placeholder="Enter Email"
                            {...field}
                            value={emailOrPhoneNumber}
                            onChange={(e) =>
                              setEmailOrPhoneNumber(e.target.value)
                            }
                            ref={inputRef}
                          />

                          {emailOrPhoneNumber ? (
                            /^[a-zA-Z]/.test(emailOrPhoneNumber) ? (
                              <Mail
                                size={20}
                                className="absolute left-2 sm:top-[2px] lg:top-[4px] xl:top-[8px] text-gray-500 ml-1"
                              />
                            ) : (
                              <Phone
                                size={20}
                                className="absolute left-2 sm:top-[2px] lg:top-[4px] xl:top-[8px] text-gray-500 ml-1"
                              />
                            )
                          ) : null}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  variant={"lmsActive"}
                  size={"lms"}
                  disabled={isSendingOTP}
                >
                  {isSendingOTP ? "Submitting" : "Submit"}
                </Button>
                {errorMessage && (
                  <div className="bg-red-200 text-lmsError h-10 px-3  rounded flex items-center gap-2 text-sm">
                    <CircleX size={20} /> {upperFirst(errorMessage)}
                  </div>
                )}
              </div>
            </form>
          </Form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Login;
