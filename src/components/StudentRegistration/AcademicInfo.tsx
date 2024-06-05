import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const AcademicInfo = () => {
	return (
		<div className='flex justify-center my-8'>
			<div className='grid grid-cols-3 gap-8 w-3/4 items-center tracking-wide'>
				{/* Program/Class */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='program'
						className='pl-1 text-blue-500 font-semibold'
					>
						Program/Class
					</Label>
					<Input
						id='program'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='10th/B.Tech'
					/>
				</div>

				{/* Section */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='section'
						className='pl-1 text-blue-500 font-semibold'
					>
						Section
					</Label>
					<Input
						id='section'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='"A"'
					/>
				</div>

				{/* Admission Year */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='admission_year'
						className='pl-1 text-blue-500 font-semibold'
					>
						Admission Year
					</Label>
					<Input
						id='admission_year'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='2022'
					/>
				</div>

				{/* Board/University  */}
				<div className='flex flex-col gap-2'>
					<Label
						htmlFor='admission_year'
						className='pl-1 text-blue-500 font-semibold'
					>
						Board/University
					</Label>
					<Input
						id='admission_year'
						type='text'
						className='border border-gray-300 px-3 py-6 text-md tracking-wider focus:to-blue-500 focus:border-blue-500 placeholder:text-gray-400 placeholder:text'
						placeholder='CBSE / University Name'
					/>
				</div>
			</div>
		</div>
	);
};

export default AcademicInfo;
