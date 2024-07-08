import React, { ReactElement, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { parentInfoSchema } from "@/schema/studentFormSchema/parentInfoSchema";
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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

type ParentInfoSchemaType = z.infer<typeof parentInfoSchema>;

const ParentInfo = ({
	onNext,
}: {
	onNext: (data: any) => void;
}): ReactElement => {
	const parentInfoStudent = useSelector(
		(state: RootState) => state.studentRegistration.parentInfo
	);
	const { viewState } = useSelector((state: RootState) => state.student);

	const form = useForm<ParentInfoSchemaType>({
		resolver: zodResolver(parentInfoSchema),
		defaultValues: {
			name: parentInfoStudent?.name || "",
			relation: parentInfoStudent?.relation || "",
			email: parentInfoStudent?.email || "",
			phone: parentInfoStudent?.phone || "",
			qualification: parentInfoStudent?.qualification || "",
			occupation: parentInfoStudent?.occupation || "",
			workOrganizationName: parentInfoStudent?.workOrganizationName || "",
			designation: parentInfoStudent?.designation || "",
			annualIncome: parentInfoStudent?.annualIncome || "",
		},
	});

	const onSubmit = (values: ParentInfoSchemaType) => {
		onNext(values);
	};

	const { reset } = form;
	useEffect(() => {
		reset(parentInfoStudent || {});
	}, [parentInfoStudent, reset]);

	return (
		<div className='flex justify-center my-8'>
			<div className='w-full tracking-wide'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='grid grid-cols-3 gap-x-8 gap-y-3 text-sm'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='parent_name'
											className='pl-1 text-blue-500 font-semibold'
										>
											Parent Name
										</FormLabel>
										<FormControl>
											<Input
												id='parent_name'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='John Doe'
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
								name='relation'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='bloodGroup'
											className='pl-1 text-blue-500 font-semibold'
										>
											Relation
										</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												value={field.value}
												disabled={viewState === "view"}
											>
												<SelectTrigger
													className={`border w-full border-gray-300 px-3 py-6 rounded-md text-md tracking-wider focus:to-blue-500 focus:border-blue-500 ${
														!field.value
															? "text-gray-400"
															: ""
													}`}
												>
													<SelectValue placeholder='Select Relation' />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>
															Relations
														</SelectLabel>
														<SelectItem value='Father'>
															Father
														</SelectItem>
														<SelectItem value='Mother'>
															Mother
														</SelectItem>
														<SelectItem value='Guardian'>
															Guardian
														</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
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
										<FormLabel
											htmlFor='parent_email'
											className='pl-1 text-blue-500 font-semibold'
										>
											Parent Email ID
										</FormLabel>
										<FormControl>
											<Input
												id='parent_email'
												type='email'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='parent@gmail.com'
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
								name='phone'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='parent_phone'
											className='pl-1 text-blue-500 font-semibold'
										>
											Parent Phone Number
										</FormLabel>
										<FormControl>
											<div className='relative'>
												<Input
													id='parent_phone'
													type='tel'
													className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 pl-10 placeholder:text-gray-400'
													placeholder='Mobile Number'
													disabled={
														viewState === "view"
													}
													{...field}
												/>
												<span className='absolute left-3 top-[15px] flex items-center space-x-2 text-gray-500'>
													<span>+91-</span>
												</span>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='qualification'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='parent_qualification'
											className='pl-1 text-blue-500 font-semibold'
										>
											Parent Qualification
										</FormLabel>
										<FormControl>
											<Input
												id='parent_qualification'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Ex. MBBS'
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
								name='occupation'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='parent_occupation'
											className='pl-1 text-blue-500 font-semibold'
										>
											Parent Occupation
										</FormLabel>
										<FormControl>
											<Input
												id='parent_occupation'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Ex. Doctor'
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
								name='workOrganizationName'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='work_organization'
											className='pl-1 text-blue-500 font-semibold'
										>
											Work Organization Name
										</FormLabel>
										<FormControl>
											<Input
												id='work_organization'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Ex. Government Hospital'
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
								name='annualIncome'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='annual_income'
											className='pl-1 text-blue-500 font-semibold'
										>
											Annual Income
										</FormLabel>
										<FormControl>
											<Input
												id='annual_income'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Ex. 50XXXX'
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

export default ParentInfo;
