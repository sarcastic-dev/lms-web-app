import React, { useState } from "react";
import { Input } from "./ui/input";
import { Switch } from "antd";
import { classStages } from "@/Constant";
import { Button } from "./ui/button";

const EditStructure = () => {
	return (
		<div className='h-full'>
			<h3 className='text-md font-medium text-gray-400 mt-2 h-[2%]'>
				Add or remove classes from your institute or edit the class name
			</h3>
			<div className='overflow-y-scroll h-[85%] mt-8'>
				{classStages.map((item, index) => (
					<div key={index}>
						<p className='text-sm font-medium'>{item.stage}</p>
						{item.classes.map((item, index) => (
							<div
								className='flex items-center justify-between px-14 space-x-14 my-5'
								key={index}
							>
								<Input
									value={item}
									className='placeholder:text-gray'
								/>
								<Switch />
							</div>
						))}
					</div>
				))}
			</div>
			<div className='h-[13] flex mt-5'>
				<Button className='w-full'>Update Classroom Structure</Button>
			</div>
		</div>
	);
};

export default EditStructure;
