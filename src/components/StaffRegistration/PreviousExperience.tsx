import React, { ChangeEvent, FocusEvent, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
const dateFormat = "YYYY-MM-DD";

const PreviousExperience = () => {
	const [inputValue, setInputValue] = useState("+91 ");
	const minDate = dayjs("2019-08-01", dateFormat);
	const maxDate = dayjs().endOf("day");
	const disabledDate = (current: any) => {
		return current && (current < minDate || current > maxDate);
	};

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
	return (
		<div className='flex justify-center my-8'>
			<div className='grid grid-cols-3 gap-8 w-3/4 items-center tracking-wide'>
				{/* Institute Name  */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='institute_name'
						className='pl-1 text-blue-500 font-semibold'
					>
						Institute Name
					</Label>
					<Input
						id='institute_name'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='Previous Institute Name'
					/>
				</div>
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
						placeholder='Previous Job Title'
					/>
				</div>
				{/* Joining Date */}
				<div className='flex flex-col gap-2 '>
					<Label
						htmlFor='join_date'
						className='pl-1 text-blue-500 font-semibold'
					>
						Joining Date
					</Label>
					<DatePicker
						id='join_date'
						size='large'
						className='border border-gray-300 px-3 py-[13px] rounded-md text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 '
						format={dateFormat}
						disabledDate={disabledDate}
						placeholder='Select Date'
					/>
				</div>
				{/* Relieving Date */}
				<div className='flex flex-col gap-2 '>
					<Label
						htmlFor='relieving_date'
						className='pl-1 text-blue-500 font-semibold'
					>
						Relieving Date
					</Label>
					<DatePicker
						id='relieving_date'
						size='large'
						className='border border-gray-300 px-3 py-[13px] rounded-md text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 '
						format={dateFormat}
						disabledDate={disabledDate}
						placeholder='Select Date'
					/>
				</div>
				{/* Location */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='location'
						className='pl-1 text-blue-500 font-semibold'
					>
						Location
					</Label>
					<Input
						id='location'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='Previous Institute Location'
					/>
				</div>
				{/* Reference Name */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='ref_name'
						className='pl-1 text-blue-500 font-semibold'
					>
						Reference Name
					</Label>
					<Input
						id='ref_name'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='Reference Name'
					/>
				</div>
				{/* Reference Number */}
				<div className='flex flex-col gap-2 '>
					<Label
						htmlFor='reference_number'
						className='pl-1 text-blue-500 font-semibold'
					>
						Reference Number
					</Label>
					<div className='relative tracking-wider'>
						<Input
							id='reference_number'
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

export default PreviousExperience;
