"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/newButton";
import Link from "next/link";
import Cookies from "js-cookie";
import { CloudUpload, Download } from "lucide-react";
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
import { setViewState } from "@/context/staffSlice";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/LmsDataTable";
import WithAuthCheck from "@/components/WithAuthCheck";
import { resetRegistrationData } from "@/context/staffRegistrationSlice";

const Page: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const dispatch = useDispatch();
  const router = useRouter();

  const fetchStaffList = async () => {
    setLoading(true);
    const instituteId = Cookies.get("instituteId");
    const { data } = await axiosInstance.get(
      `/staffs/institute/${instituteId}`
    );
    console.log(instituteId);
    const filteredStaffData = data.map((obj: any) => {
      const staffObj: any = {};

      const user = obj.basicInfo.user;
      const staff = obj.basicInfo.staff;

      staffObj.id = user.id;
      staffObj.name =
        user.firstName + " " + user.middleName + " " + user.lastName;
      staffObj.contact = user.phone;
      staffObj.email = user.email;
      staffObj.designation = staff.designation;
      staffObj.department = staff.department;

      return staffObj;
    });
    setData(filteredStaffData);
    setLoading(false);
  };

  useEffect(() => {
    fetchStaffList();
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
      const response = await axiosInstance.post("/staffs/bulk", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File upload response:", response.data);
      fetchStaffList();
      router.push("/staffInfo");
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  const handleResetStaffData = () => {
    dispatch(resetRegistrationData());
    dispatch(setViewState(null));
  };
  return (
    <div className="flex flex-col">
      <div className="h-20 flex items-center justify-between border-b border-lms-100 px-16">
        <div>
          <h4 className="font-bold text-2xl text-lmsPrimary">
            Staff Information
          </h4>
        </div>
        <div className="flex justify-end items-center gap-3 rounded">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"lmsOutline"} iconName="cloudUpload" size={"lmsHome"}>
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
                <Button variant="link" iconName="download" iconPosition="end" iconSize={15} className="absolute -left-5">
                  Download Sample List
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Link href={"/users?userType=staff"}>
            <Button variant={"lms"} size={"lmsHome"} iconName="userPlus" onClick={handleResetStaffData}>
              Add Staff
            </Button>
          </Link>
        </div>
      </div>
      {/* <Separator /> */}
      <div className="">
        <Tabs defaultValue="teaching">
          <div className="flex justify-between items-center">
            <TabsList className="rounded bg-slate-200 mx-16 mt-6">
              <TabsTrigger
                value="teaching"
                className="rounded data-[state=active]:bg-lmsAccent data-[state=active]:text-white data-[state=active]:shadow-sm text-lmsSecondary font-semibold w-40"
              >
                Teaching Staff
              </TabsTrigger>
              <TabsTrigger
                value="non-teaching"
                className="rounded data-[state=active]:bg-lmsAccent data-[state=active]:text-white data-[state=active]:shadow-sm text-lmsSecondary font-semibold w-40"
              >
                Non-Teaching Staff
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="teaching" className="">
            <DataTable
              columns={columns}
              data={data}
              isLoading={loading}
              headingText={`Total Teaching Staff (${data.length})`}
            />
          </TabsContent>
          <TabsContent value="non-teaching">
            <DataTable
              columns={columns}
              data={data}
              headingText={`Total Non-Teaching Staff (${data.length})`}
              isLoading={loading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WithAuthCheck(Page);
