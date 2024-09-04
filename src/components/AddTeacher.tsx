"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { Button } from "./ui/button";
import { SheetClose } from "./ui/sheet";
import Cookies from "js-cookie";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { showToast } from "@/utils/toastHelper";

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
	currentPath?: string | null;
}) => {
	const [data, setData] = useState<Teacher[]>([]);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState("");

	// Fetch unassigned teachers
	const fetchTeacherInfo = async () => {
		try {
			const instituteId = Cookies.get("instituteId");
			const { data } = await axiosInstance.get(
				`/institutes/unassigned-teachers?instituteId=${instituteId}`
			);
			const filteredData = data.map((obj: Teacher) => ({
				teacherId: obj.teacherId,
				teacherName: obj.teacherName,
			}));
			setData(filteredData);
		} catch (error) {
			console.log(`Error Occurs In AddTeacher.tsx ${error}`);
		}
	};

	useEffect(() => {
		fetchTeacherInfo();
	}, []);

	// Filter data based on search input
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const filteredData = data.filter((item) => {
		return (
			item.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			""
		);
	});

	// Assign teacher to section and close the sheet/modal
	const handleAssignTeacher = async (teacherId: string) => {
		if (teacherId && sectionId) {
			try {
				const response = await axiosInstance.post(
					"/sections/assign-teacher",
					{
						sectionId,
						teacherId,
					}
				);
				fetchSectionDetails();
				showToast("success", response.data.message);
				console.log(response);
			} catch (error: any) {
				showToast("error", error.message);
				console.error(error);
			}
		}
	};

	return (
		<div className='flex flex-col mt-5 mx-6 h-[95%] relative'>
			<div className='mb-4 flex items-center justify-between flex-row-reverse'>
				<div className='flex items-center py-4 h-[10%] relative '>
					<Input
						placeholder='Search by name...'
						value={searchTerm}
						onChange={handleSearchChange}
						className='max-w-full placeholder:text-gray-400 w-72 border-lms-200'
						style={{ padding: 0, paddingLeft: "40px" }}
					/>
					<Search
						className='absolute left-3'
						size={20}
					/>
				</div>
				<h5 className='text-xl text-lmsPrimary font-semibold'>
					All Teachers
				</h5>
			</div>

			<Table>
				<TableCaption>List of Available Teachers</TableCaption>
				<TableHeader className='text-sm tracking-wider text-lmsPrimary uppercase'>
					<TableRow>
						<TableHead className='w-[100px] font-bold px-5 py-0 text-left'>
							ID
						</TableHead>
						<TableHead className='font-bold px-5 py-0 text-left'>
							Teacher Name
						</TableHead>
						<TableHead className='px-5 py-0 text-right'></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className='border'>
					{filteredData.map((teacher, index) => (
						<TableRow
							key={teacher.teacherId}
							className={`${
								index % 2 === 0 ? "bg-white" : "bg-lms-100"
							} font-semibold tracking-wide text-sm text-lmsPrimary h-12`}
						>
							<TableCell className='w-[100px] border-r px-5 py-0 text-left'>
								{index + 1}
							</TableCell>
							<TableCell className='px-5 py-0 text-left'>
								{teacher.teacherName}
							</TableCell>
							<TableCell className='px-5 py-0 text-right'>
								<Button
									variant={"link"}
									onClick={() =>
										handleAssignTeacher(teacher.teacherId)
									}
									className='text-xs underline'
								>
									Assign
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default AddTeacher;
