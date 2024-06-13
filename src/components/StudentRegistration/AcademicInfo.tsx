import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { programInfoSchema } from "@/studentFormSchema/academicInfoSchema";

type AcademicInfoSchemaType = z.infer<typeof programInfoSchema>;

const AcademicInfoForm = ({ onNext }: { onNext: (data: any) => void }): ReactElement => {
	const form = useForm<AcademicInfoSchemaType>({
		resolver: zodResolver(programInfoSchema),
		defaultValues: {
			programClass: "",
			section: "",
			admissionYear: "",
			boardUniversity: "",
		},
	});

	const onSubmit = (values: AcademicInfoSchemaType) => {
		onNext(values);
	};

	return (
		<div className='flex justify-center my-8'>
			<div className='w-full tracking-wide'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='grid grid-cols-3 gap-x-8 gap-y-3'>
							<FormField
								control={form.control}
								name='programClass'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='programClass'
											className='pl-1 text-blue-500 font-semibold'
										>
											Program/Class{" "}
											<span className='text-red-500'>*</span>
										</FormLabel>
										<FormControl>
											<Input
												id='programClass'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:border-blue-500 placeholder:text-gray-400'
												placeholder='10th/B.Tech'
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
											Section{" "}
											<span className='text-red-500'>*</span>
										</FormLabel>
										<FormControl>
											<Input
												id='section'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:border-blue-500 placeholder:text-gray-400'
												placeholder='"A"'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='admissionYear'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											htmlFor='admissionYear'
											className='pl-1 text-blue-500 font-semibold'
										>
											Admission Year{" "}
											<span className='text-red-500'>*</span>
										</FormLabel>
										<FormControl>
											<Input
												id='admissionYear'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:border-blue-500 placeholder:text-gray-400'
												placeholder='2022'
												{...field}
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
											Board/University{" "}
											<span className='text-red-500'>*</span>
										</FormLabel>
										<FormControl>
											<Input
												id='boardUniversity'
												type='text'
												className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:border-blue-500 placeholder:text-gray-400'
												placeholder='CBSE / University Name'
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
