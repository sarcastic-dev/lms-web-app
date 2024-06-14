import React, { ReactElement } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Category, Religion } from "@/Constant";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import additionalEmployeeDetailsSchema from "@/staffRegistrationSchema/additionalShemaStaff";
import { AdditionalEmployeeDetailsSchemaType } from "@/staffRegistrationSchema/additionalShemaStaff";
import { useSelector } from "react-redux";
import { RootState } from "@/context/store";


const AdditionalDetails = ({ onNext }: { onNext: (data: any) => void; }): ReactElement => {
	const additionalEmployeeInfo = useSelector((state: RootState) => state.staffRegistration.additionalDetails);

    const form = useForm<AdditionalEmployeeDetailsSchemaType>({
        resolver: zodResolver(additionalEmployeeDetailsSchema),
        defaultValues: {
            aadharNumber: additionalEmployeeInfo?.aadharNumber || "",
            panNumber: additionalEmployeeInfo?.panNumber || "",
            religion: (additionalEmployeeInfo?.religion || undefined) as AdditionalEmployeeDetailsSchemaType["religion"],
            category: (additionalEmployeeInfo?.category || undefined) as AdditionalEmployeeDetailsSchemaType["category"],
            fatherName: additionalEmployeeInfo?.fatherName || "",
            motherName: additionalEmployeeInfo?.motherName || "",
            maritalStatus: (additionalEmployeeInfo?.maritalStatus || undefined) as AdditionalEmployeeDetailsSchemaType["maritalStatus"],
            spouseName: additionalEmployeeInfo?.spouseName || "",
            emergencyMobileNumber: additionalEmployeeInfo?.emergencyMobileNumber || "",
        },
    });

    const onSubmit = (value: AdditionalEmployeeDetailsSchemaType) => {
        onNext(value);
    };

    return (
        <div className='flex justify-center my-8'>
            <div className='w-full tracking-wide'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-3 gap-x-8 gap-y-3">
                            <FormField
                                control={form.control}
                                name="aadharNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="aadhar_number" className="pl-1 text-blue-500 font-semibold">
                                            Aadhar Number
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="aadhar_number"
                                                type="number"
                                                className="border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                                                placeholder="98765432XXXXX"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="panNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="pan_number" className="pl-1 text-blue-500 font-semibold">
                                            PAN Number
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="pan_number"
                                                type="text"
                                                className="border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                                                placeholder="GLDH432XXXXX"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="religion"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="religion" className="pl-1 text-blue-500 font-semibold">
                                            Religion
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger className={`w-full border h-14 text-md tracking-wider border-gray-300 focus:to-blue-500 focus:border-blue-500 ${!field.value ? "text-gray-400" : ""}`}>
                                                    <SelectValue placeholder="Select Religion" className={!field.value ? "text-gray-400" : ""} />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white text-md tracking-wider">
                                                    {Religion.map((option, index) => (
                                                        <SelectItem key={index} value={option.value}>
                                                            {option.option}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="category" className="pl-1 text-blue-500 font-semibold">
                                            Category
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger className={`w-full border h-14 text-md tracking-wider border-gray-300 focus:to-blue-500 focus:border-blue-500 ${!field.value ? "text-gray-400" : ""}`}>
                                                    <SelectValue placeholder="Select Category" className={!field.value ? "text-gray-400" : ""} />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white text-md tracking-wider">
                                                    {Category.map((option, index) => (
                                                        <SelectItem key={index} value={option.value}>
                                                            {option.option}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="maritalStatus"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="marital_status" className="pl-1 text-blue-500 font-semibold">
                                            Marital Status
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger className={`w-full border h-14 text-md tracking-wider border-gray-300 focus:to-blue-500 focus:border-blue-500 ${!field.value ? "text-gray-400" : ""}`}>
                                                    <SelectValue placeholder="Select Marital Status" className={!field.value ? "text-gray-400" : ""} />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white text-md tracking-wider">
                                                    <SelectItem value='unmarried'>Unmarried</SelectItem>
                                                    <SelectItem value='married'>Married</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="fatherName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="father_name" className="pl-1 text-blue-500 font-semibold">
                                            Father Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="father_name"
                                                type="text"
                                                className="border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                                                placeholder=""
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="motherName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="mother_name" className="pl-1 text-blue-500 font-semibold">
                                            Mother Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="mother_name"
                                                type="text"
                                                className="border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                                                placeholder=""
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="spouseName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="spouse_name" className="pl-1 text-blue-500 font-semibold">
                                            Spouse Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="spouse_name"
                                                type="text"
                                                className="border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                                                placeholder=""
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="emergencyMobileNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="emergency_mobile_number" className="pl-1 text-blue-500 font-semibold">
                                            Emergency Mobile Number
                                        </FormLabel>
                                        <FormControl>
                                            <div className='relative tracking-wider'>
                                                <Input
                                                    id='emergency_mobile_number'
                                                    type='tel'
                                                    className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
                                                    placeholder='+91 9876543210'
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='flex items-center justify-end space-x-2'>
                            <Button type="submit" className="mt-8">
                                Next
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default AdditionalDetails;
