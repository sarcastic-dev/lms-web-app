import React, { ReactElement, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DatePicker } from "antd";
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
import { healthInfoSchema } from "@/studentFormSchema/medicalInfoSchema";
import { useSelector } from "react-redux";
import { RootState } from "@/context/store";

dayjs.extend(customParseFormat);

const dateFormat = "YYYY-MM-DD";

type HealthInfoSchemaType = z.infer<typeof healthInfoSchema>;

const MedicalInfoForm = ({
	onNext,
}: {
	onNext: (data: any) => void;
}): ReactElement => {
	const medicalInfoStudent = useSelector(
		(state: RootState) => state.studentRegistration.medicalInfo
	);
	const form = useForm<HealthInfoSchemaType>({
		resolver: zodResolver(healthInfoSchema),
		defaultValues: medicalInfoStudent || {},
	});

	const minDate = dayjs("2019-08-01", dateFormat);
	const maxDate = dayjs().endOf("day");

	const disabledDate = (current: any) => {
		return current && (current < minDate || current > maxDate);
	};
	const onSubmit = (values: HealthInfoSchemaType) => {
		onNext(values);
	};
	const { reset } = form;
	useEffect(() => {
		reset(medicalInfoStudent || {});
	}, [medicalInfoStudent, reset]);

	return (
		<div className='flex justify-center my-8'>
			<div className='w-full tracking-wide'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='grid grid-cols-3 gap-x-8 gap-y-3'>
							<FormField
								control={form.control}
								name='weight'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='weight'
											className='pl-1 text-blue-500 font-semibold'
										>
											Weight (Kg)
										</FormLabel>
										<FormControl>
											<Input
												id='weight'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:border-blue-500 placeholder:text-gray-400'
												placeholder='60'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='height'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='height'
											className='pl-1 text-blue-500 font-semibold'
										>
											Height (cm)
										</FormLabel>
										<FormControl>
											<Input
												id='height'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:border-blue-500 placeholder:text-gray-400'
												placeholder='162'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='bmi'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='bmi'
											className='pl-1 text-blue-500 font-semibold'
										>
											Body Mass Index
										</FormLabel>
										<FormControl>
											<Input
												id='bmi'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:border-blue-500 placeholder:text-gray-400'
												placeholder='24.56'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='pulseRate'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='pulseRate'
											className='pl-1 text-blue-500 font-semibold'
										>
											Pulse Rate
										</FormLabel>
										<FormControl>
											<Input
												id='pulseRate'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:border-blue-500 placeholder:text-gray-400'
												placeholder='72 BPM'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='haemoglobin'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='haemoglobin'
											className='pl-1 text-blue-500 font-semibold'
										>
											Haemoglobin (Hb)
										</FormLabel>
										<FormControl>
											<Input
												id='haemoglobin'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:border-blue-500 placeholder:text-gray-400'
												placeholder='16'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='allergies'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='allergies'
											className='pl-1 text-blue-500 font-semibold'
										>
											Allergies
										</FormLabel>
										<FormControl>
											<Input
												id='allergies'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:border-blue-500 placeholder:text-gray-400'
												placeholder='"Asthma" , "Soy" etc.'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='issuedDate'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='issuedDate'
											className='pl-1 text-blue-500 font-semibold'
										>
											Issued Date
										</FormLabel>
										<FormControl>
											<DatePicker
												id='issuedDate'
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
						</div>
						<Button
							type='submit'
							className='hidden'
						>
							Submit
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default MedicalInfoForm;
