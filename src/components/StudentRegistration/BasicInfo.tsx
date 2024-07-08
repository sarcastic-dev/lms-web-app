import React, {
	ReactElement,
	FocusEvent,
	ChangeEvent,
	useState,
	useEffect,
} from "react";
import { Input } from "../ui/input";

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

dayjs.extend(customParseFormat);

const dateFormat = "YYYY-MM-DD";

const BasicInfo = ({
	onNext,
}: {
	onNext: (data: any) => void;
}): ReactElement => {
	const minDate = dayjs("2019-08-01", dateFormat);
	const maxDate = dayjs().endOf("day");

	const disabledDate = (current: any) => {
		return current && (current < minDate || current > maxDate);
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
						<div className='grid grid-cols-3 gap-x-8 gap-y-3 text-sm'>
							<FormField
								control={form.control}
								name='phone'
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
								name='email'
								render={({ field }) => (
									<FormItem className=''>
										<FormLabel
											htmlFor='email'
											className='pl-1 text-blue-500 font-semibold'
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
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
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
											className='pl-1 text-blue-500 font-semibold'
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
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
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
											className='pl-1 text-blue-500 font-semibold'
										>
											Middle Name
										</FormLabel>
										<FormControl>
											<Input
												id='middleName'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
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
											className='pl-1 text-blue-500 font-semibold'
										>
											Last Name
										</FormLabel>
										<FormControl>
											<Input
												id='lastName'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
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
											className='pl-1 text-blue-500 font-semibold '
										>
											Date of Birth{" "}
										</FormLabel>
										<FormControl>
											<DatePicker
												id='dateOfBirth'
												size='small'
												className='border w-full border-gray-300 px-3 py-[12px] rounded-md text-md tracking-wider focus:to-blue-500 focus:border-blue-500 text-foreground placeholder:text-gray-400'
												format={dateFormat}
												disabledDate={disabledDate}
												disabled={viewState === "view"}
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
											Gender{" "}
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
											className='pl-1 text-blue-500 font-semibold'
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
													className={`border w-full border-gray-300 px-3 py-6 rounded-md text-md tracking-wider focus:to-blue-500 focus:border-blue-500 ${
														!field.value
															? "text-gray-400"
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
