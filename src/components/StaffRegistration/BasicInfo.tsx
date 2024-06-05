"use client";
import React, { ReactElement, FocusEvent, ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";
import { Info } from "lucide-react";
import { Separator } from "../ui/separator";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
	Select,
	SelectContent,

	SelectItem,

	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { BloodGroups, Gender } from "@/Constant";

dayjs.extend(customParseFormat);

const dateFormat = "YYYY-MM-DD";

const BasicInfo = (): ReactElement => {
	const [selectedValue, setSelectedValue] = useState("");
	const minDate = dayjs("2019-08-01", dateFormat);
	const maxDate = dayjs().endOf("day"); // Current date as max date

	const disabledDate = (current: any) => {
		// Disable dates before minDate and after maxDate
		return current && (current < minDate || current > maxDate);
	};

	const [inputValue, setInputValue] = useState("+91 ");

	const handleFocus = (event: FocusEvent<HTMLInputElement>): void => {
		const input = event.target;
		if (input.value === "+91 ") {
			input.setSelectionRange(4, 4);
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const input = event.target;
		if (!input.value.startsWith("+91 ")) {
			setInputValue("+91 " + input.value.slice(4));
		} else {
			setInputValue(input.value);
		}
	};

	const handleSelectChange = (value: string) => {
		setSelectedValue(value);
	};
	return (
		<div className='flex justify-center my-8'>
			<div className='grid grid-cols-3 gap-8 w-3/4 items-center tracking-wide'>
				{/* Input Number */}
				<div className='flex flex-col gap-2 '>
					<Label
						htmlFor='employee_mobile_number'
						className='pl-1 text-blue-500 font-semibold'
					>
						Employee Mobile Number
					</Label>
					<div className='relative tracking-wider'>
						<Input
							id='employee_mobile_number'
							type='tel'
							className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 '
							value={inputValue}
							onFocus={handleFocus}
							onChange={handleChange}
						/>
						{inputValue === "+91 " && (
							<span className='absolute left-11 top-[13.5px] text-gray-400 pointer-events-none'>
								Mobile Number
							</span>
						)}
					</div>
				</div>
				{/* Input Email */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='email'
						className='pl-1 text-blue-500 font-semibold'
					>
						Employee Email ID
					</Label>
					<Input
						id='email'
						type='email'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='Email ID'
					/>
				</div>
				{/* Input Enroll */}
				<div className='flex flex-col gap-2'>
					<div className='flex items-center justify-between'>
						<Label
							htmlFor='enrolment_id'
							className='pl-1 text-blue-500 font-semibold'
						>
							Enrolment ID <span className='text-red-500'>*</span>
						</Label>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<Info className='h-4 w-4 text-blue-500' />
								</TooltipTrigger>
								<TooltipContent className='text-xs text-white bg-blue-500'>
									<p>Last Used</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
					<div className='relative'>
						<Input
							id='enrolment_id'
							type='text'
							className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
							placeholder='Enrollment No.'
						/>
						<span className='absolute right-3 top-3 flex items-center space-x-2 text-gray-500'>
							<Separator
								orientation='vertical'
								className='h-6 border-l border-gray-300'
							/>
							<span>@TES2097</span>
						</span>
					</div>
				</div>
				{/* Input First Name */}

				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='first_name'
						className='pl-1 text-blue-500 font-semibold'
					>
						First Name
					</Label>
					<Input
						id='first_name'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
						placeholder='First Name'
					/>
				</div>

				{/* Input Middle Name */}

				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='middle_name'
						className='pl-1 text-blue-500 font-semibold'
					>
						Middle Name
					</Label>
					<Input
						id='middle_name'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
						placeholder='Middle Name'
					/>
				</div>

				{/* Input Last Name */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='last_name'
						className='pl-1 text-blue-500 font-semibold'
					>
						Last Name
					</Label>
					<Input
						id='last_name'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
						placeholder='Last Name'
					/>
				</div>

				{/* Date of Birth */}
				<div className='flex flex-col gap-2 '>
					<Label
						htmlFor='dob'
						className='pl-1 text-blue-500 font-semibold'
					>
						Date Of Birth
					</Label>
					<DatePicker
						id='dob'
						size='large'
						className='border border-gray-300 px-3 py-[13px] rounded-md text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 '
						format={dateFormat}
						disabledDate={disabledDate}
						placeholder='Select Date'
					/>
				</div>
				{/* Gender */}

				<div className='flex flex-col gap-2 text-gray-400'>
					<Label
						htmlFor='gender'
						className='pl-1 text-blue-500 font-semibold'
					>
						Gender
					</Label>
					<Select>
						<SelectTrigger
							id='gender'
							className='border border-gray-300 px-3 py-6 rounded-md text-md tracking-wider focus:to-blue-500 focus:border-blue-500 '
						>
							<SelectValue
								placeholder='Select Gender'
								className='text-gray-400'
							/>
						</SelectTrigger>
						<SelectContent>
							{Gender.map((item, index) => (
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

				{/* Blood Group */}
				<div className='flex flex-col gap-2 text-gray-400'>
					<Label
						htmlFor='blood_group'
						className='pl-1 text-blue-500 font-semibold'
					>
						Blood Group
					</Label>
					<Select>
						<SelectTrigger
							id='blood_group'
							className='border border-gray-300 px-3 py-6 rounded-md text-md tracking-wider focus:to-blue-500 focus:border-blue-500 '
						>
							<SelectValue
								placeholder='Select Group'
								className='text-gray-400'
							/>
						</SelectTrigger>
						<SelectContent>
							{BloodGroups.map((item, index) => (
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
				{/* User Role */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='user_roll'
						className='pl-1 text-blue-500 font-semibold'
					>
						User Role
					</Label>
					<Select onValueChange={handleSelectChange}>
						<SelectTrigger
							id='user_roll'
							className={`border border-gray-300 px-3 py-6 rounded-md text-md tracking-wider focus:to-blue-500 focus:border-blue-500 ${
								selectedValue
									? "text-gray-700"
									: "text-gray-400"
							}`}
						>
							<SelectValue
								placeholder='Select Role'
								className={`${
									selectedValue
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

export default BasicInfo;
