"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { Stage } from "@/types";
import { colorPalette, educationStages } from "@/Constant";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import withAuthCheck from "@/components/withAuthCheck";
import MultiSelectCardGrid from "@/components/MultiSelectCard";
import { getStagesArray } from "@/utils/commonFunction";
import { Progress } from "@/components/ui/progress";

type Stages =
	| "Secondary Stage"
	| "Pre Primary Stage"
	| "Middle Stage"
	| "Senior Secondary Stage"
	| "Primary Stage";

const Page: React.FC = () => {
	const [data, setData] = useState<Stage[]>([]);
	const router = useRouter();
	const [progress, setProgress] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [stages, setStages] = useState<Stages[]>([]);

	React.useEffect(() => {
		if (isLoading) {
			const timer = setInterval(() => {
				setProgress((oldProgress) => {
					if (oldProgress === 100) {
						clearInterval(timer);
						return oldProgress;
					}
					const diff = Math.random() * 20; // Random increment to simulate progress
					return Math.min(oldProgress + diff, 100);
				});
			}, 500);
			return () => clearInterval(timer);
		}
	}, [isLoading]);

	// Fetching data with a progress loader
	const fetchData = async () => {
		try {
			setIsLoading(true); // Start loader
			const instituteId = Cookies.get("instituteId");
			const { data } = await axiosInstance.get<Stage[]>(
				`/classes/institute/${instituteId}`
			);
			const stagesData = getStagesArray(data); // Assuming this is a helper function
			setStages(stagesData);
			setData(data);
		} catch (error) {
			console.error("Error fetching data", error);
		} finally {
			setProgress(100); // Ensure progress reaches 100 once fetching is done
			setIsLoading(false); // End loader
		}
	};
	// Log stages after it updates
	useEffect(() => {}, [stages]);
	const handleAddSection = async (id: string) => {
		try {
			const res = await axiosInstance.post("/sections", {
				classId: id,
			});
			console.log(res);
			fetchData();
		} catch (error) {
			console.log(error);
		}
	};

	const handleViewClass = (
		sectionId: string,
		sectionName: string,
		classLevel: string
	) => {
		router.push(
			`/viewclass?sectionId=${sectionId}&sectionName=${sectionName}&classLevel=${classLevel}`
		);
	};

	const constantStages = getStagesArray(educationStages);

	useEffect(() => {
		fetchData();
	}, []);

	const stagesOrder = [
		"Pre Primary Stage",
		"Primary Stage",
		"Middle Stage",
		"Secondary Stage",
		"Senior Secondary Stage",
	];

	const prePrimaryOrder = ["Pre-Nursery", "Nursery", "LKG", "UKG"];

	// Function to sort the stages and classes
	function sortStagesAndClasses(data: Stage[]): Stage[] {
		// Sort the stages based on predefined order
		const sortedStages = data.sort((a, b) => {
			return stagesOrder.indexOf(a.stage) - stagesOrder.indexOf(b.stage);
		});

		// Sort classes within each stage
		sortedStages.forEach((stage) => {
			if (stage.stage === "Pre Primary Stage") {
				// For Pre Primary Stage, sort by predefined order of class names
				stage.classes.sort((a, b) => {
					return (
						prePrimaryOrder.indexOf(a.name) -
						prePrimaryOrder.indexOf(b.name)
					);
				});
			} else {
				// For other stages, sort by numeric level
				stage.classes.sort((a, b) => {
					return parseInt(a.level) - parseInt(b.level);
				});
			}
		});

		return sortedStages;
	}

	const sortedData = sortStagesAndClasses(data);

	return (
		<>
			{isLoading ? (
				<div className='flex flex-col items-center justify-center min-h-screen '  >
					{/* Show the progress bar when data is being fetched */}
					<Progress
						value={progress}
						className='w-80 h-2 bg-lmsAccent'
					/>
					<p className='text-center mt-2 text-sm text-gray-500'>
						Loading...
					</p>
				</div>
			) : (
				<div className='flex flex-col'>
					<div className='h-20 flex items-center justify-between border-b border-lms-100 px-16'>
						<h4 className='font-bold text-lmsPrimary text-2xl'>
							Classroom
						</h4>
						<div>
							{!(constantStages.length === stages.length) && (
								<MultiSelectCardGrid
									fetchData={fetchData}
									stages={stages}
								/>
							)}
						</div>
					</div>

					{sortedData.map((stage, stageIndex) => (
						<div
							className='mx-16 my-4'
							key={stageIndex}
						>
							<div className='mb-6'>
								<h5 className='font-semibold text-xl text-lmsPrimary'>
									{stage.stage}
								</h5>
							</div>

							<div className='flex flex-row items-center flex-wrap gap-9'>
								{stage.classes.map((classData, classIndex) => {
									const color =
										colorPalette[
											classIndex % colorPalette.length
										];
									return (
										<div
											className={`bg-white p-4 shadow-md rounded-md w-80 ${color.shadowColor} outline outline-1 ${color.outlineColor}`}
											key={classData.id}
										>
											<div className='flex items-center justify-between'>
												<h3 className='text-lg text-lmsPrimary font-medium mb-4'>
													{classData.name}
												</h3>
												<div className='mb-4'>
													<DropdownMenu>
														<DropdownMenuTrigger
															asChild
															className='rounded'
														>
															<Button
																variant='ghost'
																iconName='EllipsisVertical'
																className='border-none bg-none py-0 px-0 hover:bg-white'
															></Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent
															align='start'
															className='w-[150px] -mt-3'
														>
															<DropdownMenuGroup>
																<DropdownMenuItem
																	onClick={() =>
																		handleAddSection(
																			classData.id
																		)
																	}
																	className='text-lmgSecondary font-semibold text-xs'
																>
																	<DropdownMenuGroup>
																		<DropdownMenuItem
																			onClick={() =>
																				handleAddSection(
																					classData.id
																				)
																			}
																			className='text-lmgSecondary font-semibold text-xs'
																		>
																			<Plus
																				size={
																					15
																				}
																				className='mr-2'
																			/>{" "}
																			Add
																			Section
																		</DropdownMenuItem>

																		<DropdownMenuSeparator />

																		<DropdownMenuItem className='text-red-600 font-semibold text-xs'>
																			<Trash2
																				size={
																					15
																				}
																				className='mr-2'
																			/>{" "}
																			Delete
																			Section
																		</DropdownMenuItem>
																	</DropdownMenuGroup>
																</DropdownMenuItem>
															</DropdownMenuGroup>
														</DropdownMenuContent>
													</DropdownMenu>
												</div>
											</div>

											<div className='grid grid-cols-2 gap-4'>
												{classData.sections.map(
													(section: any) => (
														<Button
															key={section.id}
															variant={
																"lmsOutline"
															}
															className={`h-9 ${color.bgColor} text-lmsSecondary outline-transparent`}
															onClick={() =>
																handleViewClass(
																	section.id,
																	section.name,
																	classData.level
																)
															}
														>
															{`Section ${section.name}`}
														</Button>
													)
												)}
											</div>
										</div>
									);
								})}
							</div>
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default withAuthCheck(Page);
