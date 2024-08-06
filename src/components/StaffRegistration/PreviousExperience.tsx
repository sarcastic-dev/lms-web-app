"use client";
import React, { ReactElement, useState } from "react";
import { Input } from "../ui/input";
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

const PreviousExperience = ({
	onNext,
}: {
	onNext: (data: any) => void;
}): ReactElement => {
	const [hasValue, setHasValue] = useState(false);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setHasValue(event.target.value !== "");
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
		<div className='flex justify-center mt-8'>
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
											className=''
										>
											Institute Name
										</FormLabel>
										<FormControl>
											<Input
												id='institute_name'
												type='text'
												className=''
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
											className=''
										>
											Job Title
										</FormLabel>
										<FormControl>
											<Input
												id='job_title'
												type='text'
												className=''
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
											className=''
										>
											Joining Date
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												id='join_date'
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
								name='relievingDate'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='relieving_date'
											className=''
										>
											Relieving Date
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												id='relieving_date'
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
								name='location'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='location'
											className=''
										>
											Location
										</FormLabel>
										<FormControl>
											<Input
												id='location'
												type='text'
												className=''
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
											className=''
										>
											Reference Name
										</FormLabel>
										<FormControl>
											<Input
												id='ref_name'
												type='text'
												className=''
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
											className=''
										>
											Reference Mobile Number{" "}
										</FormLabel>
										<FormControl>
											<div className='relative'>
												<Input
													id='reference_mobile_number'
													type='tel'
													className=' pl-11'
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
