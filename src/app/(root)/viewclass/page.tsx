"use client";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import Drawer from "@/components/Drawer";
import AddTeacher from "@/components/AddTeacher";
import AddStudent from "@/components/AddStudent";
import { useSearchParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";

const Page = () => {
	const searchParams = useSearchParams();
	const sectionId: string | null = searchParams.get("sectionId");
	const sectionName: string | null = searchParams.get("sectionName");
	const classLevel: string | number | null = searchParams.get("classLevel");

	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [fullData, setFullData] = useState([]);

	const fetchClassData = async () => {
		setIsLoading(true);
		try {
			const { data } = await axiosInstance.get(
				`/classes/section-details?instituteId=97cb57e0-067c-4210-aba1-279fd577494e&classLevel=${classLevel}&section=${sectionName}`
			);
			console.log(data)
			setFullData(data.unenrolled);
			const filteredData = data?.enrolled?.map((obj: any) => {
				const enrolledStudentObj: any = {};
				enrolledStudentObj.studentName = obj?.studentName;
				enrolledStudentObj.parentName = obj?.parentName;
				enrolledStudentObj.class = `${classLevel} - ${sectionName}`;
				enrolledStudentObj.rollNumber = obj?.rollNumber;
				return enrolledStudentObj;
			});
			setData(filteredData);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.error(error);
		}
	};

	useEffect(() => {
		fetchClassData();
	}, []); 
	return (
		<div className='m-3'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center space-x-2'>
					<h3 className='text-2xl font-bold'>{`${classLevel} - ${sectionName}`}</h3>
					<Pencil
						size={15}
						color='blue'
					/>
				</div>
				<Trash2
					size={20}
					color='red'
				/>
			</div>

			<div className='flex flex-col p-5 mt-5 w-full h-fit bg-gray-50 rounded shadow-lg overflow-hidden'>
				<div className='flex items-center justify-center p-2 bg-orange-100 w-16 rounded'>
					<p className='text-[10px] font-semibold text-orange-400'>
						Pending
					</p>
				</div>
				<p className='mt-3 text-sm font-bold'>{`Manage class teacher, attendance for ${classLevel} - ${sectionName}`}</p>
				<p className='mt-2 text-xs text-gray-400 font-medium'>
					Class teacher is responsible for day to day activities of
					the class
				</p>
			</div>

			<div className='flex mt-[2px] bg-gray-50 w-full rounded shadow-lg overflow-hidden'>
				<Drawer
					title='Assign Teacher To Classroom'
					triggerText='Add Teacher'
				>
					<AddTeacher
						sectionId={sectionId}
						fetchSectionDetails={fetchClassData}
					/>
				</Drawer>
			</div>

			<div className='flex flex-col p-5 mt-5 w-full h-fit bg-gray-50 rounded shadow-lg overflow-hidden'>
				<p className='text-sm font-bold'>{`Manage students for ${classLevel} - ${sectionName}`}</p>
				<p className='mt-2 text-xs text-gray-400 font-medium'>
					Add or remove students for the class
				</p>
			</div>

			<div className='flex mt-[2px] bg-gray-50 w-full rounded shadow-lg overflow-hidden'>
				<Drawer
					title='Assign Student To Classroom'
					triggerText='Add Students'
				>
					<AddStudent
						students={fullData}
						sectionId={sectionId}
						fetchSectionDetails={fetchClassData}
					/>
				</Drawer>
			</div>

			<div className='flex mt-5 bg-gray-50 w-full rounded'>
				<DataTable
					columns={columns}
					data={data}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
};

export default Page;
