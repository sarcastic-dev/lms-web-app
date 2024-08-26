"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { CheckCircleIcon, CircleX, Search } from "lucide-react";
import { Checkbox } from "antd";
import { Button } from "./ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { SheetClose, SheetFooter } from "./ui/sheet";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { toast } from "./ui/use-toast";
import { showToast } from "@/utils/toastHelper";

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
			return newSelectedIds;
		});
	};

	const handleSelectAllChange = () => {
		if (selectedIds.size === filteredData.length) {
			setSelectedIds(new Set());
		} else {
			const allIds = new Set(filteredData.map((item) => item.studentId));
			setSelectedIds(allIds);
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
			showToast("success", response.data.message);
			console.log(response);
		} catch (error: any) {
			showToast("error", error.message);
			console.error(error);
		}
	};

	return (
		<div className='flex flex-col mt-5 mx-6 h-[95%] relative'>
			{/* Search Bar */}
			<div className='mb-4 flex items-center justify-between flex-row-reverse'>
				<div className='flex items-center py-4 h-[10%] relative '>
					<Input
						placeholder='Search by name...'
						value={searchTerm}
						onChange={handleSearchChange}
						className='max-w-full placeholder:text-gray-400 w-64 border-lms-200'
						style={{ padding: 0, paddingLeft: "40px" }}
					/>
					<Search
						className='absolute left-3'
						size={20}
					/>
				</div>
				<h5 className='text-xl text-lmsPrimary font-semibold'>
					Total Unassigned Students
				</h5>
			</div>

			{/* Students Table */}
			<Table>
				<TableCaption>List of Unassigned Students</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[50px] px-5 py-0 font-bold text-lmsPrimary uppercase text-left'>
							<Checkbox
								checked={
									selectedIds.size === filteredData.length
								}
								onChange={handleSelectAllChange}
							/>
						</TableHead>
						<TableHead className='w-[100px] font-bold text-lmsPrimary uppercase text-left'>
							Roll No
						</TableHead>
						<TableHead className='font-bold text-lmsPrimary uppercase text-left'>
							Student Name
						</TableHead>
						<TableHead className='font-bold text-lmsPrimary uppercase text-left'>
							Parent Name
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredData.map((item, index) => (
						<TableRow
							key={item.studentId}
							className={`${
								index % 2 === 0 ? "bg-white" : "bg-lms-50"
							} font-medium tracking-wide text-sm text-lmsPrimary h-12 border`}
						>
							<TableCell className='w-[50px] border px-5 py-0 text-left'>
								<Checkbox
									checked={selectedIds.has(item.studentId)}
									onChange={() =>
										handleCheckboxChange(item.studentId)
									}
								/>
							</TableCell>
							<TableCell className='w-[100px] border px-5 py-0 text-left '>
								{item.rollNumber}
							</TableCell>
							<TableCell className='border px-5 py-0 text-left text-lmsAccent'>
								{item.studentName}
							</TableCell>
							<TableCell className='border px-5 py-0 text-left'>
								{item.parentName}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{/* Footer for Assign Button */}
			<div className='absolute bottom-2 w-full'>
				<SheetFooter>
					<SheetClose asChild>
						<Button
							variant={"lmsActive"}
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
