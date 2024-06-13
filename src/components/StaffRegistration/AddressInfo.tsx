"use client";
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addressSchema } from "@/staffRegistrationSchema/addressSchemaStaff";
import { AddressSchemaStaffType } from "@/staffRegistrationSchema/addressSchemaStaff";

const AddressInfo = ({ onNext }: { onNext: (data: any) => void; }): ReactElement => {
	const form = useForm<AddressSchemaStaffType>({
		resolver: zodResolver(addressSchema),
		defaultValues: {
			addressLine1: "",
			addressLine2: "",
			cityTown: "",
			state: "",
			pincode: "",
			country: "",
		},
	});

	const onSubmit = (values: AddressSchemaStaffType) => {
		// console.log(values);
		onNext(values);
	};

	return (
		<div className='flex justify-center my-8'>
			<div className='w-full tracking-wide'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='grid grid-cols-3 gap-x-8 gap-y-3'>
							<FormField
								control={form.control}
								name="addressLine1"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="addressLine1" className='pl-1 text-blue-500 font-semibold'>
											Address Line 1
										</FormLabel>
										<FormControl>
											<Input
												id="addressLine1"
												type="text"
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Abc near xyz'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="addressLine2"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="addressLine2" className='pl-1 text-blue-500 font-semibold'>
											Address Line 2
										</FormLabel>
										<FormControl>
											<Input
												id="addressLine2"
												type="text"
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Flat/House No, Landmark'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="cityTown"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="cityTown" className='pl-1 text-blue-500 font-semibold'>
											City/Town
										</FormLabel>
										<FormControl>
											<Input
												id="cityTown"
												type="text"
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Mumbai'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="state"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="state" className='pl-1 text-blue-500 font-semibold'>
											State
										</FormLabel>
										<FormControl>
											<Input
												id="state"
												type="text"
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Maharashtra'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="pincode"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="pincode" className='pl-1 text-blue-500 font-semibold'>
											PIN Code
										</FormLabel>
										<FormControl>
											<Input
												id="pincode"
												type="text"
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='123456'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="country"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="country" className='pl-1 text-blue-500 font-semibold'>
											Country
										</FormLabel>
										<FormControl>
											<Input
												id="country"
												type="text"
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='India'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex justify-center mt-8">
							<Button
								type="submit"
								className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
							>
								Next
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default AddressInfo;
