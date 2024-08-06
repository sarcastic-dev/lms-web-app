"use client";
import React, { ReactElement, useEffect, useState } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import basicSchemaStaff from "@/schema/staffRegistrationSchema/basicSchemaStaff";
import { BasicInfoSchemaStaffType } from "@/schema/staffRegistrationSchema/basicSchemaStaff";
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

const BasicInfo = ({
	onNext,
}: {
	onNext: (data: any) => void;
}): ReactElement => {
	const basicStaffInfo = useSelector(
		(state: RootState) => state.staffRegistration.basicInfo
	);
	const [hasValue, setHasValue] = useState(false);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setHasValue(event.target.value !== "");
	};
	const { viewState } = useSelector((state: RootState) => state.staff);

	const form = useForm<BasicInfoSchemaStaffType>({
		resolver: zodResolver(basicSchemaStaff),
		defaultValues: {
			bloodGroup: basicStaffInfo?.user?.bloodGroup || "",
			dob: basicStaffInfo?.user?.dob || "",
			email: basicStaffInfo?.user?.email || "",
			firstName: basicStaffInfo?.user?.firstName || "",
			gender: basicStaffInfo?.user?.gender || "",
			lastName: basicStaffInfo?.user?.lastName || "",
			middleName: basicStaffInfo?.user?.middleName || "",
			phone: basicStaffInfo?.user?.phone || "",
			role: basicStaffInfo?.user?.role || "teacher",
		},
	});

	const onSubmit = (value: BasicInfoSchemaStaffType) => {
		onNext(value);
	};

	const { reset } = form;
	useEffect(() => {
		reset(basicStaffInfo.user || {});
	}, [basicStaffInfo, reset]);

	return (
		<div className='flex justify-center my-8'>
			<div className='w-full tracking-wide'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='grid grid-cols-3 gap-x-8 gap-y-3 text-sm'>
							<FormField
								control={form.control}
								name='phone'
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor='employee_mobile_number'>
											Employee Mobile Number{" "}
											<span className='text-lmsError'>
												*
											</span>
										</FormLabel>
										<FormControl>
											<div className='relative'>
												<Input
													id='employee_mobile_number'
													type='tel'
													className='pl-11 '
													placeholder='Mobile Number'
													disabled={
														viewState === "view"
													}
													{...field}
												/>
												<span className='absolute left-3 top-[15px] flex items-center space-x-2 text-lms-700 font-semibold'>
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
									<FormItem>
										<FormLabel htmlFor='emailID'>
											Employee Email ID{" "}
											<span className='text-red-500'>
												*
											</span>
										</FormLabel>
										<FormControl>
											<Input
												id='emailID'
												type='email'
												className=''
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
										<FormLabel htmlFor='first_name'>
											First Name{" "}
											<span className='text-red-500'>
												*
											</span>
										</FormLabel>
										<FormControl>
											<Input
												id='first_name'
												type='text'
												className=''
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
										<FormLabel htmlFor='middle_name'>
											Middle Name
										</FormLabel>
										<FormControl>
											<Input
												id='middle_name'
												type='text'
												className=''
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
										<FormLabel htmlFor='last_name'>
											Last Name
										</FormLabel>
										<FormControl>
											<Input
												id='last_name'
												type='text'
												className=''
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
									<FormItem>
										<FormLabel htmlFor='dob'>
											Date Of Birth
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												id='dob'
												type='date'
												className={`custom-date-input ${
													hasValue ? "has-value" : ""
												} border tracking-wider placeholder:text-lms-400`}
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
										<FormLabel htmlFor='gender'>
											Gender
										</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												value={field.value || undefined}
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
										<FormLabel htmlFor='bloodGroup'>
											Blood Group
										</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												value={field.value || undefined}
												disabled={viewState === "view"}
											>
												<SelectTrigger
													className={`border w-ful tracking-wider ${
														!field.value
															? "text-lms-300 font-medium"
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
								name='role'
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor='userRole'>
											Role{" "}
											<span className='text-red-500'>
												*
											</span>
										</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												value={field.value || undefined}
												disabled={viewState === "view"}
											>
												<SelectTrigger
													className={`border w-ful tracking-wider ${
														!field.value
															? "text-lms-300 font-medium"
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
														<SelectItem value='owner'>
															Owner
														</SelectItem>
														<SelectItem value='teacher'>
															Teacher
														</SelectItem>
														<SelectItem value='non-teaching'>
															Non-Teaching
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
