import React, { ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { programInfoSchema } from "@/schema/studentFormSchema/academicInfoSchema";
import { useSelector } from "react-redux";
import { RootState } from "@/context/store";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";
import { Separator } from "../ui/separator";
import { formatDate } from "@/utils/formatDate";

type AcademicInfoSchemaType = z.infer<typeof programInfoSchema>;

const AcademicInfoForm = ({
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

	const form = useForm<AcademicInfoSchemaType>({
		resolver: zodResolver(programInfoSchema),
		defaultValues: {
			enrollmentId: basicInfo?.student?.enrollmentId || "",
			admissionDate: basicInfo?.student?.admissionDate || "",
			boardUniversity: basicInfo?.student?.boardUniversity || "",
			class: basicInfo?.student?.class || "",
			rollNumber: basicInfo?.student?.rollNumber || "",
			section: basicInfo?.student?.section || "",
		},
	});

	const onSubmit = (value: AcademicInfoSchemaType) => {
		onNext(value);
	};
	const { viewState } = useSelector((state: RootState) => state.student);

	const { reset } = form;

	useEffect(() => {
		reset(basicInfo?.student || {});
	}, [basicInfo, reset]);

	return (
		<div className='flex justify-center my-8'>
			<div className='w-full tracking-wide'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='grid grid-cols-3 gap-x-8 gap-y-3 text-sm'>
							<FormField
								control={form.control}
								name='enrollmentId'
								render={({ field, fieldState: { error } }) => (
									<FormItem>
										<div className=''>
											<FormLabel
												htmlFor='enrolmentID'
												className='pl-1 mr-[120px]'
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
													id='enrolmentID'
													type='text'
													className={`tracking-wider pr-28 ${
														error
															? "border-red-500"
															: ""
													}`}
													placeholder='Enrolment ID'
													disabled={
														viewState === "view"
													}
													{...field}
												/>
												<span className='absolute right-3 top-3.5 flex items-center space-x-2 text-lmsSecondary'>
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
																<span>
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
								name='class'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='programClass'
											className='pl-1'
										>
											Program/Class
										</FormLabel>
										<FormControl>
											<Input
												id='programClass'
												type='text'
												className='border  px-3 py-6 text-md tracking-wider '
												placeholder='10th/B.Tech'
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
								name='section'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='section'
											className='pl-1 '
										>
											Section
										</FormLabel>
										<FormControl>
											<Input
												id='section'
												type='text'
												className='border  px-3 py-6 text-md tracking-wider '
												placeholder='A'
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
								name='rollNumber'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='classRollNumber'
											className='pl-1 '
										>
											Class Roll Number
										</FormLabel>
										<FormControl>
											<Input
												id='classRollNumber'
												type='text'
												className='border  px-3 py-6 text-md tracking-wider '
												placeholder='Class Roll Number'
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
								name='admissionDate'
								render={({ field }) => (
									<FormItem className=''>
										<FormLabel
											htmlFor='admissionDate'
											className='pl-1'
										>
											Date Of Admission
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												id='admissionDate'
												type='date'
												className={`custom-date-input ${
													hasValue ? "has-value" : ""
												} border tracking-wider placeholder:text-gray-400`}
												value={
													field.value
														? formatDate(
																field.value
														  )
														: ""
												}
												disabled={viewState === "view"}
												placeholder='dd/mm/yyyy'
												onClick={(
													e: React.MouseEvent<HTMLInputElement>
												) =>
													e.currentTarget.showPicker()
												}
												onChange={(e) => {
													const formattedDate =
														formatDate(
															e.target.value
														);
													handleChange(e);
													field.onChange(
														formattedDate
													);
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='boardUniversity'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='boardUniversity'
											className='pl-1 '
										>
											Board/University
										</FormLabel>
										<FormControl>
											<Input
												id='boardUniversity'
												type='text'
												className='border  px-3 py-6 text-md tracking-wider '
												placeholder='CBSE / University Name'
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

export default AcademicInfoForm;
