"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, UserPlus } from "lucide-react";
import { DataTable } from "./data-table";
import columns from "./columns";
import axios from "axios";

axios.defaults.baseURL = "http://16.170.155.154:3300/api";

const Page = () => {
  const [data, setData] = useState([]);

  const fetchStudentList = async () => {
    const { data } = await axios.get("/students");

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
      return studentObj;
    });
    console.log("filteredData", filteredData);
    setData(filteredData);
  };

  const viewStudent = async () => {
    const { data } = await axios.get("/students/:id");
  };

  useEffect(() => {
    fetchStudentList();
  }, []);

  return (
    <div className="flex flex-col w-full h-screen space-y-8">
      <div>
        <h1 className="font-semibold text-2xl">Student Directory</h1>
      </div>
      <div className="w-full border-b border-dashed border-black"></div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-3">
          <Button
            variant={"ghost"}
            style={{ border: "dashed", borderColor: "#ef4444" }}
          >
            <Pencil size={15} className="mr-2" /> Update Data
          </Button>
          <Link href={"/students"}>
            <Button
              variant={"ghost"}
              style={{ border: "dashed", borderColor: "#3b82f6" }}
            >
              <UserPlus size={18} className="mr-2" /> Add Student
            </Button>
          </Link>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Page;
