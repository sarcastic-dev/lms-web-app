import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { educationStages, Teachers } from "@/Constant";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { School } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import Cookies from "js-cookie";
const CreateClassroomModal: React.FC = () => {
	const [stage, setStage] = useState<string>("");
	const [className, setClassName] = useState<string>("");
	const [level, setLevel] = useState<string>("");
	// const [teacher, setTeacher] = useState<string>("");
	const instituteId = Cookies.get("instituteId");
	const handleStageChange = (value: string) => {
		setStage(value);
		setClassName("");
		setLevel("");
	};

	const handleClassChange = (className: string) => {
		const classData = educationStages
			.flatMap((stage) => stage.classes)
			.find((c) => c.name === className);

		if (classData) {
			setClassName(classData.name);
			setLevel(classData.level);
		} else {
			setClassName("");
			setLevel("");
		}
	};

	const handleCreateClassroom = async () => {
		const classroomData = {
			name: className,
			level: level,
			stage: stage,
			status: "active",
			instituteId: instituteId,
		};

		try {
			const response = await axiosInstance.post(
				"/classes", // /classes/bulk   /bulk/sections
				classroomData,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status !== 200) {
				throw new Error("Failed to create classroom");
			}

			console.log("Classroom created successfully");
		} catch (error) {
			console.error("Error creating classroom:", error);
		}
	};

	const filteredClasses =
		educationStages.find((s) => s.stage === stage)?.classes || [];

	return (
		<div className='flex flex-col h-[90vh]'>
			<div className='border h-[20%] flex items-center justify-center bg-blue-300 rounded-md'>
				<h3 className='text-5xl text-gray-700 font-semibold'>
					Classroom Setup
				</h3>
			</div>
			<div className='h-[20%] flex items-center mx-28'>
				<p className='mb-10 text-md text-center font-medium text-gray-600'>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit.
					Quas, architecto veritatis adipisci sunt ipsa, dolorem fuga
					consectetur dolores impedit molestias necessitatibus
					deleniti, vitae eligendi distinctio mollitia itaque
					excepturi tempora hic.
				</p>
			</div>
			<div className='h-[40%] flex justify-evenly'>
				<div className='flex flex-row items-center'>
					<Dialog>
						<DialogTrigger asChild>
							<Button
								variant={"outline"}
								className='text-lg w-56 text-gray-700'
							>
								<span>
									<School
										size={25}
										className='mr-2'
									/>
								</span>
								Create Classroom
							</Button>
						</DialogTrigger>
						<DialogContent className='sm:max-w-4xl'>
							<DialogHeader>
								<DialogTitle className='text-2xl font-bold mb-2'>
									Classroom
								</DialogTitle>
								<DialogDescription>
									Create a classroom, you can add teacher &
									student in further process.
								</DialogDescription>
							</DialogHeader>
							<div className='grid gap-4 py-4 w-full'>
								<div className='grid grid-cols-1 gap-4'>
									<Label
										htmlFor='stage'
										className='text-left'
									>
										Stage
									</Label>
									<Select onValueChange={handleStageChange}>
										<SelectTrigger className='w-full p-2 px-3 rounded-md border focus:outline-none'>
											<SelectValue placeholder='Select stage' />
										</SelectTrigger>
										<SelectContent>
											{educationStages.map((stage) => (
												<SelectItem
													key={stage.stage}
													value={stage.stage}
												>
													{stage.stage}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className='grid grid-cols-1 gap-4'>
									<Label
										htmlFor='class'
										className='text-left'
									>
										Class Name
									</Label>
									<Select onValueChange={handleClassChange}>
										<SelectTrigger className='w-full p-2 px-3 rounded-md border focus:outline-none'>
											<SelectValue placeholder='Select class' />
										</SelectTrigger>
										<SelectContent>
											{filteredClasses.map(
												(classData) => (
													<SelectItem
														key={classData.name}
														value={classData.name}
													>
														{classData.name}
													</SelectItem>
												)
											)}
										</SelectContent>
									</Select>
								</div>
								{/* <div className='grid grid-cols-1 gap-4'>
									<Label
										htmlFor='teacher'
										className='text-left'
									>
										Teacher
									</Label>
									<Select
										onValueChange={(value) =>
											setTeacher(value)
										}
									>
										<SelectTrigger className='w-full p-2 px-3 rounded-md border focus:outline-none'>
											<SelectValue placeholder='Select teacher' />
										</SelectTrigger>
										<SelectContent>
											{Teachers.map((teacher) => (
												<SelectItem
													key={teacher.id}
													value={teacher.name}
												>
													{teacher.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div> */}
							</div>
							<DialogFooter>
								<Button
									type='submit'
									onClick={handleCreateClassroom}
								>
									Create Classroom
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
				<div className='flex flex-row items-center'>
					<Button
						variant={"outline"}
						className='w-56 text-lg text-gray-700'
					>
						K To 12
					</Button>
				</div>
				<div className='flex flex-row items-center'>
					<Button
						variant={"outline"}
						className='w-56 text-lg text-gray-700'
					>
						K To 12
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CreateClassroomModal;
