import React, { ChangeEvent, FocusEvent, ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "../ui/label";
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
import { generalInfoSchema } from "@/studentFormSchema/guardianInfoSchema";

type GeneralInfoSchemaType = z.infer<typeof generalInfoSchema>;

const GuardianInfo = ({ onNext }: { onNext: (data: any) => void }):ReactElement => {
	const [inputValue, setInputValue] = useState("+91 ");

	const handleFocus = (event: FocusEvent<HTMLInputElement>): void => {
		const input = event.target;
		if (input.value === "+91 ") {
			input.setSelectionRange(4, 4);
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const input = event.target;
		if (!input.value.startsWith("+91 ")) {
			setInputValue("+91 " + input.value.slice(4));
		} else {
			setInputValue(input.value);
		}
	};

	const form = useForm<GeneralInfoSchemaType>({
		resolver: zodResolver(generalInfoSchema),
		defaultValues: {
			name: "",
			mobileNumber: "",
			emailID: "",
			relationship: "",
			educationalQualification: "",
			occupation: "",
			workOrganizationName: "",
			designation: "",
			annualIncome: "",
		},
	});

	const onSubmit = (values: GeneralInfoSchemaType) => {
		onNext(values);
	};

	return (
		<div className='flex justify-center my-8'>
			<div className='w-3/4 tracking-wide'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='grid grid-cols-3 gap-x-8 gap-y-3'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='guardian_name'
											className='pl-1 text-blue-500 font-semibold'
										>
											Guardian Name
										</FormLabel>
										<FormControl>
											<Input
												id='guardian_name'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='James'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='mobileNumber'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='guardian_mobile_number'
											className='pl-1 text-blue-500 font-semibold'
										>
											Guardian Mobile Number
										</FormLabel>
										<FormControl>
											<div className='relative'>
												<Input
													id='guardian_mobile_number'
													type='tel'
													className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 pl-10 placeholder:text-gray-400'
													placeholder="Mobile Number"
													{...field}
												/>
												<span className='absolute left-3.5 top-[13.5px] flex items-center space-x-2 text-gray-500'>
													<span>+91</span>
												</span>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='emailID'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='guardian_email'
											className='pl-1 text-blue-500 font-semibold'
										>
											Guardian Email ID
										</FormLabel>
										<FormControl>
											<Input
												id='guardian_email'
												type='email'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='guardians@gmail.com'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='relationship'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='relationship'
											className='pl-1 text-blue-500 font-semibold'
										>
											Relationship
										</FormLabel>
										<FormControl>
											<Input
												id='relationship'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Uncle/Aunt'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='educationalQualification'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='educational_qualification'
											className='pl-1 text-blue-500 font-semibold'
										>
											Educational Qualification
										</FormLabel>
										<FormControl>
											<Input
												id='educational_qualification'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Ex. MBBS'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='occupation'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='occupation'
											className='pl-1 text-blue-500 font-semibold'
										>
											Occupation
										</FormLabel>
										<FormControl>
											<Input
												id='occupation'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Ex. Doctor'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='workOrganizationName'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='work_organization_name'
											className='pl-1 text-blue-500 font-semibold'
										>
											Work Organization Name
										</FormLabel>
										<FormControl>
											<Input
												id='work_organization_name'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Ex. Government Hospital'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='designation'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='designation'
											className='pl-1 text-blue-500 font-semibold'
										>
											Designation
										</FormLabel>
										<FormControl>
											<Input
												id='designation'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Ex. CMO'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='annualIncome'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='annual_income'
											className='pl-1 text-blue-500 font-semibold'
										>
											Annual Income{" "}
											<span className='text-red-500'>
												*
											</span>
										</FormLabel>
										<FormControl>
											<Input
												id='annual_income'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Ex. 50XXXX'
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
export default GuardianInfo;
