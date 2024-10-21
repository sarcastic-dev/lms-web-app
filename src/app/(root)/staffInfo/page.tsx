"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/newButton";
import Link from "next/link";
import Cookies from "js-cookie";
import { CloudUpload } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import columns from "./columns";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axiosInstance";
import { useDispatch } from "react-redux";
import { setViewState } from "@/context/staffSlice";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/LmsDataTable";
import { resetRegistrationData } from "@/context/staffRegistrationSlice";
import withAuthCheck from "@/components/withAuthCheck";
import useUser from "@/hooks/useUser";

// Define the base staff interface
interface Staff {
	id: string;
	name: string;
	contact: string;
	email: string;
	designation: string;
	department: string;
}

// Extend Staff to include 'role' for teachers
interface Teacher extends Staff {
	role: string;
}

const Page: React.FC = () => {
	const [teachingStaff, setTeachingStaff] = useState<Teacher[]>([]);
	const [nonTeachingStaff, setNonTeachingStaff] = useState<Staff[]>([]);
	const [file, setFile] = useState<File | null>(null);
	const [fileName, setFileName] = useState<string>("");
	const dispatch = useDispatch();
	const router = useRouter();

	const instituteId = Cookies.get("instituteId");

	const { userData, isLoading, isError } = useUser("staffs", instituteId);

	const fetchStaffList = async () => {
		if (userData) {
			const teachingStaffData: Teacher[] = [];
			const nonTeachingStaffData: Staff[] = [];

			userData.forEach((obj: any) => {
				const user = obj.basicInfo.user;
				const staff = obj.basicInfo.staff;

				const staffObj: Staff = {
					id: user.id,
					name: `${user.firstName} ${user.middleName} ${user.lastName}`,
					contact: user.phone,
					email: user.email,
					designation: staff.designation,
					department: staff.department,
				};

				// If the user is a teacher, include 'role'
				if (user.role === "teacher") {
					const teacherObj: Teacher = {
						...staffObj,
						role: user.role, // Include role for teacher
					};
					teachingStaffData.push(teacherObj);
				} else {
					nonTeachingStaffData.push(staffObj);
				}
			});

			setTeachingStaff(teachingStaffData);
			setNonTeachingStaff(nonTeachingStaffData);
		}
	};

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
				"/staffs/bulk",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			console.log("File upload response:", response.data);
			fetchStaffList();
			router.push("/staffInfo");
		} catch (error) {
			console.error("File upload error:", error);
		}
	};

	const handleResetStaffData = () => {
		dispatch(resetRegistrationData());
		dispatch(setViewState(null));
	};

	useEffect(() => {
		if (!isLoading && !isError) {
			fetchStaffList();
		}
	}, [isLoading, isError]);

	useEffect(() => {
		if (isLoading) {
			console.log("Loading staff data...");
		}

		if (isError) {
			console.error("Error fetching staff data:", isError);
		}
	}, [isLoading, isError]);
	return (
		<div className='flex flex-col'>
			<div className='h-20 flex items-center justify-between border-b border-lms-100 px-16'>
				<div>
					<h4 className='font-bold text-2xl text-lmsPrimary'>
						Staff Information
					</h4>
				</div>
				<div className='flex justify-end items-center gap-3 rounded'>
					<Dialog>
						<DialogTrigger asChild>
							<Button
								variant={"lmsOutline"}
								iconName='cloudUpload'
								size={"lmsHome"}
							>
								Bulk Upload
							</Button>
						</DialogTrigger>
						<DialogContent className='sm:max-w-4xl h-[500px] px-12'>
							<DialogHeader className='mb-6'>
								<DialogTitle className='text-2xl text-lmsPrimary'>
									Bulk Update
								</DialogTitle>
								<DialogDescription></DialogDescription>
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
									iconName='download'
									iconPosition='end'
									iconSize={15}
									className='absolute -left-5'
								>
									Download Sample List
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>

					<Link href={"/users?userType=staff"}>
						<Button
							variant={"lms"}
							size={"lmsHome"}
							iconName='userPlus'
							onClick={handleResetStaffData}
						>
							Add Staff
						</Button>
					</Link>
				</div>
			</div>
			<div className=''>
				<Tabs defaultValue='teaching'>
					<div className='flex justify-between items-center'>
						<TabsList className='rounded bg-slate-200 mx-16 mt-6'>
							<TabsTrigger
								value='teaching'
								className='rounded data-[state=active]:bg-lmsAccent data-[state=active]:text-white data-[state=active]:shadow-sm text-lmsSecondary font-semibold w-40'
							>
								Teaching Staff
							</TabsTrigger>
							<TabsTrigger
								value='non-teaching'
								className='rounded data-[state=active]:bg-lmsAccent data-[state=active]:text-white data-[state=active]:shadow-sm text-lmsSecondary font-semibold w-40'
							>
								Non-Teaching Staff
							</TabsTrigger>
						</TabsList>
					</div>
					<TabsContent value='teaching'>
						{isError ? (
							<p>Error loading data.</p>
						) : (
							<DataTable
								columns={columns}
								data={teachingStaff}
								isLoading={isLoading}
								headingText={`Total Teaching Staff (${
									teachingStaff.length || 0
								})`}
								searchColumn='name'
							/>
						)}
					</TabsContent>
					<TabsContent value='non-teaching'>
						{isError ? (
							<p>Error loading data.</p>
						) : (
							<DataTable<Staff, unknown> // Ensure DataTable is expecting Staff type
								columns={columns}
								data={nonTeachingStaff}
								isLoading={isLoading}
								headingText={`Total Non-Teaching Staff (${
									nonTeachingStaff.length || 0
								})`}
								searchColumn='name'
							/>
						)}
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default withAuthCheck(Page);
