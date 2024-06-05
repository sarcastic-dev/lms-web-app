import React, { ChangeEvent, FocusEvent, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const MotherInfo = () => {
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
	return (
		<div className='flex justify-center my-8'>
			<div className='grid grid-cols-3 gap-8 w-3/4 items-center tracking-wide'>
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
						placeholder='Jane Doe'
					/>
				</div>
				{/* Mother's Number */}
				<div className='flex flex-col gap-2 '>
					<Label
						htmlFor='mother_mobile_number'
						className='pl-1 text-blue-500 font-semibold'
					>
						Mother Mobile Number
					</Label>
					<div className='relative tracking-wider'>
						<Input
							id='mother_mobile_number'
							type='tel'
							className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 '
							value={inputValue}
							onFocus={handleFocus}
							onChange={handleChange}
						/>
						{inputValue === "+91 " && (
							<span className='absolute left-11 top-[13.5px] text-gray-400 pointer-events-none'>
								9876543210
							</span>
						)}
					</div>
				</div>

				{/* Mother Email */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='mother_email'
						className='pl-1 text-blue-500 font-semibold'
					>
						Mother Email ID
					</Label>
					<Input
						id='mother_email'
						type='email'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='Mothers@gmail.com'
					/>
				</div>
				{/* Educational Qualification */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='educational_qualification'
						className='pl-1 text-blue-500 font-semibold'
					>
						Educational Qualification
					</Label>
					<Input
						id='educational_qualification'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
						placeholder='Ex. MBBS'
					/>
				</div>

				{/* Occupation */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='occupation'
						className='pl-1 text-blue-500 font-semibold'
					>
						Occupation
					</Label>
					<Input
						id='occupation'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
						placeholder='Ex. Doctor'
					/>
				</div>
				{/* Work Organization Name */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='work_organization_name'
						className='pl-1 text-blue-500 font-semibold'
					>
						Work Organization Name
					</Label>
					<Input
						id='work_organization_name'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
						placeholder='Ex. Government Hospital'
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
					<Input
						id='designation'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
						placeholder='Ex. CMO'
					/>
				</div>
				{/* Annual Income */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='annual_income'
						className='pl-1 text-blue-500 font-semibold'
					>
						Annual Income
					</Label>
					<Input
						id='annual_income'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400'
						placeholder='Ex. 50XXXX'
					/>
				</div>
			</div>
		</div>
	);
};

export default MotherInfo;
