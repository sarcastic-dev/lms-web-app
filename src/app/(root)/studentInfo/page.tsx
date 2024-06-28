"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, UserPlus, CloudUpload, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import columns from "./columns";
import { DataTable } from "./data-table";
import { Input } from "@/components/ui/input";
import axios from "axios";
import axiosInstance from "@/lib/axiosInstance";
import { useDispatch } from "react-redux";
import { resetStudentData, setViewState } from "@/context/studentSlice";
import { useRouter } from "next/navigation";

axios.defaults.baseURL = "http://16.170.155.154:3300/api";

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const dispatch = useDispatch();
  const router = useRouter()

  const fetchStudentList = async () => {
    setLoading(true);
    const { data } = await axiosInstance.get("/students");
    const filteredData = data.map((obj:any) => {
      const studentObj: any = {};

      const user = obj.basicInfo.user;
      const student = obj.basicInfo.student;

      studentObj.id = user.id;
      studentObj.name = user.firstName + " " + user.middleName + " " + user.lastName;
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
    fetchStudentList();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name); // Set file name
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosInstance.post("/students/bulk", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File upload response:", response.data);

      fetchStudentList();
      router.push('/studentInfo')
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  const handleResetStaffData = () => {
    dispatch(resetStudentData())
    dispatch(setViewState('add'))
  }

  return (
    <div className='flex flex-col w-full h-screen space-y-8'>
      <div>
        <h1 className='font-semibold text-2xl'>Student Directory</h1>
      </div>
      <div className='w-full border-b border-dashed border-black'></div>
      <div>
        <div className='flex justify-end items-center mb-6'>
          <div className='flex gap-3'>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"outline"}>
                  <CloudUpload size={15} className='mr-2' /> Bulk Upload
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-4xl h-[500px] px-12'>
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-2xl">Bulk Update</DialogTitle>
                </DialogHeader>
                <div className='border border-dashed border-blue-500 rounded-lg bg-blue-50'>
                  <label className='col-span-3 w-full h-52 flex flex-col justify-center items-center cursor-pointer'>
                    <CloudUpload className='text-blue-500 mb-2 z-40' size={40} />
                    <span className="text-gray-500">
                      {fileName ? (
                        <>
                          Selected file: <span className="text-blue-500">{fileName}</span>
                        </>
                      ) : (
                        <>
                          Click <span className="text-blue-500">here</span> to upload file
                        </>
                      )}
                    </span>
                    <Input id='file' type='file' className='hidden' accept=".xlsx, .csv" onChange={handleFileChange} />
                  </label>
                </div>
                <DialogFooter className="mt-10 flex justify-between items-center relative">
                  <Button type='submit' onClick={handleFileUpload}>Upload File</Button>
                  <Button variant="link" className="absolute -left-5">Download Sample List <Download className="ml-2" size={15}/></Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Link href={"/students"}>
              <Button variant={"outline"} onClick={handleResetStaffData}>
                <UserPlus size={18} className='mr-2' /> Add Student
              </Button>
            </Link>
          </div>
        </div>
        <DataTable columns={columns} data={data} isLoading={loading} />
      </div>
    </div>
  );
};

export default Page;
