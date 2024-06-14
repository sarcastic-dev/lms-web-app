"use client";
import React, { ReactElement, useEffect } from "react";
import { Input } from "../ui/input";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";
import { Separator } from "../ui/separator";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import basicSchemaStaff from "@/staffRegistrationSchema/basicSchemaStaff";
import { BasicInfoSchemaStaffType } from "@/staffRegistrationSchema/basicSchemaStaff";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/context/store";

dayjs.extend(customParseFormat);

const dateFormat = "YYYY-MM-DD";

const BasicInfo = ({
	onNext,
}: {
	onNext: (data: any) => void;
}): ReactElement => {
	const basicStaffInfo = useSelector(
		(state: RootState) => state.staffRegistration.basicInfo
	);
	const minDate = dayjs("2019-08-01", dateFormat);
	const maxDate = dayjs().endOf("day");

	const disabledDate = (current: any) => {
		return current && (current < minDate || current > maxDate);
	};

	const form = useForm<BasicInfoSchemaStaffType>({
		resolver: zodResolver(basicSchemaStaff),
		defaultValues: {
			bloodGroup: basicStaffInfo?.bloodGroup || undefined,
			dateOfBirth: basicStaffInfo?.dateOfBirth || "",
			emailID: basicStaffInfo?.emailID || "",
			employeeID: basicStaffInfo?.employeeID || "",
			firstName: basicStaffInfo?.firstName || "",
			gender: basicStaffInfo?.gender || undefined,
			lastName: basicStaffInfo?.lastName || "",
			middleName: basicStaffInfo?.middleName || "",
			mobileNumber: basicStaffInfo?.mobileNumber || "",
			userRole: basicStaffInfo?.userRole || undefined,
		},
	});

	const onSubmit = (value: BasicInfoSchemaStaffType) => {
		onNext(value);
	};
	const { reset } = form;
	useEffect(() => {
		reset(basicStaffInfo || {});
	}, [basicStaffInfo, reset]);

	return (
		<div className='flex justify-center my-8'>
			<div className='w-full tracking-wide'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='grid grid-cols-3 gap-x-8 gap-y-3'>
							<FormField
								control={form.control}
								name='mobileNumber'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='student_mobile_number'
											className='pl-1 text-blue-500 font-semibold'
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
													className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 pl-10 placeholder:text-gray-400'
													placeholder='Mobile Number'
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
											htmlFor='emailID'
											className='pl-1 text-blue-500 font-semibold'
										>
											Employee Email ID
										</FormLabel>
										<FormControl>
											<Input
												id='emailID'
												type='email'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Email ID'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='employeeID'
								render={({ field }) => (
									<FormItem>
										<div className=''>
											<FormLabel
												htmlFor='employeeID'
												className='pl-1 text-blue-500 font-semibold'
											>
												Enrolment ID{" "}
												<span className='text-red-500'>
													*
												</span>
											</FormLabel>
										</div>
										<FormControl>
											<div className='relative'>
												<Input
													id='employeeID'
													type='text'
													className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 pr-28'
													placeholder='Enrollment No.'
													{...field}
												/>
												<span className='absolute right-3 top-3 flex items-center space-x-2 text-gray-500'>
													<Separator
														orientation='vertical'
														className='h-6 border-l border-gray-300'
													/>

													<TooltipProvider>
														<Tooltip>
															<TooltipTrigger
																onClick={(e) =>
																	e.preventDefault()
																}
															>
																<span>
																	@TES2097
																</span>
															</TooltipTrigger>
															<TooltipContent className='text-xs text-white bg-blue-500'>
																<p>Last Used</p>
															</TooltipContent>
														</Tooltip>
													</TooltipProvider>
												</span>
											</div>
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
											htmlFor='first_name'
											className='pl-1 text-blue-500 font-semibold'
										>
											First Name
										</FormLabel>
										<FormControl>
											<Input
												id='first_name'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='First Name'
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
											htmlFor='middle_name'
											className='pl-1 text-blue-500 font-semibold'
										>
											Middle Name
										</FormLabel>
										<FormControl>
											<Input
												id='middle_name'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Middle Name'
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
											htmlFor='last_name'
											className='pl-1 text-blue-500 font-semibold'
										>
											Last Name
										</FormLabel>
										<FormControl>
											<Input
												id='last_name'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Last Name'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='dateOfBirth'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='dob'
											className='pl-1 text-blue-500 font-semibold'
										>
											Date Of Birth
										</FormLabel>
										<FormControl>
											<DatePicker
												id='dob'
												size='large'
												className='border w-full border-gray-300 px-3 py-[12px] rounded-md text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												format={dateFormat}
												disabledDate={disabledDate}
												placeholder='Select Date'
												onChange={(date) => {
													field.onChange(
														date
															? date.format(
																	dateFormat
															  )
															: ""
													);
												}}
												value={
													field.value
														? dayjs(
																field.value,
																dateFormat
														  )
														: null
												}
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
											className='pl-1 text-blue-500 font-semibold'
										>
											Gender
										</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												value={field.value || undefined}
											>
												<SelectTrigger
													className={`border w-full border-gray-300 px-3 py-6 rounded-md text-md tracking-wider focus:to-blue-500 focus:border-blue-500 ${
														!field.value
															? "text-gray-400"
															: ""
													}`}
												>
													<SelectValue placeholder='Select Gender' />
												</SelectTrigger>
												<SelectContent className='bg-white text-md tracking-wider'>
													<SelectGroup>
														<SelectLabel>
															Gender
														</SelectLabel>
														{Gender.map(
															(option, index) => (
																<SelectItem
																	key={index}
																	value={
																		option.value
																	}
																>
																	{
																		option.option
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
											className='pl-1 text-blue-500 font-semibold'
										>
											Blood Group
										</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												value={field.value || undefined}
											>
												<SelectTrigger
													className={`border w-full border-gray-300 px-3 py-6 rounded-md text-md tracking-wider focus:to-blue-500 focus:border-blue-500 ${
														!field.value
															? "text-gray-400"
															: ""
													}`}
												>
													<SelectValue placeholder='Select Blood Group' />
												</SelectTrigger>

												<SelectContent className='bg-white text-md tracking-wider'>
													<SelectGroup>
														<SelectLabel>
															Blood Groups
														</SelectLabel>
														{BloodGroups.map(
															(option, index) => (
																<SelectItem
																	key={index}
																	value={
																		option.value
																	}
																>
																	{
																		option.option
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
								name='userRole'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='userRole'
											className='pl-1 text-blue-500 font-semibold'
										>
											Role
										</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												value={field.value || undefined}
											>
												<SelectTrigger
													className={`border w-full border-gray-300 px-3 py-6 rounded-md text-md tracking-wider focus:to-blue-500 focus:border-blue-500 ${
														!field.value
															? "text-gray-400"
															: ""
													}`}
												>
													<SelectValue placeholder='Select Role' />
												</SelectTrigger>
												<SelectContent className='bg-white text-md tracking-wider'>
													<SelectGroup>
														<SelectLabel>
															User Role
														</SelectLabel>
														<SelectItem value='User'>
															User
														</SelectItem>
														<SelectItem value='Teacher'>
															Teacher
														</SelectItem>
														<SelectItem value='Non-Teaching'>
															Non-Teacher
														</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='flex justify-center'>
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

export default BasicInfo;
