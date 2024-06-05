import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const dateFormat = "YYYY-MM-DD";

const MedicalInfo = () => {
	const minDate = dayjs("2019-08-01", dateFormat);
	const maxDate = dayjs().endOf("day"); // Current date as max date

	const disabledDate = (current: any) => {
		// Disable dates before minDate and after maxDate
		return current && (current < minDate || current > maxDate);
	};
	return (
		<div className='flex justify-center my-8'>
			<div className='grid grid-cols-3 gap-8 w-3/4 items-center tracking-wide'>
				{/* Wight */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='wight'
						className='pl-1 text-blue-500 font-semibold'
					>
						Wight (Kg)
					</Label>
					<Input
						id='wight'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='60'
					/>
				</div>
				{/* Height */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='height'
						className='pl-1 text-blue-500 font-semibold'
					>
						Height (cm)
					</Label>
					<Input
						id='height'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='162'
					/>
				</div>
				{/* Body Mass Index */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='bmi'
						className='pl-1 text-blue-500 font-semibold'
					>
						Body Mass Index
					</Label>
					<Input
						id='bmi'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='24.56'
					/>
				</div>
				{/* Pulse Rate */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='pulse'
						className='pl-1 text-blue-500 font-semibold'
					>
						Pulse Rate
					</Label>
					<Input
						id='pulse'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='72 BPM'
					/>
				</div>
				{/* Haemoglobin (Hb) */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='hb'
						className='pl-1 text-blue-500 font-semibold'
					>
						Haemoglobin (Hb)
					</Label>
					<Input
						id='hb'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='16'
					/>
				</div>
				{/* Allergies */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='allergies'
						className='pl-1 text-blue-500 font-semibold'
					>
						Allergies
					</Label>
					<Input
						id='allergies'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='"Asthma" , "Soy" etc.'
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='issued_date'
						className='pl-1 text-blue-500 font-semibold'
					>
						Issued Date
					</Label>
					<DatePicker
						id='issued_date'
						size='large'
						className='border border-gray-300 px-3 py-[13px] rounded-md text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
						format={dateFormat}
						disabledDate={disabledDate}
						placeholder='Select Date'
					/>
				</div>
			</div>
		</div>
	);
};

export default MedicalInfo;
