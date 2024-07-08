"use client";
import React, { ReactElement, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import previousExperienceSchema from "@/schema/staffRegistrationSchema/previousExprienceSchemaStaff";
import { PreviousExperienceSchemaStaffType } from "@/schema/staffRegistrationSchema/previousExprienceSchemaStaff";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { RootState } from "@/context/store";

dayjs.extend(customParseFormat);

const dateFormat = "YYYY-MM-DD";

const PreviousExperience = ({
	onNext,
}: {
	onNext: (data: any) => void;
}): ReactElement => {
	const minDate = dayjs("2019-08-01", dateFormat);
	const maxDate = dayjs().endOf("day");

	const disabledDate = (current: any) => {
		return current && (current < minDate || current > maxDate);
	};

	const previousExperienceInfo = useSelector(
		(state: RootState) => state.staffRegistration.previousExperienceInfo
	);
	const form = useForm<PreviousExperienceSchemaStaffType>({
		resolver: zodResolver(previousExperienceSchema),
		defaultValues: {
			instituteName: previousExperienceInfo?.instituteName || "",
			jobTitle: previousExperienceInfo?.jobTitle || "",
			joiningDate: previousExperienceInfo?.joiningDate || "",
			relievingDate: previousExperienceInfo?.relievingDate || "",
			location: previousExperienceInfo?.location || "",
			referenceName: previousExperienceInfo?.referenceName || "",
			referenceMobileNumber:
				previousExperienceInfo?.referenceMobileNumber || "",
		},
	});
	const onSubmit = (value: PreviousExperienceSchemaStaffType) => {
		onNext(value);
		// console.log(value);
	};
	const { viewState } = useSelector((state: RootState) => state.staff);

	return (
		<div className='flex justify-center my-8'>
			<div className='w-full tracking-wide'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='grid grid-cols-3 gap-x-8 gap-y-3 text-sm'>
							<FormField
								control={form.control}
								name='instituteName'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='institute_name'
											className='pl-1 text-blue-500 font-semibold'
										>
											Institute Name
										</FormLabel>
										<FormControl>
											<Input
												id='institute_name'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Previous Institute Name'
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
								name='jobTitle'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='job_title'
											className='pl-1 text-blue-500 font-semibold'
										>
											Job Title
										</FormLabel>
										<FormControl>
											<Input
												id='job_title'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Previous Job Title'
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
								name='joiningDate'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='join_date'
											className='pl-1 text-blue-500 font-semibold'
										>
											Joining Date
										</FormLabel>
										<FormControl>
											<DatePicker
												id='join_date'
												size='small'
												className='border w-full border-gray-300 px-3 py-[12px] rounded-md text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												format={dateFormat}
												disabledDate={disabledDate}
												placeholder='Select Date'
												disabled={viewState === "view"}
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
								name='relievingDate'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='relieving_date'
											className='pl-1 text-blue-500 font-semibold'
										>
											Relieving Date
										</FormLabel>
										<FormControl>
											<DatePicker
												id='relieving_date'
												size='small'
												className='border w-full border-gray-300 px-3 py-[12px] rounded-md text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												format={dateFormat}
												disabledDate={disabledDate}
												placeholder='Select Date'
												disabled={viewState === "view"}
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
								name='location'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='location'
											className='pl-1 text-blue-500 font-semibold'
										>
											Location
										</FormLabel>
										<FormControl>
											<Input
												id='location'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Previous Institute Location'
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
								name='referenceName'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='ref_name'
											className='pl-1 text-blue-500 font-semibold'
										>
											Reference Name
										</FormLabel>
										<FormControl>
											<Input
												id='ref_name'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Reference Name'
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
								name='referenceMobileNumber'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='reference_mobile_number'
											className='pl-1 text-blue-500 font-semibold'
										>
											Reference Mobile Number{" "}
										</FormLabel>
										<FormControl>
											<div className='relative'>
												<Input
													id='reference_mobile_number'
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

export default PreviousExperience;
