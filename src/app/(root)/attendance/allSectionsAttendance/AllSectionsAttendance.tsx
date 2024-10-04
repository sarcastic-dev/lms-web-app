import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { DataTable } from "@/components/LmsDataTable";

import { format } from "date-fns";
import Cookies from "js-cookie";
import columns from "./columns";
import useAttendance from "@/hooks/useAttendance";

interface Attendance {
	attendanceRecords: {
		studentName: string;
		fatherName: string;
		status: string;
	}[]; // Define attendance record structure
	classId: string;
	className: string;
	sectionId: string;
	sectionName: string;
	totalStudents: number;
	totalPresent: number;
	totalAbsent: number;
	totalLate: number;
}

interface AttendanceResponse {
	sections: Attendance[];
}

const AllSectionsAttendance = () => {
	const [date, setDate] = useState<Date>(new Date());
	const [data, setData] = useState<Attendance[]>([]);

	const instituteId = Cookies.get("instituteId");

	const formatDate = format(date, "yyyy-MM-dd");
	const { attendanceData, isLoading, isError } = useAttendance(
		formatDate,
		instituteId
	);

	const fetchAttendanceData = async () => {
		try {
			setData(attendanceData.sections || []);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		if (!isLoading && !isError) {
			fetchAttendanceData();
		}
	}, [isLoading, isError]);

	const handleDateSelect = (day: Date | undefined) => {
		if (day) {
			setDate(day);
		}
	};

	const datePicker = (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"lg:w-[180px] xl:w-[280px] lg:p-4 xl:p-6 rounded border-lms-200 justify-start text-left font-normal",
						!date && "text-muted-foreground"
					)}
				>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{date ? format(date, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='flex w-auto flex-col space-y-2 p-2'>
				<div className='rounded-md border'>
					<Calendar
						mode='single'
						selected={date}
						onSelect={handleDateSelect}
					/>
				</div>
			</PopoverContent>
		</Popover>
	);

	return (
		<div>
			{" "}
			{/* <div className="w-full h-screen my-4 space-y-4 2xl:px-5 2xl:py-3 xl:px-8 xl:py-2 lg:px-12 lg:py-4"> */}
			<div className='flex justify-center items-center'>
				<h1 className='py-4 font-bold text-xl text-lmsPrimary'>
					Detailed Attendance Report
				</h1>
			</div>
			{/* </div> */}
			<div className='flex w-full'>
				<div className='w-full'>
					{isError ? (
						<p>Error loading data.</p>
					) : (
						<DataTable
							columns={columns} // Your columns should match the new fields
							data={data}
							isLoading={isLoading}
							headingText={`Total Sections (${data.length || 0})`}
							buttonComponent={datePicker}
							searchColumn='className'
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default AllSectionsAttendance;
