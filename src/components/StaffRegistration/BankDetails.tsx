import React, { useEffect } from "react";
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
import bankDetailsSchema from "@/staffRegistrationSchema/bankDetailsSchemaStaff";
import { BankDetailsSchemaType } from "@/staffRegistrationSchema/bankDetailsSchemaStaff";
import { useSelector } from "react-redux";
import { RootState } from "@/context/store";

const BankDetails = ({ onNext }: { onNext: (data: any) => void }) => {
	const bankDetails = useSelector(
		(state: RootState) => state.staffRegistration.bankDetails
	);

	const form = useForm<BankDetailsSchemaType>({
		resolver: zodResolver(bankDetailsSchema),
		defaultValues: {
			bankName: bankDetails?.bankName || "",
			accountNo: bankDetails?.accountNo || "",
			ifscCode: bankDetails?.ifscCode || "",
			holderName: bankDetails?.holderName || "",
		},
	});

	const { reset } = form;
	useEffect(() => {
		reset({
			bankName: bankDetails?.bankName || "",
			accountNo: bankDetails?.accountNo || "",
			ifscCode: bankDetails?.ifscCode || "",
			holderName: bankDetails?.holderName || "",
		});
	}, [bankDetails, reset]);

	const onSubmit = (value: BankDetailsSchemaType) => {
		onNext(value);
		// console.log(value);
	};

	return (
		<div className='flex justify-center my-8'>
			<div className='w-full tracking-wide'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='grid grid-cols-3 gap-x-8 gap-y-3 text-sm'>
							<FormField
								control={form.control}
								name='bankName'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='bank_name'
											className='pl-1 text-blue-500 font-semibold'
										>
											Bank Name
										</FormLabel>
										<FormControl>
											<Input
												id='bank_name'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='ABC Bank'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='accountNo'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='account_no'
											className='pl-1 text-blue-500 font-semibold'
										>
											Bank Account Number
										</FormLabel>
										<FormControl>
											<Input
												id='account_no'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='9898 98XXXX 98XXXX'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='ifscCode'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='ifsc_code'
											className='pl-1 text-blue-500 font-semibold'
										>
											IFSC Code
										</FormLabel>
										<FormControl>
											<Input
												id='ifsc_code'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='ABC0909021'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='holderName'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='holder_name'
											className='pl-1 text-blue-500 font-semibold'
										>
											Account Holder&apos;s Name
										</FormLabel>
										<FormControl>
											<Input
												id='holder_name'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='John Doe'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='flex items-center justify-end space-x-2'>
							<Button type='submit' className='mt-8 hidden'>
								Next
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default BankDetails;
