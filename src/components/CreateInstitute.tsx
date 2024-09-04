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
import { Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { showToast } from "@/utils/toastHelper";
import { FormType } from "@/types";

interface CreateInstituteProps {
	userId: string | null;
	setFormType: (type: FormType) => void;
}

const CreateInstitute: React.FC<CreateInstituteProps> = ({
	userId,
	setFormType,
}) => {
	const methods = useForm<InstituteSchema>({
		resolver: zodResolver(instituteSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			address: "",
			city: "",
			type: "",
			boardUniversity: "",
		},
	});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isCreating, setIsCreating] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const subscription = methods.watch((value) => {
			const isValid = instituteSchema.safeParse(value).success;
		});
		return () => subscription.unsubscribe();
	}, [methods]);

	const validateForm = () => {
		const result = instituteSchema.safeParse(methods.getValues());
		if (!result.success) {
			const newErrors: Record<string, string> = {};
			result.error.errors.forEach(
				(err: { path: string | any[]; message: string }) => {
					if (err.path.length > 0) {
						const field = err.path[0];
						newErrors[field as string] = err.message;
					}
				}
			);
			setErrors(newErrors);
			return false;
		}
		setErrors({});
		return true;
	};

	const onSubmit = async (data: InstituteSchema) => {
		if (validateForm()) {
			setIsCreating(true);

			console.log("userId used in onSubmit:", userId);

			try {
				if (userId) {
					try {
						const response = await axiosInstance.post(
							"/institutes",
							{
								...data,
								userId,
							}
						);
						console.log("Institute created:", response.data);

						await axiosInstance.put(`/users/${userId}`, {
							instituteId: response.data.id,
						});
						console.log("User updated with instituteId");
						showToast("success", "Institute Create Successfully");
						setFormType("login");
					} catch (error: any) {
						console.error("Error creating institute:", error);
						showToast("error", error.message);
					}
				} else {
					console.error("userId is null");
					showToast("error", "userId is nul");
				}

				setTimeout(() => {
					setIsCreating(false);
					router.push("/");
				}, 2000);
			} catch (error: any) {
				console.error("Error creating institute:", error);
				if (error.response) {
					console.error("Response data:", error.response.data);
					showToast("error", error.response.data);
					setErrors({
						general:
							"Failed to create institute. Please check the provided information.",
					});
				} else {
					console.error("Error message:", error.message);
					setErrors({
						general:
							"Failed to create institute. Please try again later.",
					});
				}
				setIsCreating(false);
			}
		}
	};

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onSubmit)}
				className='bg-white sm:w-[320px] md:w-[380px] lg:w-[466px] z-10'
			>
				<h1 className='text-2xl text-start text-lmsPrimary font-bold mb-2'>
					Create Institute
				</h1>

				<FormField
					control={methods.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel className=''>Institute Name</FormLabel>
							<FormControl>
								<Input
									className=''
									placeholder='Institute Name'
									{...field}
								/>
							</FormControl>
							<FormMessage className='text-[10px]' />
						</FormItem>
					)}
				/>

				<FormField
					control={methods.control}
					name='type'
					render={({ field }) => (
						<FormItem className='mt-2'>
							<FormLabel className=''>Institute Type</FormLabel>
							<FormControl>
								<Select
									value={field.value}
									onValueChange={field.onChange}
								>
									<SelectTrigger
										className={`border w-full tracking-wider ${
											!field.value
												? "text-lms-300 font-medium"
												: ""
										}`}
									>
										<SelectValue placeholder='Select Institute Type' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='School'>
											School
										</SelectItem>
										<SelectItem value='College'>
											College
										</SelectItem>
										<SelectItem value='Tuition'>
											Tuition
										</SelectItem>
										<SelectItem value='Others'>
											Others
										</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage className='text-[10px]' />
						</FormItem>
					)}
				/>

				<FormField
					control={methods.control}
					name='boardUniversity'
					render={({ field }) => (
						<FormItem className='mt-2'>
							<FormLabel className='text-xs text-[#07254A]'>
								Academic Board
							</FormLabel>
							<FormControl>
								<Select
									value={field.value}
									onValueChange={field.onChange}
								>
									<SelectTrigger
										className={`border w-full tracking-wider ${
											!field.value
												? "text-lms-300 font-medium"
												: ""
										}`}
									>
										<SelectValue placeholder='Select Academic Board' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='CBSE'>
											CBSE
										</SelectItem>
										<SelectItem value='ICSE'>
											ICSE
										</SelectItem>
										<SelectItem value='State Board'>
											State Board
										</SelectItem>
										<SelectItem value='IB'>IB</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage className='text-[10px]' />
						</FormItem>
					)}
				/>

				<FormField
					control={methods.control}
					name='email'
					render={({ field }) => (
						<FormItem className='mt-2'>
							<FormLabel className=''>Email Address</FormLabel>
							<FormControl>
								<Input
									className=''
									placeholder='Email Address'
									{...field}
								/>
							</FormControl>
							<FormMessage className='text-[10px]' />
						</FormItem>
					)}
				/>

				<FormField
					control={methods.control}
					name='phone'
					render={({ field }) => (
						<FormItem className='mt-2'>
							<FormLabel className=''>Phone Number</FormLabel>
							<FormControl>
								<Input
									className=''
									placeholder='Phone Number'
									{...field}
								/>
							</FormControl>
							<FormMessage className='text-[10px]' />
						</FormItem>
					)}
				/>

				<FormField
					control={methods.control}
					name='address'
					render={({ field }) => (
						<FormItem className='mt-2'>
							<FormLabel className=''>
								Institute Address
							</FormLabel>
							<FormControl>
								<Input
									className=''
									placeholder='Institute Address'
									{...field}
								/>
							</FormControl>
							<FormMessage className='text-[10px]' />
						</FormItem>
					)}
				/>

				<FormField
					control={methods.control}
					name='city'
					render={({ field }) => (
						<FormItem className='mt-2'>
							<FormLabel className=''>City</FormLabel>
							<FormControl>
								<Select
									value={field.value}
									onValueChange={field.onChange}
								>
									<SelectTrigger
										className={`border w-full tracking-wider ${
											!field.value
												? "text-lms-300 font-medium"
												: ""
										}`}
									>
										<SelectValue placeholder='Select City' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='Firozabad'>
											Firozabad
										</SelectItem>
										<SelectItem value='New Delhi'>
											New Delhi
										</SelectItem>
										<SelectItem value='Gurugram'>
											Gurugram
										</SelectItem>
										<SelectItem value='Bangalore'>
											Bangalore
										</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage className='text-[10px]' />
						</FormItem>
					)}
				/>

				<Button
					className='w-full mt-4'
					type='submit'
				>
					{isCreating ? "Creating Institute..." : "Create Institute"}
				</Button>
			</form>
		</FormProvider>
	);
};

export default CreateInstitute;
