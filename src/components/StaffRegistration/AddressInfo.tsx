"use client";
import React, { ReactElement, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addressSchema } from "@/schema/staffRegistrationSchema/addressSchemaStaff";
import { AddressSchemaStaffType } from "@/schema/staffRegistrationSchema/addressSchemaStaff";
import { useSelector } from "react-redux";
import { RootState } from "@/context/store";

const AddressInfo = ({
	onNext,
}: {
	onNext: (data: any) => void;
}): ReactElement => {
	const addressStaffInfo = useSelector(
		(state: RootState) => state.staffRegistration.addressInfo
	);
	const { viewState } = useSelector((state: RootState) => state.staff);

	const form = useForm<AddressSchemaStaffType>({
		resolver: zodResolver(addressSchema),
		defaultValues: {
			addressLine1: addressStaffInfo?.addressLine1 || "",
			addressLine2: addressStaffInfo?.addressLine2 || "",
			city: addressStaffInfo?.city || "",
			state: addressStaffInfo?.state || "",
			pinCode: addressStaffInfo?.pinCode || "",
			country: addressStaffInfo?.country || "",
		},
	});

	const onSubmit = (values: AddressSchemaStaffType) => {
		// console.log(values);
		onNext(values);
	};
	// const { reset } = form;
	// useEffect(() => {
	// 	reset(addressStaffInfo, {})
	// },[addressStaffInfo,reset])

	return (
		<div className='flex justify-center my-8'>
			<div className='w-full tracking-wide'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='grid grid-cols-3 gap-x-8 gap-y-3 text-sm'>
							<FormField
								control={form.control}
								name='addressLine1'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='addressLine1'
										>
											Address Line 1
										</FormLabel>
										<FormControl>
											<Input
												id='addressLine1'
												type='text'
												className=''
												placeholder='Abc near xyz'
												disabled={viewState === "view"}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='addressLine2'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='addressLine2'
										>
											Address Line 2
										</FormLabel>
										<FormControl>
											<Input
												id='addressLine2'
												type='text'
												className=''
												placeholder='Flat/House No, Landmark'
												disabled={viewState === "view"}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='city'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='cityTown'
										>
											City/Town
										</FormLabel>
										<FormControl>
											<Input
												id='cityTown'
												type='text'
												className=''
												placeholder='Mumbai'
												disabled={viewState === "view"}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='state'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='state'
										>
											State
										</FormLabel>
										<FormControl>
											<Input
												id='state'
												type='text'
												className=''
												placeholder='Maharashtra'
												disabled={viewState === "view"}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='pinCode'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='pincode'
										>
											PIN Code
										</FormLabel>
										<FormControl>
											<Input
												id='pincode'
												type='text'
												className=''
												placeholder='123456'
												disabled={viewState === "view"}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='country'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='country'
										>
											Country
										</FormLabel>
										<FormControl>
											<Input
												id='country'
												type='text'
												className=''
												placeholder='India'
												disabled={viewState === "view"}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='flex justify-center mt-8'>
							<Button
								type='submit'
								className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hidden'
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
