import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Department, Designation } from "@/Constant";

const EmploymentDetails = () => {
	const [selectedValueDesignation, setSelectedValueDesignation] =
		useState("");
	const [selectedValueDepartment, setSelectedValueDepartment] = useState("");
	const [selectedValueReportee, setSelectedValueReportee] = useState("");
	const [selectedValueReporting, setSelectedValueReporting] = useState("");

	const handleDesignation = (value: string) => {
		setSelectedValueDesignation(value);
	};

	const handleDepartment = (value: string) => {
		setSelectedValueDepartment(value);
	};

	const handleReporting = (value: string) => {
		setSelectedValueReporting(value);
	};

	const handleReportee = (value: string) => {
		setSelectedValueReportee(value);
	};
	return (
		<div className='flex justify-center my-8'>
			<div className='grid grid-cols-3 gap-8 w-3/4 items-center tracking-wide'>
				{/* Job Title */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='job_title'
						className='pl-1 text-blue-500 font-semibold'
					>
						Job Title
					</Label>
					<Input
						id='job_title'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='Primary Teacher'
					/>
				</div>
				{/* Employment Type */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='job_title'
						className='pl-1 text-blue-500 font-semibold'
					>
						Job Title
					</Label>
					<Input
						id='job_title'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='Primary Teacher'
					/>
				</div>
				{/* Designation */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='designation'
						className='pl-1 text-blue-500 font-semibold'
					>
						Designation
					</Label>
					<Select onValueChange={handleDesignation}>
						<SelectTrigger
							id='designation'
							className={`border border-gray-300 px-3 py-6 rounded-md text-md tracking-wider focus:to-blue-500 focus:border-blue-500 ${
								selectedValueDesignation
									? "text-gray-700"
									: "text-gray-400"
							}`}
						>
							<SelectValue
								placeholder='Select Role'
								className={`${
									selectedValueDesignation
										? "text-gray-700"
										: "text-gray-400"
								}`}
							/>
						</SelectTrigger>
						<SelectContent className='text-gray-700'>
							{Designation.map((item, index) => (
								<SelectItem
									key={index}
									value={item.value}
								>
									{item.option}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				{/* Department */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='department'
						className='pl-1 text-blue-500 font-semibold'
					>
						Department
					</Label>
					<Select onValueChange={handleDepartment}>
						<SelectTrigger
							id='department'
							className={`border border-gray-300 px-3 py-6 rounded-md text-md tracking-wider focus:to-blue-500 focus:border-blue-500 ${
								selectedValueDepartment
									? "text-gray-700"
									: "text-gray-400"
							}`}
						>
							<SelectValue
								placeholder='Select Role'
								className={`${
									selectedValueDepartment
										? "text-gray-700"
										: "text-gray-400"
								}`}
							/>
						</SelectTrigger>
						<SelectContent className='text-gray-700'>
							{Department.map((item, index) => (
								<SelectItem
									key={index}
									value={item.value}
								>
									{item.option}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				{/* Appointment Date */}

				{/* Experience (Years) */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='experience'
						className='pl-1 text-blue-500 font-semibold'
					>
						Experience (Years)
					</Label>
					<Input
						id='experience'
						type='number'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='5'
					/>
				</div>
				{/* Highest Qualification */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='qualification'
						className='pl-1 text-blue-500 font-semibold'
					>
						Highest Qualification
					</Label>
					<Input
						id='qualification'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='MBA'
					/>
				</div>
				{/* UAN (Universal Account Number) */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='uan'
						className='pl-1 text-blue-500 font-semibold'
					>
						UAN (Universal Account Number)
					</Label>
					<Input
						id='uan'
						type='number'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder=''
					/>
				</div>
				{/* PF Account Number */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='pf_num'
						className='pl-1 text-blue-500 font-semibold'
					>
						PF Account Number
					</Label>
					<Input
						id='pf_num'
						type='number'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder=''
					/>
				</div>
				{/* ESI Code Number */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='esi_num'
						className='pl-1 text-blue-500 font-semibold'
					>
						ESI Code Number
					</Label>
					<Input
						id='esi_num'
						type='number'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder=''
					/>
				</div>
				{/* Reportee */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='reportee'
						className='pl-1 text-blue-500 font-semibold'
					>
						Reportee
					</Label>
					<Select onValueChange={handleReportee}>
						<SelectTrigger
							id='reportee'
							className={`border border-gray-300 px-3 py-6 rounded-md text-md tracking-wider focus:to-blue-500 focus:border-blue-500 ${
								selectedValueReportee
									? "text-gray-700"
									: "text-gray-400"
							}`}
						>
							<SelectValue
								placeholder='Select'
								className={`${
									selectedValueReportee
										? "text-gray-700"
										: "text-gray-400"
								}`}
							/>
						</SelectTrigger>
						<SelectContent className='text-gray-700'>
							<SelectItem value='owner'>Owner</SelectItem>
							<SelectItem value='teacher'>Teacher</SelectItem>
						</SelectContent>
					</Select>
				</div>
				{/* Reporting Manager */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='reporting_manager'
						className='pl-1 text-blue-500 font-semibold'
					>
						Reporting Manager
					</Label>
					<Select onValueChange={handleReporting}>
						<SelectTrigger
							id='reporting_manager'
							className={`border border-gray-300 px-3 py-6 rounded-md text-md tracking-wider focus:to-blue-500 focus:border-blue-500 ${
								selectedValueReporting
									? "text-gray-700"
									: "text-gray-400"
							}`}
						>
							<SelectValue
								placeholder='Select'
								className={`${
									selectedValueReporting
										? "text-gray-700"
										: "text-gray-400"
								}`}
							/>
						</SelectTrigger>
						<SelectContent className='text-gray-700'>
							<SelectItem value='owner'>Owner</SelectItem>
							<SelectItem value='teacher'>Teacher</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
};

export default EmploymentDetails;
