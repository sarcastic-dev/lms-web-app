import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const AddressInfo = () => {
	return (
		<div className='flex justify-center my-8'>
			<div className='grid grid-cols-3 gap-8 w-3/4 items-center tracking-wide'>
				{/* Address Line 1 */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='addr_1'
						className='pl-1 text-blue-500 font-semibold'
					>
						Address Line 1
					</Label>
					<Input
						id='addr_1'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='Abc near xyz'
					/>
				</div>
				{/* Address Line 2 */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='addr_2'
						className='pl-1 text-blue-500 font-semibold'
					>
						Address Line 2
					</Label>
					<Input
						id='addr_2'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='Flat/House No, Landmark'
					/>
				</div>
				{/* City/Town */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='city'
						className='pl-1 text-blue-500 font-semibold'
					>
						City/Town
					</Label>
					<Input
						id='city'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='Mumbai'
					/>
				</div>
				{/* State */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='state'
						className='pl-1 text-blue-500 font-semibold'
					>
						State
					</Label>
					<Input
						id='state'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='Maharashtra'
					/>
				</div>
				{/* PIN Code */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='pin_code'
						className='pl-1 text-blue-500 font-semibold'
					>
						PIN Code
					</Label>
					<Input
						id='pin_code'
						type='number'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='123456'
					/>
				</div>
				{/* Country */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='country'
						className='pl-1 text-blue-500 font-semibold'
					>
						Country
					</Label>
					<Input
						id='country'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='India'
					/>
				</div>
			</div>
		</div>
	);
};

export default AddressInfo;
