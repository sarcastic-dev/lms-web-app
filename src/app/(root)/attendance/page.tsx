"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  attendanceOverview,
  Class,
  detailedReport,
  insights,
  Section,
} from "@/Constant";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { DataTable } from "@/components/LmsDataTable";
import columns from "../studentInfo/columns";
import axiosInstance from "@/lib/axiosInstance";

const Page = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const fetchStudentList = async () => {
    if (!selectedClass || !selectedSection) return;

    setLoading(true);

    const { data } = await axiosInstance.get(
      `/students/institute/97cb57e0-067c-4210-aba1-279fd577494e?class=${selectedClass}&section=${selectedSection}&date=${format(
        date,
        "yyyy-MM-dd"
      )}`
    );
    
    const filteredData = data.map((obj: any) => {
      const studentObj: any = {};

      const user = obj.basicInfo.user;
      const student = obj.basicInfo.student;

      studentObj.id = user.id;
      studentObj.name =
        user.firstName + " " + user.middleName + " " + user.lastName;
      studentObj.class = student.class + "-" + student.section;
      studentObj.contact = user.phone;
      studentObj.parentName = obj.parentInfo.name;
      studentObj.email = user.email;

      return studentObj;
    });

    setData(filteredData);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedClass && selectedSection) {
      fetchStudentList();
    }
  }, [selectedClass, selectedSection, date]);

  const handleDateSelect = (day: Date | undefined) => {
    if (day) {
      setDate(day);
    }
  };

  return (
    <div className=" w-full h-screen my-4 space-y-4 2xl:px-16 2xl:py-3 xl:px-8 xl:py-2 lg:px-12 lg:py-4">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="font-bold text-2xl text-lmsPrimary">
          Student Attendance
        </h2>
      </div>

      <div className="bg-gray-50 p-5">
        <div>
          <h1 className="py-4 font-bold text-xl text-lmsPrimary">
            Attendance Overview
          </h1>
        </div>

        <div className="flex space-x-5">
          <div className="w-fit h-fit grid grid-cols-2 gap-x-3 gap-y-5">
            {attendanceOverview.map((item, index) => (
              <Card key={index} className={`lg:w-28  xl:w-36 2xl:w-40 flex flex-col justify-center items-center ${item.backgroundColor}`}>
                <CardHeader className="flex text-center justify-center items-center">
                  <CardTitle className={`lg:text-xs xl:text-sm 2xl:text-md ${item.headingColor} `}>
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent
                  className={`lg:text-lg xl:text-xl 2xl:text-2xl font-semibold ${item.color}`}
                >
                  <p>{item.data}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <Card className="lg:w-[400px] xl:w-[550px] 2xl:w-[650px]">
              <CardHeader>
                <CardTitle>Insights</CardTitle>
              </CardHeader>
              {insights.map((item, index) => (
                <CardContent key={index}>
                  <p
                    className={`flex lg:p-[11px] xl:p-[8px] 2xl:p-[9px] text-sm font-medium text-gray-600 rounded-md ${item.bgColor}`}
                  >
                    <span className={`mr-3 ${item.color}`}>
                      {<item.emoji />}
                    </span>
                    {item.content}
                  </p>
                </CardContent>
              ))}
            </Card>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="py-4 font-bold text-xl text-lmsPrimary">
          Detailed Report
        </h1>
        <div className="flex justify-around items-center space-x-5 lg:w-[520px] xl:w-[700px]">
          <div className="w-full">
            <Select
              onValueChange={setSelectedClass}
              value={selectedClass || ""}
            >
              <SelectTrigger className={`border w-full tracking-wider `}>
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Class</SelectLabel>
                  {Class.map((item, index) => (
                    <SelectItem key={index} value={item.value}>
                      {item.option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full">
            <Select
              onValueChange={setSelectedSection}
              value={selectedSection || ""}
            >
              <SelectTrigger className={`border w-full tracking-wider `}>
                <SelectValue placeholder="Select Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Section</SelectLabel>
                  {Section.map((item, index) => (
                    <SelectItem key={index} value={item.value}>
                      {item.option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

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
                <Select
                  onValueChange={(value) =>
                    setDate(addDays(new Date(), parseInt(value)))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Date Range" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="0">Today</SelectItem>
                    <SelectItem value="1">Yesterday</SelectItem>
                    <SelectItem value="3">In a week</SelectItem>
                    <SelectItem value="7">In a Month</SelectItem>
                  </SelectContent>
                </Select>
                <div className="rounded-md border">
                  <Calendar mode="single" selected={date} onSelect={handleDateSelect} />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="flex justify-between w-full mt-5">
        <div className="w-full">
          {selectedClass && selectedSection && (
            <DataTable columns={columns} data={data} isLoading={loading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
