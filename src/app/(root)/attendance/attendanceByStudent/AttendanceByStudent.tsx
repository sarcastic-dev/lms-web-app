"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import Cookies from "js-cookie";
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
import EmptyData from "../EmptyData";

export type Attendance = {
  date: string;
  status: string;
};

interface AttendanceByStudentProps {
  classSectionData: ClassResponse[];
}

interface Student {
  studentId: string;
  studentName: string;
  parentName: string;
  rollNumber: string;
}

interface StudentResponse {
  enrolled: Student[];
}

export const AttendanceByStudent: React.FC<AttendanceByStudentProps> = ({
  classSectionData,
}) => {
  const todayDate = new Date();
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState<Attendance[]>();
  const [studentsList, setStudentsList] = useState<Student[]>([]);

  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(todayDate.setDate(todayDate.getDate() + 7)),
    to: todayDate,
  });

  const fetchStudentsData = async (section: string) => {
    const instituteId = Cookies.get("instituteId");
    if (!instituteId) return;

    setLoading(true);

    try {
      const studentsResponse = await axiosInstance.get<StudentResponse>(
        `/classes/section-details?instituteId=${instituteId}&classLevel=${selectedClass}&section=${section}`
      );

      setStudentsList(studentsResponse.data.enrolled);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendanceData = async (studentId: string) => {
    if (!studentId) return;

    setLoading(true);

    try {
      // Fetch attendance data
      const attendanceResponse = await axiosInstance.get<Attendance[]>(
        `/attendances/student/${studentId}?startDate=${format(
          date?.from!,
          "yyyy-MM-dd"
        )}&endDate=${format(date?.to!, "yyyy-MM-dd")}`
      );
      console.log("Selected Student ID:", selectedStudent);

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
    setSelectedSection(value);
    fetchStudentsData(value);
  };

  const onStudentSelected = (value: string) => {
    setSelectedStudent(value); // Update the selected student
    fetchAttendanceData(value); // Fetch attendance data for the selected student
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
          Student Wise Attendance
        </h1>
      </div>
      <div className="flex flex-row justify-start space-x-5 mt-10 items-center px-14 lg:w-[520px] xl:w-[1200px]">
        <Select onValueChange={onSelectClass} value={selectedClass}>
          <SelectTrigger
            className={`h-10 w-[300px] border tracking-wider ${
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
            className={`h-10 w-[300px] border tracking-wider ${
              !selectedSection ? "text-lms-300 font-medium" : ""
            }`}
          >
            <SelectValue placeholder="Select Section" />
          </SelectTrigger>
          <SelectContent className="bg-white text-md tracking-wider">
            <SelectGroup>
              <SelectLabel>Section</SelectLabel>

              {sectionsData()?.sections.map((sectionObj, index) => (
                <SelectItem key={index} value={sectionObj.name}>
                  {sectionObj.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={onStudentSelected}
          value={selectedStudent}
          disabled={!selectedSection}
        >
          <SelectTrigger
            className={`h-10 w-[300px] border tracking-wider ${
              !selectedStudent ? "text-lms-300 font-medium" : ""
            }`}
          >
            <SelectValue placeholder="Select Student" />
          </SelectTrigger>
          <SelectContent className="bg-white text-md tracking-wider">
            <SelectGroup>
              <SelectLabel>Student</SelectLabel>

              {studentsList.map((sectionObj, index) => (
                <SelectItem key={index} value={sectionObj.studentId}>
                  {sectionObj.studentName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] p-6 rounded justify-start text-left font-normal",
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
      </div>
      <div className="mt-5">
        {!attendanceData ? (
          <EmptyData message={"Please select the above fields"} />
        ) : (
          <div className="border ml-14 mr-16 flex items-center h-10 space-x-10 pl-5">
            {/* Selected Class */}
            <label htmlFor="Selected Class" className="font-medium text-sm">
              <span className="font-bold">Selected Class:</span>{" "}
              {selectedClass || "N/A"}
            </label>

            {/* Selected Section */}
            <label htmlFor="Selected Section" className="font-medium text-sm">
              <span className="font-bold">Selected Section:</span>{" "}
              {selectedSection || "N/A"}
            </label>

            {/* Selected Student */}
            <label htmlFor="Selected Student" className="font-medium text-sm">
              <span className="font-bold">Student:</span>{" "}
              {studentsList.find(
                (student) => student.studentId === selectedStudent
              )?.studentName || "N/A"}
            </label>

            {/* Parent Name */}
            <label htmlFor="Parent Name" className="font-medium text-sm">
              <span className="font-bold">Parent Name:</span>{" "}
              {studentsList.find(
                (student) => student.studentId === selectedStudent
              )?.parentName || "N/A"}
            </label>

            {/* Roll Number */}
            <label htmlFor="Roll Number" className="font-medium text-sm">
              <span className="font-bold">Roll Number:</span>{" "}
              {studentsList.find(
                (student) => student.studentId === selectedStudent
              )?.rollNumber || "N/A"}
            </label>

            {/* Attendance Percentage */}
            {/* <label
              htmlFor="Attendance Percentage"
              className="font-medium text-sm"
            >
              <span className="font-semibold text-base">
                Attendance Percentage:
              </span>{" "}
              {attendanceData?.length
                ? `${(
                    (attendanceData.filter(
                      (attendance) => attendance.status === "Present"
                    ).length /
                      attendanceData.length) *
                    100
                  ).toFixed(2)}%`
                : "N/A"}
            </label> */}
          </div>
        )}
      </div>

      <div className="flex w-full">
        <div className="w-full">
          {attendanceData && (
            <DataTable
              columns={columns}
              data={attendanceData}
              isLoading={loading}
              searchColumn="date"
            />
          )}
        </div>
      </div>
    </div>
  );
};
