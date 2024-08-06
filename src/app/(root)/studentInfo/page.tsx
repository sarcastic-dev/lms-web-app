"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, UserPlus, CloudUpload, Download } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import columns from "./columns";

import { Input } from "@/components/ui/input";
import axios from "axios";
import axiosInstance from "@/lib/axiosInstance";
import { useDispatch } from "react-redux";
import { resetStudentData, setViewState } from "@/context/studentSlice";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/LmsDataTable";

const Page = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [file, setFile] = useState<File | null>(null);
	const [fileName, setFileName] = useState<string>("");
	const dispatch = useDispatch();
	const router = useRouter();

	const fetchStudentList = async () => {
		setLoading(true);
		const { data } = await axiosInstance.get(
			"/students/institute/97cb57e0-067c-4210-aba1-279fd577494e"
		);
		const filteredData = data.map((obj: any) => {
			const studentObj: any = {};

			const user = obj.basicInfo.user;
			const student = obj.basicInfo.student;

			studentObj.id = user.id;
			studentObj.name =
				user.firstName + " " + user.middleName + " " + user.lastName;
			studentObj.class = student.class + "-" + student.section;
			studentObj.contact = user.phone;
			studentObj.parentName = obj.parentInfo.name;
			studentObj.email = user.email;

			return studentObj;
		});
		setData(filteredData);
		setLoading(false);
	};

	useEffect(() => {
		fetchStudentList();
	}, []);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0]);
			setFileName(e.target.files[0].name); // Set file name
		}
	};

	const handleFileUpload = async () => {
		if (!file) {
			alert("Please select a file to upload.");
			return;
		}

		const formData = new FormData();
		formData.append("file", file);

		try {
			const response = await axiosInstance.post(
				"/students/bulk",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			console.log("File upload response:", response.data);

			fetchStudentList();
			router.push("/studentInfo");
		} catch (error) {
			console.error("File upload error:", error);
		}
	};

	const handleResetStaffData = () => {
		dispatch(resetStudentData());
		dispatch(setViewState("add"));
	};

	return (
		<div className='flex flex-col w-full h-screen my-4 space-y-4 2xl:px-16 2xl:py-2 xl:px-8 xl:py-2 lg:px-12 lg:py-4'>
			<div className='flex justify-between items-center'>
				<div>
					<h4 className='font-bold text-2xl text-lmsPrimary'>
						Student Information
					</h4>
				</div>
				<div className='flex justify-end items-center gap-3 rounded'>
					<Dialog>
						<DialogTrigger asChild>
							<Button
								variant={"lmsOutline"}
								size={"lms"}
							>
								<CloudUpload
									size={18}
									className='mr-2'
								/>{" "}
								Bulk Upload
							</Button>
						</DialogTrigger>
						<DialogContent className='sm:max-w-4xl h-[500px] px-12'>
							<DialogHeader className='mb-6'>
								<DialogTitle className='text-2xl text-lmsPrimary'>
									Bulk Update
								</DialogTitle>
							</DialogHeader>
							<div className='border border-dashed border-lmsAccent rounded-lg bg-lms-50'>
								<label className='col-span-3 w-full h-52 flex flex-col justify-center items-center cursor-pointer'>
									<CloudUpload
										className='text-lmsAccent mb-2 z-40'
										size={40}
									/>
									<span className='text-lms-500'>
										{fileName ? (
											<>
												Selected file:{" "}
												<span className='text-lmsAccent'>
													{fileName}
												</span>
											</>
										) : (
											<>
												Click{" "}
												<span className='text-lmsAccent'>
													here
												</span>{" "}
												to upload file
											</>
										)}
									</span>
									<Input
										id='file'
										type='file'
										className='hidden'
										accept='.xlsx, .csv'
										onChange={handleFileChange}
									/>
								</label>
							</div>
							<DialogFooter className='mt-10 flex justify-between items-center relative'>
								<Button
									type='submit'
									variant={"lms"}
									onClick={handleFileUpload}
								>
									Upload File
								</Button>
								<Button
									variant='link'
									className='absolute -left-5'
								>
									Download Sample List{" "}
									<Download
										className='ml-2'
										size={15}
									/>
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>

					<Link href={"/users?userType=student"}>
						<Button
							variant={"lms"}
							size={"lms"}
							onClick={handleResetStaffData}
						>
							<UserPlus
								size={18}
								className='mr-2'
							/>{" "}
							Add Student
						</Button>
					</Link>
				</div>
			</div>
			<Separator />

			<DataTable
				columns={columns}
				data={data}
				isLoading={loading}
			/>
		</div>
	);
};

export default Page;
