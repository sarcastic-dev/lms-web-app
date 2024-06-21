import React, { ReactElement, useEffect } from "react";
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
import { programInfoSchema } from "@/studentFormSchema/academicInfoSchema";
import { useSelector } from "react-redux";
import { RootState } from "@/context/store";
// import { setBasicInfoStudentData } from "@/context/studentRegistrationSlice";


type AcademicInfoSchemaType = z.infer<typeof programInfoSchema>;

const AcademicInfoForm = ({ onNext }: { onNext: (data: any) => void }): ReactElement => {
	const basicInfo = useSelector((state: RootState) => state.studentRegistration.basicInfo);

    const form = useForm<AcademicInfoSchemaType>({
        resolver: zodResolver(programInfoSchema),
        defaultValues: {
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
                                            Board/University 
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
                        <Button type='submit' className='mt-4 hidden'>
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default AcademicInfoForm;
