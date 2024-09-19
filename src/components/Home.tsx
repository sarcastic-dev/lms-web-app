// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import Login from "./Login";
// import Otp from "./Otp";
// import CreateProfile from "./CreateUser";
// import CreateInstitute from "./CreateInstitute";
// import Carousel from "./Carousel";
// import { FormType } from "@/types";
// import ForgotPassword from "./ForgotPassword";
// import CreateNewPassword from "./CreateNewPassword";
// import { FormProvider, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
// 	AuthSchema,
// 	AuthSchemaType,
// } from "../schema/createInstitute/AuthSchema"; // Adjust the path as necessary

// const HomePage: React.FC = () => {
// 	const [formType, setFormType] = useState<FormType>("login");
// 	const [formData, setFormData] = useState({
// 		email: "",
// 		phone: "",
// 	});
// 	const [userId, setUserId] = useState<string | null>(null);

// 	const methods = useForm<AuthSchemaType>({
// 		resolver: zodResolver(AuthSchema),
// 	});

// 	const handleShowOTP = (contact: { email: string; phone: string }) => {
// 		setFormType("otp");
// 	};
// 	return (
// 		<>
// 			<div className='flex justify-between'>
// 				<div className='flex justify-center relative w-1/2'>
// 					<div className='absolute h-full w-full'>
// 						<Image
// 							src='/MainBG.png'
// 							alt='Background Image'
// 							fill
// 							sizes='(max-width: 640px)'
// 							priority
// 						/>
// 					</div>
// 					<div className='h-screen flex justify-center text-white items-end text-4xl font-bold pb-10 z-50'>
// 						<Carousel formType={formType} />
// 					</div>
// 				</div>
// 				<div className='w-1/2 flex justify-center items-center'>
// 					<div>
// 						<FormProvider {...methods}>
// 							{formType === "login" && (
// 								<Login
// 									onShowOTP={handleShowOTP}
// 									setFormData={setFormData}
// 									setFormType={setFormType}
// 								/>
// 							)}
// 							{formType === "otp" && (
// 								<Otp
// 									setFormType={setFormType}
// 									onEdit={() => setFormType("login")}
// 									formData={formData}
// 								/>
// 							)}
// 							{formType === "createProfile" && (
// 								<CreateProfile
// 									setFormType={setFormType}
// 									formData={formData}
// 									setUserId={setUserId}
// 								/>
// 							)}
// 							{formType === "createInstitute" && (
// 								<CreateInstitute
// 									userId={userId}
// 									setFormType={setFormType}
// 								/>
// 							)}
// 							{formType === "forgotpassword" && (
// 								<ForgotPassword
// 									setFormType={setFormType}
// 									// formData={{
// 									// 	email: "",
// 									// }}
// 									formData={formData}
// 									setFormData={setFormData}
// 								/>
// 							)}
// 							{formType === "createnewpassword" && (
// 								<CreateNewPassword
// 									setFormType={setFormType}
// 									formData={{ email: formData.email }}
// 								/>
// 							)}
// 						</FormProvider>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// export default HomePage;
