"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { DataTable } from "@/components/LmsDataTable";
import columns from "./columns";
import Cookies from "js-cookie";
import axiosInstance from "@/lib/axiosInstance";

// Update the Attendance interface to match your API response fields
interface Attendance {
  attendanceRecords: string;
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

const Page = () => {
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
        `http://16.170.155.154:3300/attendances/records-by-date?date=${format(
          date,
          "yyyy-MM-dd"
        )}&instituteId=${instituteId}`
      );

      console.log("Attendance Response:", attendanceResponse.data);
      setData(attendanceResponse.data.sections || []);
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

  const fetchSectionDetails = (sectionId: string) => {
    const section = data.find((section) => section.sectionId === sectionId);
    return section ? section.attendanceRecords : [];
  };

  const getSectionDetailsFetcher = (sectionId: string) => () =>
    fetchSectionDetails(sectionId);

  return (
    <div className="w-full h-screen my-4 space-y-4 2xl:px-5 2xl:py-3 xl:px-8 xl:py-2 lg:px-12 lg:py-4">
      <div className="flex justify-center items-center">
        <h1 className="py-4 font-bold text-xl text-lmsPrimary">
          Detailed Attendance Report
        </h1>
      </div>
      <div className="flex justify-start items-center px-14 lg:w-[520px] xl:w-[700px]">
        <div className="w-full">
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
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex w-full">
        <div className="w-full">
          <DataTable
            columns={columns} // Your columns should match the new fields
            data={data}
            isLoading={loading}
            students={[]}
            sectionId={null}
            fetchSectionDetails={getSectionDetailsFetcher(sectionId)} // This will work as a function without arguments
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
