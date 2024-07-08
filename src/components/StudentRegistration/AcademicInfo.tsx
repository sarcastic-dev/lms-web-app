import React, { ReactElement, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
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
import { DatePicker } from "antd";
// import { setBasicInfoStudentData } from "@/context/studentRegistrationSlice";

dayjs.extend(customParseFormat);

const dateFormat = "YYYY-MM-DD";

type AcademicInfoSchemaType = z.infer<typeof programInfoSchema>;

const AcademicInfoForm = ({
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
								render={({ field }) => (
									<FormItem>
										<div className=''>
											<FormLabel
												htmlFor='enrolmentID'
												className='pl-1 text-blue-500 font-semibold mr-[120px]'
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
													className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 pr-28'
													placeholder='Enrolment ID'
													disabled={
														viewState === "view"
													}
													{...field}
												/>
												<span className='absolute right-3 top-3.5 flex items-center space-x-2 text-gray-500'>
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
								name='class'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='programClass'
											className='pl-1 text-blue-500 font-semibold'
										>
											Program/Class
										</FormLabel>
										<FormControl>
											<Input
												id='programClass'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:border-blue-500 placeholder:text-gray-400'
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
											className='pl-1 text-blue-500 font-semibold'
										>
											Section
										</FormLabel>
										<FormControl>
											<Input
												id='section'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:border-blue-500 placeholder:text-gray-400'
												placeholder='"A"'
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
											className='pl-1 text-blue-500 font-semibold'
										>
											Class Roll Number
										</FormLabel>
										<FormControl>
											<Input
												id='classRollNumber'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
												placeholder='Class Roll Number'
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
                                name='admissionDate'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            htmlFor='admissionYear'
                                            className='pl-1 text-blue-500 font-semibold'
                                        >
                                            Admission Year 
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id='admissionYear'
                                                type='text'
                                                className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:border-blue-500 placeholder:text-gray-400'
                                                placeholder='2022'
                                                disabled={viewState === 'view'}
                                            
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> */}
							<FormField
								control={form.control}
								name='admissionDate'
								render={({ field }) => (
									<FormItem className=''>
										<FormLabel
											htmlFor='admissionYear'
											className='pl-1 text-blue-500 font-semibold '
										>
											Admission Year
										</FormLabel>
										<FormControl>
											<DatePicker
												id='admissionYear'
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
								name='boardUniversity'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='boardUniversity'
											className='pl-1 text-blue-500 font-semibold'
										>
											Board/University
										</FormLabel>
										<FormControl>
											<Input
												id='boardUniversity'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:border-blue-500 placeholder:text-gray-400'
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
