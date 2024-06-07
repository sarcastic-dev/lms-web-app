import React, { ChangeEvent, FocusEvent, useState } from "react";
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

const AdditionalDetails = () => {
	const [selectedValueReligion, setSelectedValueReligion] = useState("");
	const [selectedValueCategory, setSelectedValueCategory] = useState("");
	const [selectedValueMarital, setSelectedValueMarital] = useState("");
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

	const handleReligion = (value: string) => {
		setSelectedValueReligion(value);
	};

	const handleCategory = (value: string) => {
		setSelectedValueCategory(value);
	};

	const handleMarital = (value: string) => {
		setSelectedValueMarital(value);
	};

	return (
		<div className='flex justify-center my-8'>
			<div className='grid grid-cols-3 gap-8 w-3/4 items-center tracking-wide'>
				{/* Aadhar Number  */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='aadhar_number'
						className='pl-1 text-blue-500 font-semibold'
					>
						Aadhar Number
					</Label>
					<Input
						id='aadhar_number'
						type='number'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='98765432XXXXX'
					/>
				</div>

				{/* PAN Number */}

				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='pan_number'
						className='pl-1 text-blue-500 font-semibold'
					>
						PAN Number
					</Label>
					<Input
						id='pan_number'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='GLDH432XXXXX'
					/>
				</div>

				{/* Religion */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='religion'
						className='pl-1 text-blue-500 font-semibold'
					>
						Religion
					</Label>
					<Select onValueChange={handleReligion}>
						<SelectTrigger
							id='religion'
							className={`border border-gray-300 px-3 py-6 rounded-md text-md tracking-wider focus:to-blue-500 focus:border-blue-500 ${
								selectedValueReligion
									? "text-gray-700"
									: "text-gray-400"
							}`}
						>
							<SelectValue
								placeholder='Select Role'
								className={`${
									selectedValueReligion
										? "text-gray-700"
										: "text-gray-400"
								}`}
							/>
						</SelectTrigger>
						<SelectContent className='text-gray-700'>
							{Religion.map((item, index) => (
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
				{/* Category */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='category'
						className='pl-1 text-blue-500 font-semibold'
					>
						Category
					</Label>
					<Select onValueChange={handleCategory}>
						<SelectTrigger
							id='category'
							className={`border border-gray-300 px-3 py-6 rounded-md text-md tracking-wider focus:to-blue-500 focus:border-blue-500 ${
								selectedValueCategory
									? "text-gray-700"
									: "text-gray-400"
							}`}
						>
							<SelectValue
								placeholder='Select Role'
								className={`${
									selectedValueCategory
										? "text-gray-700"
										: "text-gray-400"
								}`}
							/>
						</SelectTrigger>
						<SelectContent className='text-gray-700'>
							{Category.map((item, index) => (
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
				{/* Marital Status */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='marital_status'
						className='pl-1 text-blue-500 font-semibold'
					>
						Marital Status
					</Label>
					<Select onValueChange={handleMarital}>
						<SelectTrigger
							id='marital_status'
							className={`border border-gray-300 px-3 py-6 rounded-md text-md tracking-wider focus:to-blue-500 focus:border-blue-500 ${
								selectedValueMarital
									? "text-gray-700"
									: "text-gray-400"
							}`}
						>
							<SelectValue
								placeholder='Select Role'
								className={`${
									selectedValueMarital
										? "text-gray-700"
										: "text-gray-400"
								}`}
							/>
						</SelectTrigger>
						<SelectContent className='text-gray-700'>
							<SelectItem value='unmarried'>Unmarried</SelectItem>
							<SelectItem value='married'>Married</SelectItem>
						</SelectContent>
					</Select>
				</div>
				{/* Father Name */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='father_name'
						className='pl-1 text-blue-500 font-semibold'
					>
						Father Name
					</Label>
					<Input
						id='father_name'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder=''
					/>
				</div>
				{/* Mother Name */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='mother_name'
						className='pl-1 text-blue-500 font-semibold'
					>
						Mother Name
					</Label>
					<Input
						id='mother_name'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder=''
					/>
				</div>
				{/* Spouse Name */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='spouse_name'
						className='pl-1 text-blue-500 font-semibold'
					>
						Spouse Name
					</Label>
					<Input
						id='spouse_name'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder=''
					/>
				</div>
				{/* Emergency Number */}
				<div className='flex flex-col gap-2 '>
					<Label
						htmlFor='emergency_mobile_number'
						className='pl-1 text-blue-500 font-semibold'
					>
						Emergency Mobile Number
					</Label>
					<div className='relative tracking-wider'>
						<Input
							id='emergency_mobile_number'
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
			</div>
		</div>
	);
};

export default AdditionalDetails;
