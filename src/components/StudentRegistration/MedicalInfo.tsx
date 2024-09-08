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
import { healthInfoSchema } from "@/schema/studentFormSchema/medicalInfoSchema";
import { useSelector } from "react-redux";
import { RootState } from "@/context/store";
import { formatDate } from "@/utils/formatDate";

type HealthInfoSchemaType = z.infer<typeof healthInfoSchema>;

const MedicalInfoForm = ({
	onNext,
}: {
	onNext: (data: any) => void;
}): ReactElement => {
	const [hasValue, setHasValue] = useState(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setHasValue(event.target.value !== "");
	};
	const medicalInfoStudent = useSelector(
		(state: RootState) => state.studentRegistration.medicalInfo
	);
	const form = useForm<HealthInfoSchemaType>({
		resolver: zodResolver(healthInfoSchema),
		defaultValues: medicalInfoStudent || {},
	});

	const onSubmit = (values: HealthInfoSchemaType) => {
		onNext(values);
	};
	const { viewState } = useSelector((state: RootState) => state.student);
	const { reset } = form;
	useEffect(() => {
		reset(medicalInfoStudent || {});
	}, [medicalInfoStudent, reset]);

	return (
		<div className='flex justify-center my-8'>
			<div className='w-full tracking-wide'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='grid grid-cols-3 gap-x-8 gap-y-3 text-sm'>
							<FormField
								control={form.control}
								name='weightKg'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='weight'
											className='pl-1 '
										>
											Weight (Kg)
										</FormLabel>
										<FormControl>
											<Input
												id='weight'
												type='text'
												className='border  px-3 py-6 text-md tracking-wider '
												placeholder='60'
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
								name='heightCm'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='height'
											className='pl-1 '
										>
											Height (cm)
										</FormLabel>
										<FormControl>
											<Input
												id='height'
												type='text'
												className='border  px-3 py-6 text-md tracking-wider '
												placeholder='162'
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
								name='bmi'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='bmi'
											className='pl-1 '
										>
											Body Mass Index
										</FormLabel>
										<FormControl>
											<Input
												id='bmi'
												type='text'
												className='border  px-3 py-6 text-md tracking-wider '
												placeholder='24.56'
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
								name='pulseRate'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='pulseRate'
											className='pl-1 '
										>
											Pulse Rate
										</FormLabel>
										<FormControl>
											<Input
												id='pulseRate'
												type='text'
												className='border  px-3 py-6 text-md tracking-wider '
												placeholder='72 BPM'
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
								name='haemoglobin'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='haemoglobin'
											className='pl-1 '
										>
											Haemoglobin (Hb)
										</FormLabel>
										<FormControl>
											<Input
												id='haemoglobin'
												type='text'
												className='border  px-3 py-6 text-md tracking-wider '
												placeholder='16'
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
								name='allergies'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='allergies'
											className='pl-1 '
										>
											Allergies
										</FormLabel>
										<FormControl>
											<Input
												id='allergies'
												type='text'
												className='border  px-3 py-6 text-md tracking-wider '
												placeholder='"Asthma" , "Soy" etc.'
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
								name='reportIssueDate'
								render={({ field }) => (
									<FormItem className=''>
										<FormLabel
											htmlFor='dateOfBirth'
											className='pl-1'
										>
											Report Issue Date
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												id='dateOfBirth'
												type='date'
												value={
													field.value
														? formatDate(
																field.value
														  )
														: ""
												}
												className={`custom-date-input ${
													hasValue ? "has-value" : ""
												} border tracking-wider placeholder:text-lms-400`}
												disabled={viewState === "view"}
												placeholder='dd/mm/yyyy'
												onClick={(e) =>
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
