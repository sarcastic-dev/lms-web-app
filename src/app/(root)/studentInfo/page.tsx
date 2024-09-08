"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/newButton";
import Link from "next/link";
import { UserPlus, CloudUpload, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import columns from "./columns";

import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axiosInstance";
import { useDispatch } from "react-redux";
import { setViewState } from "@/context/studentSlice";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/LmsDataTable";
import WithAuthCheck from "@/components/WithAuthCheck";
import { resetRegistrationData } from "@/context/studentRegistrationSlice";

const Page: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const dispatch = useDispatch();

  const router = useRouter();

  const fetchStudentList = async () => {
    setLoading(true);
    const instituteId = Cookies.get("instituteId");
    const { data } = await axiosInstance.get(
      `/students/institute/${instituteId}`
    );
    const filteredData = data.map((obj: any) => {
      const studentObj: any = {};

      const user = obj.basicInfo.user;
      const student = obj.basicInfo.student;

      studentObj.id = user.id;
      studentObj.name =
        user.firstName + " " + user.middleName + " " + user.lastName;
      studentObj.class = student.section
        ? student.class + "-" + student.section
        : student.class;
      studentObj.contact = user.phone;
      studentObj.parentName = obj.parentInfo.name;
      studentObj.email = user.email;

      return studentObj;
    });
    setData(filteredData);
    setLoading(false);
  };

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
      router.push("/studentInfo");
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  const handleResetStaffData = () => {
    console.log("clicking");
    dispatch(resetRegistrationData());
    dispatch(setViewState("add"));
    router.push("/users?userType=student");
  };
  useEffect(() => {
    fetchStudentList();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="h-20 flex items-center justify-between border-b border-lms-100 px-16">
        <div>
          <h4 className="font-bold text-2xl text-lmsPrimary">
            Student Information
          </h4>
        </div>
        <div className="flex justify-end items-center gap-3 rounded">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant={"lmsOutline"}
                iconName="cloudUpload"
                size={"lmsHome"}
              >
                Bulk Upload
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl h-[500px] px-12">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl text-lmsPrimary">
                  Bulk Update
                </DialogTitle>
              </DialogHeader>
              <div className="border border-dashed border-lmsAccent rounded-lg bg-lms-50">
                <label className="col-span-3 w-full h-52 flex flex-col justify-center items-center cursor-pointer">
                  <CloudUpload className="text-lmsAccent mb-2 z-40" size={40} />
                  <span className="text-lms-500">
                    {fileName ? (
                      <>
                        Selected file:{" "}
                        <span className="text-lmsAccent">{fileName}</span>
                      </>
                    ) : (
                      <>
                        Click <span className="text-lmsAccent">here</span> to
                        upload file
                      </>
                    )}
                  </span>
                  <Input
                    id="file"
                    type="file"
                    className="hidden"
                    accept=".xlsx, .csv"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <DialogFooter className="mt-10 flex justify-between items-center relative">
                <Button
                  type="submit"
                  variant={"lms"}
                  onClick={handleFileUpload}
                >
                  Upload File
                </Button>
                <Button variant="link" className="absolute -left-5">
                  Download Sample List <Download className="ml-2" size={15} />
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Link href={"/users?userType=student"}>
            <Button
              variant={"lms"}
              iconName="userPlus"
              size={"lmsHome"}
              onClick={handleResetStaffData}
            >
              Add Student
            </Button>
          </Link>
        </div>
      </div>
      {/* <Separator /> */}

      <DataTable
        columns={columns}
        data={data}
        isLoading={loading}
        headingText={`Total Students (${data.length})`}
      />
    </div>
  );
};

export default WithAuthCheck(Page);
