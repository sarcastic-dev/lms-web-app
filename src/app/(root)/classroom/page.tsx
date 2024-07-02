"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Switch } from "antd";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { CircleUserRound, Plus, User } from "lucide-react";
import Drawer from "@/components/Drawer";
import AddTeacher from "@/components/AddTeacher";
import EditStructure from "@/components/EditStructure";

const Page = () => {
	return (
		<div className='m-5'>
			<div className='flex flex-wrap items-center justify-between'>
				<h2 className='text-3xl text-gray-800 font-semibold'>
					Classroom Setup
				</h2>
				<div className='flex items-center'>
					<div className="mr-4">
						<span className='mr-4 font-semibold text-sm'>
							Show inactive classes
						</span>
						<Switch />
					</div>
					<div>
						<Drawer title="Edit Structure" triggerText = {"Edit Structure"}>
							<EditStructure/>
						</Drawer>
					</div>
				</div>
			</div>
			<div className='mt-12'>
				<Accordion
					type='single'
					collapsible
					className='bg-blue-50 px-5 rounded-md'
				>
					<AccordionItem value='item-1'>
						<AccordionTrigger className='hover:no-underline font-semibold'>
							Senior Secondary
						</AccordionTrigger>
						<AccordionContent className=''>
							<Separator className='bg-gray-400' />
							<div className='flex items-start justify-center flex-col mb-4 py-2 '>
								<div className='flex items-center justify-between w-full mb-2'>
									<h1 className='font-medium text-base '>
										Class - 12
									</h1>
									<Button variant='ghost'>
										<span className='flex items-center'>
											<Plus
												size={10}
												className='mr-2'
											/>
											Add New Section
										</span>
									</Button>
								</div>
								<div className='flex items-center justify-start'>
									<div className='w-64 h-24 bg-white p-3 rounded-md flex flex-col items-start justify-between'>
										<div className='flex items-center justify-between'>
											<h6>12 - A</h6>
											<CircleUserRound size={15} />
										</div>
										<div className='flex items-center justify-between'>
											<User />
											<div>
												<Drawer
													title={
														"Assign Teacher To Classroom"
													}
													triggerText={"Add Teacher"}
													// buttonTitle='efewfewf'
												>
													{/* <AddStudent /> */}
													<AddTeacher/>
												</Drawer>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* <Separator /> */}
							{/* <div>Hii</div> */}
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
};

export default Page;
