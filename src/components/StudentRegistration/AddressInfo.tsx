import React, { ReactElement, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addressSchema } from "@/studentFormSchema/addressInfoSchema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useSelector } from "react-redux";
import { RootState } from "@/context/store";

type AddressInfoSchemaType = z.infer<typeof addressSchema>;

const AddressInfoForm = ({
	onNext,
}: {
	onNext: (data: any) => void;
}): ReactElement => {
	const addressInfoStudent = useSelector(
		(state: RootState) => state.studentRegistration.addressInfo
	);
	const form = useForm<AddressInfoSchemaType>({
		resolver: zodResolver(addressSchema),
		defaultValues: addressInfoStudent || {},
	});

	const onSubmit = (values: AddressInfoSchemaType) => {
		onNext(values);
	};

	const { reset } = form;

	useEffect(() => {
		reset(addressInfoStudent || {});
	}, [addressInfoStudent, reset]);

	return (
		<div className='flex justify-center my-8'>
			<div className='w-full tracking-wide'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='grid grid-cols-3 gap-x-8 gap-y-3'>
							<FormField
								control={form.control}
								name='addressLine1'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='addressLine1'
											className='pl-1 text-blue-500 font-semibold'
										>
											Address Line 1{" "}
											<span className='text-red-500'>
												*
											</span>
										</FormLabel>
										<FormControl>
											<Input
												id='addressLine1'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Address Line 1'
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
											className='pl-1 text-blue-500 font-semibold'
										>
											Address Line 2
										</FormLabel>
										<FormControl>
											<Input
												id='addressLine2'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Address Line 2'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='cityTown'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='cityTown'
											className='pl-1 text-blue-500 font-semibold'
										>
											City/Town{" "}
											<span className='text-red-500'>
												*
											</span>
										</FormLabel>
										<FormControl>
											<Input
												id='cityTown'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:border-blue-500 placeholder:text-gray-400'
												placeholder='City/Town'
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
											className='pl-1 text-blue-500 font-semibold'
										>
											State{" "}
											<span className='text-red-500'>
												*
											</span>
										</FormLabel>
										<FormControl>
											<Input
												id='state'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:border-blue-500 placeholder:text-gray-400'
												placeholder='State'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='pincode'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='pincode'
											className='pl-1 text-blue-500 font-semibold'
										>
											PIN Code
										</FormLabel>
										<FormControl>
											<Input
												id='pincode'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:border-blue-500 placeholder:text-gray-400'
												placeholder='PIN Code'
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
											className='pl-1 text-blue-500 font-semibold'
										>
											Country{" "}
											<span className='text-red-500'>
												*
											</span>
										</FormLabel>
										<FormControl>
											<Input
												id='country'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Country'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button
							type='submit'
							className='mt-4 hidden'
						>
							Submit
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default AddressInfoForm;
