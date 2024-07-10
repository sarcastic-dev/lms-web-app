import React, { ReactElement, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addressSchema } from "@/schema/studentFormSchema/addressInfoSchema";
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
	const { viewState } = useSelector((state: RootState) => state.student);

	const { reset } = form;

	useEffect(() => {
		reset(addressInfoStudent || {});
	}, [addressInfoStudent, reset]);

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
											className='pl-1 text-blue-500 font-semibold'
										>
											Address Line 1{" "}
										</FormLabel>
										<FormControl>
											<Input
												id='addressLine1'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Address Line 1'
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
											className='pl-1 text-blue-500 font-semibold'
										>
											City/Town{" "}
										</FormLabel>
										<FormControl>
											<Input
												id='cityTown'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:border-blue-500 placeholder:text-gray-400'
												placeholder='City/Town'
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
											className='pl-1 text-blue-500 font-semibold'
										>
											State{" "}
										</FormLabel>
										<FormControl>
											<Input
												id='state'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:border-blue-500 placeholder:text-gray-400'
												placeholder='State'
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
											className='pl-1 text-blue-500 font-semibold'
										>
											Country{" "}
										</FormLabel>
										<FormControl>
											<Input
												id='country'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Country'
												disabled={viewState === "view"}
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
