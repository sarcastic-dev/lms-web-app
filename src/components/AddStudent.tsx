"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Checkbox } from "antd";
import { Button } from "./ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { SheetClose, SheetFooter } from "./ui/sheet";

interface Student {
	studentId: string;
	studentName: string;
	parentName: string;
	rollNumber: string;
}

const AddStudent = ({
	students,
	sectionId,
	fetchSectionDetails,
}: {
	students: Student[];
	sectionId: any;
	fetchSectionDetails: () => void;
}) => {
	const [data, setData] = useState<Student[]>([]);
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		setData(students);
	}, [students]);

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
			const allIds = new Set(data.map((item) => item.studentId));
			setSelectedIds(allIds);
			// console.log("Selected IDs:", Array.from(allIds));
		}
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const filteredData = data.filter((item) => {
		return (
			item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
		);
	});

	const handleAssignStudent = async () => {
		try {
			const studentIdsArray = Array.from(selectedIds);
			const response = await axiosInstance.post(
				"/sections/assign-students",
				{ sectionId, studentIds: studentIdsArray }
			);
			fetchSectionDetails();
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='flex flex-col mt-5 mx-6 h-[95%] relative'>
			<div className='flex items-center py-4 h-[10%] relative '>
				<Input
					placeholder='Search by name, roll number, parent name'
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
							key={item.studentId}
							className='flex items-center px-8 py-2.5 bg-gray-100 mb-2 rounded-sm '
						>
							<Checkbox
								checked={selectedIds.has(item.studentId)}
								onChange={() =>
									handleCheckboxChange(item.studentId)
								}
								className='mr-6'
							/>
							<div className='flex-shrink-0 h-10 w-10 rounded-full bg-red-200 flex items-center justify-center text-white font-bold'>
								{item.studentName[0]}
							</div>
							<div className='ml-4'>
								<div className='text-sm font-medium text-gray-900'>
									{item.studentName}
								</div>
								<div className='text-xs font-medium text-gray-500 mt-1'>
									{item.rollNumber} | {item.parentName}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className='absolute bottom-2 w-full'>
				<SheetFooter>
					<SheetClose asChild>
						<Button
							variant={"destructive"}
							className='w-full'
							disabled={selectedIds.size === 0}
							onClick={handleAssignStudent}
						>
							Assign Student To Classroom
						</Button>
					</SheetClose>
				</SheetFooter>
			</div>
		</div>
	);
};

export default AddStudent;
