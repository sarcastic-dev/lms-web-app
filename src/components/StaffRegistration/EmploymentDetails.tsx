import React, { ReactElement, useState } from "react";
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
	SelectGroup,
	SelectItem,
	SelectLabel,
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
import employmentSchema from "@/schema/staffRegistrationSchema/employmentSchemaStaff";
import { EmploymentStaffSchemaType } from "@/schema/staffRegistrationSchema/employmentSchemaStaff";
import { useSelector } from "react-redux";
import { RootState } from "@/context/store";

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
			employeeId: employeeInfo?.staff?.employeeId || "",
			jobTitle: employeeInfo?.staff?.jobTitle || "",
			designation: (employeeInfo?.staff?.designation ||
				"") as EmploymentStaffSchemaType["designation"],
			department: (employeeInfo?.staff?.department ||
				"") as EmploymentStaffSchemaType["department"],
			employmentType: employeeInfo?.staff?.employmentType || "",
			appointmentDate: employeeInfo?.staff?.appointmentDate || "",
			experienceYears: employeeInfo?.staff?.experienceYears || "",
			highestQualification:
				employeeInfo?.staff?.highestQualification || "",
			uan: employeeInfo?.staff?.uan || "",
			pfAccountNumber: employeeInfo?.staff?.pfAccountNumber || "",
			esiCodeNumber: employeeInfo?.staff?.esiCodeNumber || "",
			reportingManager: (employeeInfo?.staff?.reportingManager ||
				"") as EmploymentStaffSchemaType["reportingManager"],
		},
	});

	const [hasValue, setHasValue] = useState(false);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setHasValue(event.target.value !== "");
	};

	const onSubmit = (value: EmploymentStaffSchemaType) => {
		onNext(value);
	};
	// const { staffData } = useSelector((state: RootState) => state.staff);

	const { viewState } = useSelector((state: RootState) => state.staff);

	return (
		<div className='flex justify-center my-8'>
			<div className='w-full tracking-wide'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='grid grid-cols-3 gap-x-8 gap-y-3 text-sm'>
							<FormField
								control={form.control}
								name='employeeId'
								render={({ field }) => (
									<FormItem>
										<div className=''>
											<FormLabel
												htmlFor='employeeID'
	
											>
												Employee ID{" "}
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
													className='pr-28'
													placeholder='Employee ID'
													disabled={
														viewState === "view"
													}
													{...field}
												/>
												<span className='absolute right-3 top-3 flex items-center space-x-2 text-lms-500'>
													<Separator
														orientation='vertical'
														className='h-6 border-l border-lmsSecondary'
													/>

													<TooltipProvider>
														<Tooltip>
															<TooltipTrigger
																onClick={(e) =>
																	e.preventDefault()
																}
															>
																<span className='text-lmsSecondary'>
																	@TES2097
																</span>
															</TooltipTrigger>
															<TooltipContent className='text-xs text-white bg-lmsSecondary'>
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

										>
											Job Title
										</FormLabel>
										<FormControl>
											<Input
												id='job_title'
												type='text'
												className=''
												placeholder='Primary Teacher'
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
								name='employmentType'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='employment_type'

										>
											Employment Type
										</FormLabel>
										<FormControl>
											<Input
												id='employment_type'
												type='text'
												className=''
												placeholder='Full-Time'
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

										>
											Designation
										</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
												disabled={viewState === "view"}
											>
												<SelectTrigger
													id='designation'
													className={`border w-ful tracking-wider ${
														!field.value
															? "text-lms-300 font-medium"
															: ""
													}`}
												>
													<SelectValue placeholder='Select Role' />
												</SelectTrigger>
												<SelectContent className='text-gray-700'>
													<SelectGroup>
														<SelectLabel>
															Select Designation
														</SelectLabel>
														{Designation.map(
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
								name='department'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='department'

										>
											Department
										</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
												disabled={viewState === "view"}
											>
												<SelectTrigger
													id='department'
													className={`border w-ful tracking-wider ${
														!field.value
															? "text-lms-300 font-medium"
															: ""
													}`}
												>
													<SelectValue placeholder='Select Department' />
												</SelectTrigger>
												<SelectContent className='text-gray-700'>
													<SelectGroup>
														<SelectLabel>
															Select Department
														</SelectLabel>
														{Department.map(
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
								name='appointmentDate'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='appointmentDate'

										>
											Appointment Date
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												id='appointmentDate'
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
								name='experienceYears'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='experience_years'

										>
											Experience (Years)
										</FormLabel>
										<FormControl>
											<Input
												id='experience_years'
												type='number'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500  placeholder:text-gray-400'
												placeholder='5'
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
								name='highestQualification'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='highest_qualification'

										>
											Highest Qualification
										</FormLabel>
										<FormControl>
											<Input
												id='highest_qualification'
												type='text'
												className=''
												placeholder='MBA'
												disabled={viewState === "view"}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* <FormField
								control={form.control}
								name='uan'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='uan'

										>
											UAN (Universal Account Number)
										</FormLabel>
										<FormControl>
											<Input
												id='uan'
												type='number'
												className=''
												placeholder=''
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
								name='pfAccountNumber'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='pf_account_number'

										>
											PF Account Number
										</FormLabel>
										<FormControl>
											<Input
												id='pf_account_number'
												type='number'
												className=''
												placeholder=''
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
								name='esiCodeNumber'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='esi_code_number'

										>
											ESI Code Number
										</FormLabel>
										<FormControl>
											<Input
												id='esi_code_number'
												type='number'
												className=''
												placeholder=''
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
								name='reportingManager'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='reporting_manager'

										>
											Reporting Manager
										</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
												disabled={viewState === "view"}
											>
												<SelectTrigger
													className={`border w-ful tracking-wider ${
														!field.value
															? "text-lms-300 font-medium"
															: ""
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
							/> */}
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
