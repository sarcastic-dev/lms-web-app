import React, { ReactElement, useState, useEffect } from "react";
import { Input } from "../ui/input";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { BloodGroups, Gender } from "@/Constant";
import { useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	BasicInfoSchema,
	BasicInfoSchemaType,
} from "@/schema/studentFormSchema/basicInfoSchema";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { RootState } from "@/context/store";

const BasicInfo = ({
	onNext,
}: {
	onNext: (data: any) => void;
}): ReactElement => {
	const [hasValue, setHasValue] = useState(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setHasValue(event.target.value !== "");
	};

	const basicInfo = useSelector(
		(state: RootState) => state.studentRegistration.basicInfo
	);

	const form = useForm<BasicInfoSchemaType>({
		resolver: zodResolver(BasicInfoSchema),
		defaultValues: {
			bloodGroup: basicInfo?.user?.bloodGroup || "",
			dob: basicInfo?.user?.dob || "",
			email: basicInfo?.user?.email || "",
			firstName: basicInfo?.user?.firstName || "",
			gender: basicInfo?.user?.gender || "",
			lastName: basicInfo?.user?.lastName || "",
			middleName: basicInfo?.user?.middleName || "",
			phone: basicInfo?.user?.phone || "",
			role: basicInfo?.user?.role || "student",
		},
	});

	const onSubmit = (value: BasicInfoSchemaType) => {
		onNext(value);
	};
	const { viewState } = useSelector((state: RootState) => state.student);

	const { reset } = form;

	useEffect(() => {
		reset(basicInfo?.user || {});
	}, [basicInfo, reset]);
	return (
		<div className='flex justify-center my-4'>
			<div className='w-full tracking-wide'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='grid grid-cols-3 xl:gap-x-8 xl:gap-y-5 lg:gap-x-3 lg:gap-y-3 text-sm'>
							<FormField
								control={form.control}
								name='phone'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='student_mobile_number'
											className='pl-1'
										>
											Student Mobile Number{" "}
											<span className='text-red-500'>
												*
											</span>
										</FormLabel>
										<FormControl>
											<div className='relative'>
												<Input
													id='student_mobile_number'
													type='tel'
													className='border tracking-wide'
													placeholder='Mobile Number'
													disabled={
														viewState === "view"
													}
													{...field}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem className=''>
										<FormLabel
											htmlFor='email'
											className='pl-1'
										>
											Email{" "}
											<span className='text-red-500'>
												*
											</span>
										</FormLabel>
										<FormControl>
											<Input
												id='email'
												type='email'
												className='border tracking-wider'
												placeholder='Email ID'
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
								name='firstName'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='firstName'
											className='pl-1'
										>
											First Name{" "}
											<span className='text-red-500'>
												*
											</span>
										</FormLabel>
										<FormControl>
											<Input
												id='firstName'
												type='text'
												className='border tracking-wider'
												placeholder='First Name'
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
								name='middleName'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='middleName'
											className='pl-1'
										>
											Middle Name
										</FormLabel>
										<FormControl>
											<Input
												id='middleName'
												type='text'
												className='border tracking-wider'
												placeholder='Middle Name'
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
								name='lastName'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='lastName'
											className='pl-1'
										>
											Last Name
										</FormLabel>
										<FormControl>
											<Input
												id='lastName'
												type='text'
												className='border tracking-wider'
												placeholder='Last Name'
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
								name='dob'
								render={({ field }) => (
									<FormItem className=''>
										<FormLabel
											htmlFor='dateOfBirth'
											className='pl-1'
										>
											Date of Birth
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												id='dateOfBirth'
												type='date'
												className={`custom-date-input ${
													hasValue ? "has-value" : ""
												} border tracking-wider placeholder:text-gray-400`}
												disabled={viewState === "view"}
												placeholder='dd/mm/yyyy'
												onClick={(
													e: React.MouseEvent<HTMLInputElement>
												) =>
													e.currentTarget.showPicker()
												}
												onChange={(e) => {
													handleChange(e);
													field.onChange(e);
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='gender'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='gender'
											className='pl-1'
										>
											Gender{" "}
										</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												value={field.value}
												disabled={viewState === "view"}
											>
												<SelectTrigger
													className={`border w-ful tracking-wider ${
														!field.value
															? "text-lms-300 font-medium"
															: ""
													}`}
												>
													<SelectValue placeholder='Select Gender' />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>
															Gender
														</SelectLabel>
														{Gender.map(
															(item, index) => (
																<SelectItem
																	key={index}
																	value={
																		item.value
																	}
																>
																	{
																		item.option
																	}
																</SelectItem>
															)
														)}
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
								name='bloodGroup'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='bloodGroup'
											className='pl-1'
										>
											Blood Group
										</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												value={field.value}
												disabled={viewState === "view"}
											>
												<SelectTrigger
													className={`border w-ful tracking-wider  ${
														!field.value
															? "text-lms-300 font-medium"
															: ""
													}`}
												>
													<SelectValue placeholder='Select Blood Group' />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>
															Blood Groups
														</SelectLabel>
														{BloodGroups.map(
															(item, index) => (
																<SelectItem
																	key={index}
																	value={
																		item.value
																	}
																>
																	{
																		item.option
																	}
																</SelectItem>
															)
														)}
													</SelectGroup>
												</SelectContent>
											</Select>
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

export default BasicInfo;
