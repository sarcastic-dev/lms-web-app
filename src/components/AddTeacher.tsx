"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { Checkbox } from "antd";
import { Button } from "./ui/button";
import { SheetClose, SheetFooter } from "./ui/sheet";

interface Teacher {
	teacherId: string;
	teacherName: string;
}

const AddTeacher = ({
	fetchSectionDetails,
	sectionId,
}: {
	fetchSectionDetails: () => void;
	sectionId: string | null;
}) => {
	const [data, setData] = useState<Teacher[]>([]);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState("");

	const fetchTeacherInfo = async () => {
		try {
			const { data } = await axiosInstance.get(
				`/institutes/unassigned-teachers?instituteId=97cb57e0-067c-4210-aba1-279fd577494e`
			);
			const filteredData = data.map((obj: Teacher) => ({
				teacherId: obj.teacherId,
				teacherName: obj.teacherName,
			}));
			console.log(data);
			setData(filteredData);
		} catch (error) {
			console.log(`Error Occurs In AddTeacher.tsx ${error}`);
		}
	};

	useEffect(() => {
		fetchTeacherInfo();
	}, []);

	const handleCheckboxChange = (id: string) => {
		setSelectedId((prevSelectedId) => (prevSelectedId === id ? null : id));
		console.log("Selected ID:", id);
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const filteredData = data.filter((item) => {
		return (
			item.teacherId.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			""
		);
	});

	const handleAssignTeacher = async () => {
		if (selectedId && sectionId) {
			try {
				const response = await axiosInstance.post(
					"/sections/assign-teacher",
					{
						sectionId,
						teacherId: selectedId,
					}
				);
				fetchSectionDetails();
				console.log(response);
			} catch (error) {
				console.error(error);
			}
		}
	};

	return (
		<div className='flex flex-col mt-5 mx-6 h-[95%] relative'>
			<div className='flex items-center py-4 h-[10%] relative '>
				<Input
					placeholder='Search by name, contact, email'
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
				<div className='mt-5 h-[95%] overflow-y-auto'>
					{filteredData.map((item) => (
						<div
							key={item.teacherId}
							className='flex items-center px-8 py-2.5 bg-gray-100 mb-2 rounded-lg relative'
						>
							<Checkbox
								checked={selectedId === item.teacherId}
								onChange={() =>
									handleCheckboxChange(item.teacherId)
								}
								className='mr-6'
							/>
							<div className='flex-shrink-0 h-10 w-10 rounded-full bg-red-200 flex items-center justify-center text-white font-bold'>
								{item.teacherName[0]}
							</div>
							<div className='ml-4'>
								<div className='text-sm font-medium text-gray-900'>
									{item.teacherName}
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
							disabled={!selectedId}
							onClick={handleAssignTeacher}
						>
							Assign Staff To Classroom
						</Button>
					</SheetClose>
				</SheetFooter>
			</div>
		</div>
	);
};

export default AddTeacher;
