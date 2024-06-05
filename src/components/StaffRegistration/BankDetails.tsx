import React, { ChangeEvent, FocusEvent, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const PreviousExperience = () => {
	return (
		<div className='flex justify-center my-8'>
			<div className='grid grid-cols-3 gap-8 w-3/4 items-center tracking-wide'>
				{/* Bank Name */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='bank_name'
						className='pl-1 text-blue-500 font-semibold'
					>
						Bank Name
					</Label>
					<Input
						id='bank_name'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='ABC Bank'
					/>
				</div>
				{/* Bank Account Number */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='account_no'
						className='pl-1 text-blue-500 font-semibold'
					>
						Bank Account Number
					</Label>
					<Input
						id='account_no'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='9898 98XXXX 98XXXX'
					/>
				</div>
				{/* IFSC Code */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='ifsc_code'
						className='pl-1 text-blue-500 font-semibold'
					>
						IFSC Code
					</Label>
					<Input
						id='ifsc_code'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='ABC0909021'
					/>
				</div>
				{/* Account Holder's Name */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='holder_name'
						className='pl-1 text-blue-500 font-semibold'
					>
						Account Holder&apos;s Name
					</Label>
					<Input
						id='holder_name'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='John Doe'
					/>
				</div>
			</div>
		</div>
	);
};

export default PreviousExperience;
