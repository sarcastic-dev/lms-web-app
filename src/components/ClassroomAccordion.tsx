"use client";
import React, { useState, useEffect } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, CircleUser, CircleUserRound, Plus } from "lucide-react";
import Link from "next/link";
import { Switch } from "antd";
import Drawer from "@/components/Drawer";
import EditStructure from "@/components/EditStructure";
import { Button } from "./ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { Stage } from "@/types";

const ClassroomAccordion: React.FC = () => {
	const url: string =
		"/classes/institute/97cb57e0-067c-4210-aba1-279fd577494e";
	const [data, setData] = useState<Stage[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	const fetchData = async () => {
		try {
			const response = await axiosInstance.get<Stage[]>(url);
			setData(response.data);
			setIsLoading(false);
		} catch (error) {
			if (error instanceof Error) {
				setError(error);
			}
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

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

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error instanceof Error) {
		return <div>Error loading data: {error.message}</div>;
	}

	const sortedData = Array.isArray(data)
		? data.sort((a, b) => b.stage.localeCompare(a.stage))
		: [];

	return (
		<div className='m-5'>
			<div className='flex flex-wrap items-center justify-between'>
				<h2 className='text-3xl text-gray-800 font-semibold'>
					Classroom Setup
				</h2>
				<div className='flex items-center'>
					<div>
						<span className='mr-4 font-semibold text-sm'>
							Show inactive classes
						</span>
						<Switch />
					</div>
					<Drawer
						title='Edit Classroom Structure'
						triggerText='Edit Structure'
					>
						<EditStructure />
					</Drawer>
				</div>
			</div>
			<div className='mt-12'>
				{sortedData.map((stage, stageIndex) => (
					<div
						key={stageIndex}
						className='mb-6'
					>
						<Accordion
							type='single'
							collapsible
							className='bg-gray-100 px-5 rounded-md'
						>
							<AccordionItem value={`item-${stageIndex}`}>
								<AccordionTrigger className='hover:no-underline font-semibold'>
									{stage.stage}
								</AccordionTrigger>
								<AccordionContent>
									{stage.classes.map((classItem) => (
										<div
											key={classItem.id}
											className='mb-6'
										>
											<Separator className='bg-gray-300 my-4' />
											<div className='flex items-center justify-between w-full mb-2'>
												<h1 className='font-medium text-base'>
													{classItem.name}
												</h1>
												<Button
													variant='ghost'
													onClick={() =>
														handleAddSection(
															classItem.id
														)
													}
												>
													<span className='flex items-center'>
														<Plus
															size={10}
															className='mr-2'
														/>
														Add New Section
													</span>
												</Button>
											</div>
											<div className='flex items-center flex-wrap gap-10'>
												{classItem.sections.map(
													(section) => (
														<div
															key={section.id}
															className='flex flex-col items-start justify-between w-64 h-32 bg-white p-4 rounded-md'
														>
															<div className='flex items-center justify-between w-full'>
																<h6 className='font-semibold ml-1'>
																	{
																		classItem.level
																	}{" "}
																	-{" "}
																	{
																		section.name
																	}
																</h6>
																<TooltipProvider>
																	<Tooltip>
																		<TooltipTrigger>
																			<CircleUserRound
																				size={
																					15
																				}
																			/>
																		</TooltipTrigger>
																		<TooltipContent className='bg-gray-700 text-white'>
																			<p className='text-[10px] font-light'>
																				No
																				class
																				teacher
																				is
																				assigned
																			</p>
																		</TooltipContent>
																	</Tooltip>
																</TooltipProvider>
															</div>

															<div className='flex items-center justify-between w-full'>
																<TooltipProvider>
																	<Tooltip>
																		<TooltipTrigger>
																			<div className='flex items-center justify-between bg-gray-200 w-12 h-5 px-1.5 rounded-md'>
																				<CircleUser
																					size={
																						16
																					}
																				/>
																				<p className='font-medium'>
																					0
																				</p>
																			</div>
																		</TooltipTrigger>
																		<TooltipContent className='bg-gray-700 text-white'>
																			<p className='text-[10px] font-light'>
																				0
																				Students
																			</p>
																		</TooltipContent>
																	</Tooltip>
																</TooltipProvider>
																<Link
																	href={
																		`/viewclass?sectionId=${section.id}&sectionName=${section.name}&classLevel=${classItem.level}`
																		
																	}
																>
																	<p className='flex items-center font-semibold text-blue-500'>
																		View{" "}
																		<span className='flex items-center justify-center pt-1'>
																			<ChevronRight
																				size={
																					17
																				}
																			/>
																		</span>
																	</p>
																</Link>
															</div>
														</div>
													)
												)}
											</div>
										</div>
									))}
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				))}
			</div>
		</div>
	);
};

export default ClassroomAccordion;
