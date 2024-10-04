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
import axiosInstance from "@/lib/axiosInstance";
import columns from "./columns";

interface Attendance {
  attendanceRecords: {
    studentName: string;
    fatherName: string;
    status: string;
  }[];
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
  const [loading, setLoading] = useState(true);

  const fetchAttendanceData = async () => {
    const instituteId = Cookies.get("instituteId");
    if (!instituteId) return;

    setLoading(true);

    try {
      // Fetch attendance data
      const attendanceResponse = await axiosInstance.get<AttendanceResponse>(
        `/attendances/records-by-date?date=${format(
          date,
          "yyyy-MM-dd"
        )}&instituteId=${instituteId}`,
      );

      // console.log("Attendance Response:", attendanceResponse.data);
      setData(attendanceResponse.data.sections || []);
      // console.log(attendanceResponse.data.sections);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [date]);

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
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={handleDateSelect} />
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <div>
      {" "}
      {/* <div className="w-full h-screen my-4 space-y-4 2xl:px-5 2xl:py-3 xl:px-8 xl:py-2 lg:px-12 lg:py-4"> */}
      <div className="flex justify-center items-center">
        <h1 className="py-4 font-bold text-xl text-lmsPrimary">
          Detailed Attendance Report
        </h1>
      </div>
      {/* </div> */}
      <div className="flex w-full">
        <div className="w-full">
          <DataTable
            columns={columns} // Your columns should match the new fields
            data={data}
            isLoading={loading}
            headingText={`Total Sections (${data.length})`}
            buttonComponent={datePicker}
            searchColumn="className"
          />
        </div>
      </div>
    </div>
  );
};

export default AllSectionsAttendance;
