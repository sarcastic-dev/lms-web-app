import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { attendanceOverview, detailedReport, insights } from "@/Constant";
import { Laugh } from "lucide-react";

const page = () => {
  return (
    <div className="m-5">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="text-3xl text-gray-800 font-semibold">
          Student Attendance
        </h2>
        {/* <div className="flex items-center">
          <div className='flex items-center'>
            <span className="mr-4 font-semibold text-sm">
              Show class Attendance
            </span>
            <Switch />
          </div>
          <Button className="ml-5" variant={"secondary"}>
            Edit Structure
          </Button>
        </div> */}
      </div>
      <div className="bg-gray-50 p-10 mt-5">
        <div>
          <h1 className="text-2xl mb-5 text-gray-800 font-semibold">
            Attendance Overview
          </h1>
        </div>
        <div className="flex space-x-5">
          <div className="w-fit h-fit grid grid-cols-2 gap-x-3 gap-y-5">
            {attendanceOverview.map((item, index) => (
              <Card key={index} className="w-48 flex flex-col items-center">
                <CardHeader>
                  <CardTitle className="text-md text-gray-400">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className={`text-2xl font-semibold ${item.color}`}>
                  <p>{item.data}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div>
            <Card className="w-[710px]">
              <CardHeader>
                <CardTitle>Insights</CardTitle>
              </CardHeader>
              {insights.map((item, index) => (
                <CardContent key={index}>
                  <p
                    className={`flex p-[10px] text-sm font-medium text-gray-600 rounded-md ${item.bgColor}`}
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
        <div>
          <h1 className="text-2xl mt-10 text-gray-800 font-semibold">
            Detailed Report
          </h1>
        </div>
        <div className="flex justify-between w-full mt-5">
          {detailedReport.map((item, index) => (
            <div key={index}>
              <p
                className="p-5 rounded-sm font-medium text-gray-400"
              >
                {item.title}
              </p>

              <p className="p-5 rounded-sm font-medium text-gray-800">
                {item.data}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
