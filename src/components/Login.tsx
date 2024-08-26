"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Cookies from "js-cookie";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import useOtpRequest from "../hooks/useOtpRequest";
import useCookie from "../hooks/useCookie";
import axiosInstance from "../lib/axiosInstance";
import {
	AuthSchema,
	AuthSchemaType,
} from "../schema/createInstitute/AuthSchema";
import { FormType } from "@/types";
import Otp from "./Otp";

interface LoginProps {
	onShowOTP: (contact: { email: string; phone: string }) => void;
	setFormType: (type: FormType) => void;
	setFormData: (data: any) => void;
}

const Login: React.FC<LoginProps> = ({
	onShowOTP,
	setFormType,
	setFormData,
}) => {
	const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [hasAccount, setHasAccount] = useState(false);
	const [showPasswordInput, setShowPasswordInput] = useState(false);
	const [isSendingOTP, setIsSendingOTP] = useState(false);
	const [token, setToken] = useCookie("token");
	const requestOtp = useOtpRequest();
	const [forgotPassword, setForgotPassword] = useState(false);
	const [isOtpSent, setIsOptSent] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const phoneRegex = /^\d{10}$/;

	const validateInput = (emailOrPhoneNumber: string): boolean => {
		return (
			emailRegex.test(emailOrPhoneNumber) ||
			phoneRegex.test(emailOrPhoneNumber)
		);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateInput(emailOrPhoneNumber.trim())) {
			setErrorMessage("Invalid email or mobile number.");
			return;
		}
		setErrorMessage("");
		setIsSendingOTP(false);
		setFormData({
			email: emailRegex.test(emailOrPhoneNumber)
				? emailOrPhoneNumber
				: "",
			phone: emailRegex.test(emailOrPhoneNumber)
				? ""
				: emailOrPhoneNumber,
		});

		const userObj = emailRegex.test(emailOrPhoneNumber)
			? { email: emailOrPhoneNumber, phone: "" }
			: { email: "", phone: emailOrPhoneNumber };

		try {
			const { data } = await axiosInstance.post("/users/exists", userObj);

			if (data.exists) {
				setHasAccount(true);
				setShowPasswordInput(true);
				if (inputRef.current) {
					inputRef.current.blur();
				}
			} else {
				setHasAccount(false);
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
				setFormType("otp");
			}
		} catch (error) {
			console.error("Error checking user existence:", error);
			setErrorMessage("Error checking user existence.");
		} finally {
			setIsSendingOTP(false);
		}
	};

	const handlePasswordSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (password.trim() === "") {
			setErrorMessage("Password cannot be empty.");
			return;
		}
		setErrorMessage("");

		try {
			const { data } = await axiosInstance.post("/users/login", {
				...(emailRegex.test(emailOrPhoneNumber)
					? { email: emailOrPhoneNumber }
					: { phone: emailOrPhoneNumber }),
				password,
			});

			const { accessToken, refreshToken, instituteId } = data;

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
			// Navigate to dashboard
			router.push("/dashboard");
		} catch (error) {
			console.error("Error logging in:", error);
			setErrorMessage("Error logging in. Please try again.");
		}
	};

	const form = useForm<AuthSchemaType>({
		resolver: zodResolver(AuthSchema),
	});
	const handleForgetPassword = () => {
		setForgotPassword(true);
		setShowPasswordInput(false);
	};

	const handleOtpRequest = async (e: React.FormEvent) => {
		e.preventDefault();
		const { data } = await axiosInstance.post("/request-otp", {
			email: emailOrPhoneNumber,
		});
		setToken({
			value: data.token,
			expirationDate: new Date(
				new Date().getTime() + 24 * 60 * 60 * 1000
			).toISOString(),
		});
		setIsSendingOTP(true);
		setForgotPassword(false);
		setShowPasswordInput(false);
	};

	return (
		<div>
			<div className='flex flex-col sm:w-[320px] md:w-[380px] lg:w-[466px] bg-white p-8 rounded z-10'>
				<Form {...form}>
					<form
						onSubmit={
							showPasswordInput
								? handlePasswordSubmit
								: forgotPassword
								? handleOtpRequest
								: handleSubmit
						}
					>
						<div>
							<h4 className='text-2xl font-bold mb-5'>
								Get Start New
							</h4>
							{forgotPassword ? (
								<Input
									placeholder='Enter email for otp'
									onChange={(e) =>
										setEmailOrPhoneNumber(e.target.value)
									}
									value={emailOrPhoneNumber}
								/>
							) : isSendingOTP ? (
								<Otp
									setFormType={function (
										type: FormType
									): void {
										throw new Error(
											"Function not implemented."
										);
									}}
									onEdit={function (): void {
										throw new Error(
											"Function not implemented."
										);
									}}
									formData={{
										email: emailOrPhoneNumber,
										phone: "",
									}}
								/>
							) : (
								<FormField
									control={form.control}
									name='email_or_phone_number'
									render={({ field }) => (
										<FormItem>
											<FormLabel
												htmlFor='email_or_phone_number'
												className='pl-1 text-gray-500 text-sm'
											>
												Email
											</FormLabel>
											<FormControl>
												<div className='relative space-y-2'>
													<Input
														id='email_or_phone_number'
														type='text'
														className='sm:w-[250px] md:w-[320px] lg:w-[402px]'
														placeholder='Enter Email'
														{...field}
														value={
															emailOrPhoneNumber
														}
														onChange={(e) =>
															setEmailOrPhoneNumber(
																e.target.value
															)
														}
														ref={inputRef}
													/>
													{showPasswordInput && (
														<>
															<FormLabel
																htmlFor='password'
																className='pl-1 text-gray-500 text-sm'
															>
																Password
															</FormLabel>
															<Input
																id='password'
																type='password'
																className='sm:w-[250px] md:w-[320px] lg:w-[402px]'
																placeholder='Password'
																value={password}
																onChange={(e) =>
																	setPassword(
																		e.target
																			.value
																	)
																}
															/>
														</>
													)}
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
							{!forgotPassword && showPasswordInput && (
								<div className='text-end'>
									<Button
										variant={"link"}
										className='px-0 text-lmsError'
										onClick={handleForgetPassword}
										type='button'
									>
										Forgot password!
									</Button>
								</div>
							)}

							{!isSendingOTP && (
								<Button
									type='submit'
									variant={"lmsActive"}
									className={`sm:w-[250px] md:w-[320px] lg:w-[402px] mt-5 mb-8`}
								>
									{showPasswordInput
										? "Login"
										: forgotPassword
										? "Send OTP"
										: "Submit"}
								</Button>
							)}
							{/* <Button
								type='submit'
								variant={"lmsActive"}
								className={`sm:w-[250px] md:w-[320px] lg:w-[402px] mt-5 mb-8`}
							>
								{isSendingOTP && !showPasswordInput
									? "Sending OTP..."
									: showPasswordInput
									? "Login"
									: "Submit"}
							</Button> */}
							{errorMessage && (
								<div className='text-red-500 mt-2'>
									{errorMessage}
								</div>
							)}
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default Login;
