"use client";
import { Chart } from "@/components/Chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import withAuthCheck from "@/components/withAuthCheck";
import {
	Bell,
	BellRing,
	CalendarDays,
	UserRoundX,
	Users,
	UsersRound,
} from "lucide-react";
import React from "react";

const page = () => {
	return (
		<div>
			<div className='flex items-center justify-between'>
				<h5 className='mx-6 my-3 font-bold text-lmsPrimary text-2xl'>
					Dashboard
				</h5>
				<Bell className='mr-6 text-lmsPrimary cursor-pointer' />
			</div>

			<Separator className='bg-lms-100' />
			<div className='mx-6 my-5 bg-blue-100 rounded-sm h-24 px-8 py-5 flex items-center justify-between shadow-sm'>
				<div className='space-y-2'>
					<Badge className='bg-lmsAccent rounded'>Holiday</Badge>
					<div className='flex items-center gap-x-3'>
						<h5 className='text-xl font-semibold text-lmsPrimary'>
							Raksha Bandhan (Rakhi)
						</h5>
						<p className='text-sm text-lmsSecondary font-medium flex items-center'>
							<CalendarDays
								size={15}
								className='mr-2'
							/>{" "}
							19 Aug 2024 - 20 Aug 2024
						</p>
					</div>
				</div>

				<div>
					<Button variant={"lmsActive"}>
						<BellRing
							size={18}
							className='mr-2'
						/>{" "}
						Send Greetings
					</Button>
				</div>
			</div>
			<div className='grid grid-cols-5 justify-items-center'>
				<div className='mx-6 my-5 bg-amber-100 h-40 w-40 rounded-sm py-3 px-5 flex flex-col justify-between'>
					<div className='w-10 h-10 bg-amber-400 flex items-center justify-center rounded'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 640 512'
							className='text-white w-6 h-6'
							fill='#fff'
						>
							<path d='M160 64c0-35.3 28.7-64 64-64L576 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64l-239.2 0c-11.8-25.5-29.9-47.5-52.4-64l99.6 0 0-32c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 32 64 0 0-288L224 64l0 49.1C205.2 102.2 183.3 96 160 96l0-32zm0 64a96 96 0 1 1 0 192 96 96 0 1 1 0-192zM133.3 352l53.3 0C260.3 352 320 411.7 320 485.3c0 14.7-11.9 26.7-26.7 26.7L26.7 512C11.9 512 0 500.1 0 485.3C0 411.7 59.7 352 133.3 352z' />
						</svg>
					</div>
					<div className='space-y-2'>
						<h6 className='text-lmsPrimary text-2xl font-semibold'>
							40
						</h6>
						<h5 className='text-amber-500 text-sm font-semibold'>
							Total Teachers
						</h5>
					</div>
				</div>

				<div className='mx-6 my-5 bg-sky-100 h-40 w-40 rounded-sm py-3 px-5 flex flex-col justify-between'>
					<div className='w-10 h-10 bg-sky-400 flex items-center justify-center rounded'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 448 512'
							className='text-white w-5 h-5'
							fill='#fff'
						>
							<path d='M219.3 .5c3.1-.6 6.3-.6 9.4 0l200 40C439.9 42.7 448 52.6 448 64s-8.1 21.3-19.3 23.5L352 102.9l0 57.1c0 70.7-57.3 128-128 128s-128-57.3-128-128l0-57.1L48 93.3l0 65.1 15.7 78.4c.9 4.7-.3 9.6-3.3 13.3s-7.6 5.9-12.4 5.9l-32 0c-4.8 0-9.3-2.1-12.4-5.9s-4.3-8.6-3.3-13.3L16 158.4l0-71.8C6.5 83.3 0 74.3 0 64C0 52.6 8.1 42.7 19.3 40.5l200-40zM111.9 327.7c10.5-3.4 21.8 .4 29.4 8.5l71 75.5c6.3 6.7 17 6.7 23.3 0l71-75.5c7.6-8.1 18.9-11.9 29.4-8.5C401 348.6 448 409.4 448 481.3c0 17-13.8 30.7-30.7 30.7L30.7 512C13.8 512 0 498.2 0 481.3c0-71.9 47-132.7 111.9-153.6z' />
						</svg>
					</div>
					<div className='space-y-2'>
						<h6 className='text-lmsPrimary text-2xl font-semibold'>
							1800
						</h6>
						<h5 className='text-sky-500 text-sm font-semibold'>
							Total Students
						</h5>
					</div>
				</div>

				<div className='mx-6 my-5 bg-purple-100 h-40 w-40 rounded-sm py-3 px-5 flex flex-col justify-between'>
					<div className='w-10 h-10 bg-purple-400 flex items-center justify-center rounded'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 640 512'
							className='text-white w-5 h-5'
							fill='#fff'
						>
							<path d='M337.8 5.4C327-1.8 313-1.8 302.2 5.4L166.3 96 48 96C21.5 96 0 117.5 0 144L0 464c0 26.5 21.5 48 48 48l208 0 0-96c0-35.3 28.7-64 64-64s64 28.7 64 64l0 96 208 0c26.5 0 48-21.5 48-48l0-320c0-26.5-21.5-48-48-48L473.7 96 337.8 5.4zM96 192l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64zM96 320l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64zM232 176a88 88 0 1 1 176 0 88 88 0 1 1 -176 0zm88-48c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-16 0 0-16c0-8.8-7.2-16-16-16z' />
						</svg>
					</div>
					<div className='space-y-2'>
						<h6 className='text-lmsPrimary text-2xl font-semibold'>
							300
						</h6>
						<h5 className='text-purple-400 text-sm font-semibold'>
							Total Classrooms
						</h5>
					</div>
				</div>

				<div className='mx-6 my-5 bg-green-100 h-40 w-40 rounded-sm py-3 px-5 flex flex-col justify-between'>
					<div className='w-10 h-10 bg-green-400 flex items-center justify-center rounded'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 512 512'
							className='text-white w-5 h-5'
							fill='#fff'
						>
							<path d='M160 96a96 96 0 1 1 192 0A96 96 0 1 1 160 96zm80 152l0 264-48.4-24.2c-20.9-10.4-43.5-17-66.8-19.3l-96-9.6C12.5 457.2 0 443.5 0 427L0 224c0-17.7 14.3-32 32-32l30.3 0c63.6 0 125.6 19.6 177.7 56zm32 264l0-264c52.1-36.4 114.1-56 177.7-56l30.3 0c17.7 0 32 14.3 32 32l0 203c0 16.4-12.5 30.2-28.8 31.8l-96 9.6c-23.2 2.3-45.9 8.9-66.8 19.3L272 512z' />
						</svg>
					</div>
					<div className='space-y-2'>
						<h6 className='text-lmsPrimary text-2xl font-semibold'>
							1400
						</h6>
						<h5 className='text-green-500  text-sm font-semibold'>
							Total Present
						</h5>
					</div>
				</div>
				<div className='mx-6 my-5 bg-red-100 h-40 w-40 rounded-sm py-3 px-5 flex flex-col justify-between'>
					<div className='w-10 h-10 bg-red-400 flex items-center justify-center rounded'>
						<UserRoundX
							className='text-white'
							strokeWidth={3}
							size={22}
						/>
					</div>
					<div className='space-y-2'>
						<h6 className='text-lmsPrimary text-2xl font-semibold'>
							400
						</h6>
						<h5 className='text-lmsError text-sm font-semibold'>
							Total Absent
						</h5>
					</div>
				</div>
			</div>

			<div className='mx-6 my-5'>
				<h5 className='text-2xl font-bold text-lmsPrimary'>
					Attendance
				</h5>
				<div className='grid grid-cols-2 gap-x-10'>
					<div className=' rounded-sm  min-h-[300px] p-5 space-y-5'>
						<h5 className='text-base font-semibold text-lmsSecondary'>
							Teacher Attendance
						</h5>
						<Chart />
					</div>
					<div className=' rounded-sm  min-h-[300px] p-5 space-y-5'>
						<h5 className='text-base font-semibold text-lmsSecondary'>
							Student Attendance
						</h5>
						<Chart />
					</div>
				</div>
			</div>
		</div>
	);
};

export default withAuthCheck(page);
