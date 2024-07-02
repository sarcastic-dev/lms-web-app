"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { Checkbox } from "antd";
import { Button } from "./ui/button";

interface Student {
	id: string;
	name: string;
	contact: string;
	enrollmentId: string;
	email: string;
}

const AddStudent = () => {
	const [data, setData] = useState<Student[]>([]);
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
	const [searchTerm, setSearchTerm] = useState("");

	const fetchStudentInfo = async () => {
		try {
			const { data } = await axiosInstance.get("/students");
			const filteredData = data.map((obj: any) => {
				const user = obj.basicInfo.user;
				const student = obj.basicInfo.student;

				return {
					id: user.id,
					name: `${user.firstName} ${user.middleName} ${user.lastName}`,
					contact: user.phone,
					enrollmentId: student.enrollmentId,
					email: user.email,
				};
			});
			setData(filteredData);
		} catch (error) {
			console.log(`Error Occurs In StudentDrawer.tsx ${error}`);
		}
	};

	useEffect(() => {
		fetchStudentInfo();
	}, []);

	const handleCheckboxChange = (id: string) => {
		setSelectedIds((prevSelectedIds) => {
			const newSelectedIds = new Set(prevSelectedIds);
			if (newSelectedIds.has(id)) {
				newSelectedIds.delete(id);
			} else {
				newSelectedIds.add(id);
			}
			console.log("Selected IDs:", Array.from(newSelectedIds));
			return newSelectedIds;
		});
	};

	const handleSelectAllChange = () => {
		if (selectedIds.size === data.length) {
			setSelectedIds(new Set());
		} else {
			const allIds = new Set(data.map((item) => item.id));
			setSelectedIds(allIds);
			console.log("Selected IDs:", Array.from(allIds));
		}
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const filteredData = data.filter((item) => {
		return (
			item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.enrollmentId.toLowerCase().includes(searchTerm.toLowerCase())
		);
	});

	return (
		<div className='flex flex-col mt-5 mx-6 h-[95%] relative'>
			<div className='flex items-center py-4 h-[10%] relative '>
				<Input
					placeholder='Search by name, enrollmentId, contact, email'
					value={searchTerm}
					onChange={handleSearchChange}
					className='max-w-full pl-10 placeholder:text-gray-400'
				/>
				<Search
					className='absolute left-3'
					size={20}
				/>
			</div>
			<div className='h-[80%] '>
				<div className='flex items-center justify-between h-[5%] overflow-y-hidden'>
					<div className='flex items-center'>
						<Checkbox
							checked={selectedIds.size === data.length}
							onChange={handleSelectAllChange}
							className='mr-2 '
						/>
						<div className='text-gray-800 text-sm font-medium'>
							Select All
						</div>
					</div>
					<div className='text-xs text-gray-800 font-medium'>
						{selectedIds.size} of {filteredData.length} row(s)
						selected.
					</div>
				</div>
				<div className='mt-5 h-[95%] overflow-y-auto'>
					{filteredData.map((item) => (
						<div
							key={item.id}
							className='flex items-center px-8 py-2.5 bg-gray-100 mb-2 rounded-sm '
						>
							<Checkbox
								checked={selectedIds.has(item.id)}
								onChange={() => handleCheckboxChange(item.id)}
								className='mr-6'
							/>
							<div className='flex-shrink-0 h-10 w-10 rounded-full bg-red-200 flex items-center justify-center text-white font-bold'>
								{item.name[0]}
							</div>
							<div className='ml-4'>
								<div className='text-sm font-medium text-gray-900'>
									{item.name}
								</div>
								<div className='text-xs font-medium text-gray-500 mt-1'>
									{item.enrollmentId} | {item.contact} |{" "}
									{item.email}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className='absolute bottom-2 w-full'>
				<Button
					variant={"destructive"}
					className='w-full'
					disabled={selectedIds.size === 0 ? true : false}
				>
					Assign Student To Classroom
				</Button>
			</div>
		</div>
	);
};

export default AddStudent;
