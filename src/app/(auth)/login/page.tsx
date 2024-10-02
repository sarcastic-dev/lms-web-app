"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/newButton";
import { Mail, Lock, Eye, EyeOff, CircleX, Phone } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axiosInstance from "@/lib/axiosInstance";
import {
  AuthSchema,
  AuthSchemaType,
} from "@/schema/createInstitute/AuthSchema";
import Cookies from "js-cookie";
import { showToast } from "@/utils/toastHelper";
import { upperFirst } from "lodash";
import { useDispatch } from "react-redux";
import { setUserId, setUserInfoData } from "@/context/auth/signupSlice";

const Login: React.FC = () => {
  const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [adminPreviewUrl, setAdminPreviewUrl] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  const userObj = emailRegex.test(emailOrPhoneNumber)
    ? { email: emailOrPhoneNumber, phone: "" }
    : { email: "", phone: emailOrPhoneNumber };
    

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === "") {
      setErrorMessage("Password can not be empty.");
      return;
    }
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const { data } = await axiosInstance.post("/users/login", {
        ...(emailRegex.test(emailOrPhoneNumber)
          ? { email: emailOrPhoneNumber }
          : { phone: emailOrPhoneNumber }),
        password,
      });

      const {
        accessToken,
        refreshToken,
        instituteId,
        id,
        email,
        firstName,
        imageUrl,
        role,
      } = data;

      Cookies.set("refreshToken", refreshToken, {
        expires: 7,
        path: "/",
        secure: true,
      });
      Cookies.set("accessToken", accessToken, {
        expires: 1 / 24,
        path: "/",
        secure: true,
      });
      Cookies.set("instituteId", instituteId, {
        expires: 7,
        path: "/",
        secure: true,
      });
      Cookies.set("userId", id, {
        expires: 7,
        path: "/",
        secure: true,
      });
      Cookies.set("email", email, {
        expires: 7,
        path: "/",
        secure: true,
      });
      Cookies.set("name", firstName, {
        expires: 7,
        path: "/",
        secure: true,
      });
      Cookies.set("adminImageUrl", imageUrl, {
        expires: 7,
        path: "/",
        secure: true,
      });
      // Cookies.set("logoImageUrl", imageUrl, {
      //   expires: 7,
      //   path: "/",
      //   secure: true,
      // });
      // Cookies.set("role", role, {
      //   expires: 7,
      //   path: "/",
      //   secure: true,
      // });
      showToast("success", "Logged in successfully");

      router.push("/dashboard");
    } catch (error: any) {
      setErrorMessage(`${error.response.data.error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPasswordClick = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      setUserInfoData({
        email: userObj.email,
        phone: "",
      })
    ),
      router.push("/forgotPassword");
  };

  const form = useForm<AuthSchemaType>({
    resolver: zodResolver(AuthSchema),
  });

  

  return (
    <div>
      <div className="flex flex-col sm:w-[320px] md:w-[380px] lg:w-[466px] bg-white p-8 rounded z-10">
        <FormProvider {...form}>
          <Form {...form}>
            <form onSubmit={handlePasswordSubmit}>
              <div>
                <h4 className="text-2xl font-bold mb-5">Login</h4>
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
                        <div className="relative space-y-1">
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
                          />

                          {emailOrPhoneNumber ? (
                            /^[a-zA-Z]/.test(emailOrPhoneNumber) ? (
                              <Mail
                                size={20}
                                className="absolute left-2 sm:top-[5px] lg:top-[6px] text-gray-500 ml-1"
                              />
                            ) : (
                              <Phone
                                size={20}
                                className="absolute left-2 sm:top-[2px] lg:top-[6px] text-gray-500 ml-1"
                              />
                            )
                          ) : null}
                          <div className="pt-2">
                            <FormLabel
                              htmlFor="password"
                              className="pl-1 text-gray-500 text-sm"
                            >
                              Password
                            </FormLabel>
                            <div className="relative mt-2">
                              <Input
                                id="password"
                                type={passwordVisible ? "text" : "password"}
                                className={`sm:w-[250px] md:w-[320px] lg:w-[402px] xl:h-10 xl:py-0 placeholder:text-xs ${
                                  password && "pl-10"
                                }`}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />

                              {password && (
                                <Lock
                                  size={20}
                                  className="absolute left-2 sm:top-[9px] lg:top-[10px] xl:top-[10px] text-gray-500 ml-1"
                                />
                              )}
                              <div
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                onClick={() =>
                                  setPasswordVisible(!passwordVisible)
                                }
                              >
                                {passwordVisible ? (
                                  <EyeOff className="w-5 h-5 text-gray-500 mr-2" />
                                ) : (
                                  <Eye className="w-5 h-5 text-gray-500 mr-2" />
                                )}
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <button
                                onClick={handleForgotPasswordClick}
                                type="button"
                                className="bg-transparent tracking-wide text-xs font-medium text-lmsAccent pt-2"
                              >
                                Forgot Password?
                              </button>
                              <button
                                onClick={() => router.push("/signup")}
                                type="button"
                                className="bg-transparent tracking-wide text-xs font-medium text-lmsPrimary hover:text-lmsAccent pt-2"
                              >
                                Don't have an account?
                              </button>
                            </div>
                          </div>
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in" : "Login"}
                </Button>
                {errorMessage && (
                  <div className="bg-red-200 text-lmsError h-10 px-3 mt-3 rounded flex items-center gap-2 text-sm">
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
