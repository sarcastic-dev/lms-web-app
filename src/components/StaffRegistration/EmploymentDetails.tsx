import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";
import { Separator } from "../ui/separator";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Department, Designation } from "@/Constant";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import employmentSchema from "@/staffRegistrationSchema/employmentSchemaStaff";
import { EmploymentStaffSchemaType } from "@/staffRegistrationSchema/employmentSchemaStaff";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useSelector } from "react-redux";
import { RootState } from "@/context/store";

dayjs.extend(customParseFormat);

const dateFormat = "YYYY-MM-DD";

const EmploymentDetails = ({
	onNext,
}: {
	onNext: (data: any) => void;
}): ReactElement => {
	const employeeInfo = useSelector(
		(state: RootState) => state.staffRegistration.basicInfo
	);
    const form = useForm<EmploymentStaffSchemaType>({
        resolver: zodResolver(employmentSchema),
		defaultValues: {
			employeeID: employeeInfo?.staff?.employeeID || "",
            jobTitle: employeeInfo?.staff?.jobTitle || "",
            designation: (employeeInfo?.staff?.designation || "") as EmploymentStaffSchemaType["designation"],
            department: (employeeInfo?.staff?.department || "") as EmploymentStaffSchemaType["department"],
            employmentType: employeeInfo?.staff?.employmentType || "",
            appointmentDate: employeeInfo?.staff?.appointmentDate || "",
            experienceYears: employeeInfo?.staff?.experienceYears || "",
            highestQualification: employeeInfo?.staff?.highestQualification || "",
            uan: employeeInfo?.staff?.uan || "",
            pfAccountNumber: employeeInfo?.staff?.pfAccountNumber || "",
            esiCodeNumber: employeeInfo?.staff?.esiCodeNumber || "",
            reportingManager: (employeeInfo?.staff?.reportingManager || "") as EmploymentStaffSchemaType["reportingManager"],
        },
    });

	const minDate = dayjs("2019-08-01", dateFormat);
	const maxDate = dayjs().endOf("day");

	const disabledDate = (current: any) => {
		return current && (current < minDate || current > maxDate);
	};

	const onSubmit = (value: EmploymentStaffSchemaType) => {
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
												placeholder='Primary Teacher'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='employmentType'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='employment_type'
											className='pl-1 text-blue-500 font-semibold'
										>
											Employment Type
										</FormLabel>
										<FormControl>
											<Input
												id='employment_type'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Full-Time'
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
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger
													id='designation'
													className={`border border-gray-300 px-3 py-6 rounded-md text-md tracking-wider focus:to-blue-500 focus:border-blue-500 ${
														field.value
															? "text-gray-700"
															: "text-gray-400"
													}`}
												>
													<SelectValue placeholder='Select Role' />
												</SelectTrigger>
												<SelectContent className='text-gray-700'>
													{Designation.map(
														(item, index) => (
															<SelectItem
																key={index}
																value={
																	item.value
																}
															>
																{item.option}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='department'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='department'
											className='pl-1 text-blue-500 font-semibold'
										>
											Department
										</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger
													id='department'
													className={`border border-gray-300 px-3 py-6 rounded-md text-md tracking-wider focus:to-blue-500 focus:border-blue-500 ${
														field.value
															? "text-gray-700"
															: "text-gray-400"
													}`}
												>
													<SelectValue placeholder='Select Department' />
												</SelectTrigger>
												<SelectContent className='text-gray-700'>
													{Department.map(
														(item, index) => (
															<SelectItem
																key={index}
																value={
																	item.value
																}
															>
																{item.option}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='appointmentDate'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='appointmentDate'
											className='pl-1 text-blue-500 font-semibold'
										>
											Appointment Date
										</FormLabel>
										<FormControl>
											<DatePicker
												id='appointmentDate'
												size='large'
												className='border border-gray-300 px-3 py-[13px] rounded-md text-md tracking-wider focus:border-blue-500 placeholder:text-gray-400 w-full'
												format={dateFormat}
												disabledDate={disabledDate}
												placeholder='Select Date'
												{...field}
												value={
													field.value
														? dayjs(
																field.value,
																dateFormat
														  )
														: null
												}
												onChange={(date, dateString) =>
													field.onChange(dateString)
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='experienceYears'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='experience_years'
											className='pl-1 text-blue-500 font-semibold'
										>
											Experience (Years)
										</FormLabel>
										<FormControl>
											<Input
												id='experience_years'
												type='number'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='5'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='highestQualification'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='highest_qualification'
											className='pl-1 text-blue-500 font-semibold'
										>
											Highest Qualification
										</FormLabel>
										<FormControl>
											<Input
												id='highest_qualification'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='MBA'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='uan'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='uan'
											className='pl-1 text-blue-500 font-semibold'
										>
											UAN (Universal Account Number)
										</FormLabel>
										<FormControl>
											<Input
												id='uan'
												type='number'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder=''
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='pfAccountNumber'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='pf_account_number'
											className='pl-1 text-blue-500 font-semibold'
										>
											PF Account Number
										</FormLabel>
										<FormControl>
											<Input
												id='pf_account_number'
												type='number'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder=''
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='esiCodeNumber'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='esi_code_number'
											className='pl-1 text-blue-500 font-semibold'
										>
											ESI Code Number
										</FormLabel>
										<FormControl>
											<Input
												id='esi_code_number'
												type='number'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder=''
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='reportingManager'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='reporting_manager'
											className='pl-1 text-blue-500 font-semibold'
										>
											Reporting Manager
										</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger
													id='reporting_manager'
													className={`border border-gray-300 px-3 py-6 rounded-md text-md tracking-wider focus:to-blue-500 focus:border-blue-500 ${
														field.value
															? "text-gray-700"
															: "text-gray-400"
													}`}
												>
													<SelectValue placeholder='Select' />
												</SelectTrigger>
												<SelectContent className='text-gray-700'>
													<SelectItem value='owner'>
														Owner
													</SelectItem>
													<SelectItem value='teacher'>
														Teacher
													</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='flex items-center justify-end space-x-2'>
							<Button
								type='submit'
								className='mt-8 hidden'
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

export default EmploymentDetails;
