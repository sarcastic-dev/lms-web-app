"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { DataTable } from "@/components/LmsDataTable";

import axiosInstance from "@/lib/axiosInstance";
import { DateRange } from "react-day-picker";
import columns from "./columns";
import { ClassResponse } from "../page";

export type Attendance = {
  studentId: string;
  studentName: string;
  parentName: string;
  daysPresent: number;
  daysAbsent: number;
  attendancePercentage: number;
};

interface AttendanceResponse {
  sectionId: string;
  sectionName: string;
  classId: string;
  className: string;
  totalStudents: number;
  totalDaysInSession: number;
  averageAttendancePercentage: number;
  detailedAttendance: Attendance[];
}

interface AttendanceSummaryBySectionProps {
  classSectionData: ClassResponse[];
}

export const AttendanceSummaryBySection: React.FC<
  AttendanceSummaryBySectionProps
> = ({ classSectionData }) => {
  const todayDate = new Date();
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState<AttendanceResponse>();

  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(todayDate.setDate(todayDate.getDate() + 7)),
    to: todayDate,
  });

  const fetchAttendanceData = async (sectionId: string) => {
    if (!sectionId) return;

    setLoading(true);

    try {
      // Fetch attendance data
      const attendanceResponse = await axiosInstance.get<AttendanceResponse>(
        `/attendances/summary?startDate=${format(
          date?.from!,
          "yyyy-MM-dd"
        )}&endDate=${format(date?.to!, "yyyy-MM-dd")}&sectionId=${sectionId}`
      );

      setAttendanceData(attendanceResponse.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSelectClass = (value: string) => {
    setSelectedClass(value);
  };

  const onSelectSection = (value: string) => {
    console.log("valueee=>", value);
    setSelectedSection(value);
    fetchAttendanceData(value);
    // fetchAttendanceData();
  };

  const sectionsData = () => {
    return classSectionData.find(
      (classObj: ClassResponse) => classObj.level === selectedClass
    );
  };

  return (
    <div className="mt-4">
      <div className="flex justify-center items-center">
        <h1 className="py-4 font-bold text-xl text-lmsPrimary">
          Section Wise Students Attendance
        </h1>
      </div>
      <div className="flex flex-row justify-start mt-10 items-center px-14 lg:w-[520px] xl:w-[700px]">
        {/* <div className="w-full">
          
        </div> */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <Select onValueChange={onSelectClass} value={selectedClass}>
          <SelectTrigger
            className={`h-10 border tracking-wider ${
              !selectedClass ? "text-lms-300 font-medium" : ""
            }`}
          >
            <SelectValue placeholder="Select Class" />
          </SelectTrigger>
          <SelectContent className="bg-white text-md tracking-wider">
            <SelectGroup>
              <SelectLabel>Class</SelectLabel>
              {classSectionData.map((classObj, index) => (
                <SelectItem key={index} value={classObj.level}>
                  {classObj.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={onSelectSection}
          value={selectedSection}
          disabled={!selectedClass}
        >
          <SelectTrigger
            className={`h-10 border tracking-wider ${
              !selectedClass ? "text-lms-300 font-medium" : ""
            }`}
          >
            <SelectValue placeholder="Select Class" />
          </SelectTrigger>
          <SelectContent className="bg-white text-md tracking-wider">
            <SelectGroup>
              <SelectLabel>Section</SelectLabel>

              {sectionsData()?.sections.map((sectionObj, index) => (
                <SelectItem key={index} value={sectionObj.id}>
                  {sectionObj.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-full">
        <div className="w-full">
          {attendanceData?.detailedAttendance && (
            <DataTable
              columns={columns}
              data={attendanceData?.detailedAttendance!}
              isLoading={loading}
              headingText={`Total Students (${attendanceData.detailedAttendance.length})`}
            />
          )}
        </div>
      </div>
    </div>
  );
};
