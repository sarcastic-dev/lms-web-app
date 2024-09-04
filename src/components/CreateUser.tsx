"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axiosInstance";
import { useState } from "react";
import { FormType } from "@/types";
import { showToast } from "@/utils/toastHelper";
import { upperFirst } from "lodash";
import { CircleX } from "lucide-react";

const formSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	phone: z.string().min(10, "Phone number must be at least 10 characters"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

interface CreateProfileProps {
	formData: {
		email: string;
		phone: string;
	};
	setFormType: (type: FormType) => void;
	setUserId: (id: string) => void;
}

const CreateProfile: React.FC<CreateProfileProps> = ({
	formData,
	setFormType,
	setUserId,
}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: formData.email,
			phone: formData.phone,
			password: "",
		},
	});

	const [isCreating, setIsCreating] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const parseName = (name: string) => {
		const nameParts = name.trim().split(" ");
		const parsedName: {
			firstName: string;
			middleName?: string;
			lastName?: string;
		} = { firstName: nameParts[0] };

		if (nameParts.length === 2) {
			parsedName.lastName = nameParts[1];
		} else if (nameParts.length >= 3) {
			parsedName.middleName = nameParts.slice(1, -1).join(" ");
			parsedName.lastName = nameParts[nameParts.length - 1];
		}
		return parsedName;
	};

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const example = parseName(values.name);
		try {
			const response = await axiosInstance.post("/users", {
				...example,
				email: values.email,
				phone: values.phone,
				password: values.password,
				role: "admin",
			});
			const userId = response.data.id;
			console.log("Form submitted:", response);
			setUserId(userId);
			setTimeout(() => {
				setIsCreating(false);
			}, 2000);
			setFormType("createInstitute");
			showToast("success", "User create successfully");
		} catch (error: any) {
			// console.error(error.response.data.error);
			// showToast("error", error.response.data.error);
			setErrorMessage(error.response.data.error);
			setIsCreating(false);
		}

		console.log(example);
		console.log(values);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='bg-white p-8 sm:w-[320px] md:w-[380px] lg:w-[466px] h-5/6 z-10 space-y-5'
			>
				<h1 className='text-2xl text-start text-[#07254A] font-bold mb-3'>
					Account Details
				</h1>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-sm text-[#07254A]'>
								Name
							</FormLabel>
							<FormControl>
								<Input
									className='rounded'
									placeholder='Enter Name'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-sm text-[#07254A]'>
								Email ID
							</FormLabel>
							<FormControl>
								<Input
									className='rounded'
									placeholder='Enter Email ID'
									{...field}
									readOnly
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='phone'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-sm text-[#07254A]'>
								Mobile No.
							</FormLabel>
							<FormControl>
								<Input
									className='rounded'
									placeholder='Mobile No.'
									{...field}
									// readOnly
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-sm text-[#07254A]'>
								Password
							</FormLabel>
							<FormControl>
								<Input
									className='rounded'
									type='password'
									placeholder='Enter Password'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					variant={"lmsActive"}
					className='w-full'
					type='submit'
				>
					{isCreating ? "Creating..." : "Create Account"}
				</Button>

				{errorMessage && (
					<div className='bg-red-200 text-lmsError h-10 px-3 w-full mt-5 rounded flex items-center gap-2 text-sm'>
						<CircleX size={20} /> {upperFirst(errorMessage)}
					</div>
				)}
			</form>
		</Form>
	);
};

export default CreateProfile;
