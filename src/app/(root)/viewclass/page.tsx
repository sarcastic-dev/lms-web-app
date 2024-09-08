"use client";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon, Pencil, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

import { columns } from "./columns";
import Drawer from "@/components/Drawer";
import AddTeacher from "@/components/AddTeacher";
import AddStudent from "@/components/AddStudent";
import { useSearchParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { DataTable } from "@/components/LmsDataTable";
import { toast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";

const Page = () => {
  const searchParams = useSearchParams();
  const sectionId: string | null = searchParams.get("sectionId");
  const sectionName: string | null = searchParams.get("sectionName");
  const classLevel: string | number | null = searchParams.get("classLevel");

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalStudent, setTotalStudent] = useState();
  const [unassignStudent, setTotalUnassignStudent] = useState([]);
  const [assignedTeacher, setAssignedTeacher] = useState("");

  const fetchClassData = async () => {
    setIsLoading(true);
    const instituteId = Cookies.get("instituteId");
    try {
      const { data } = await axiosInstance.get(
        `/classes/section-details?instituteId=${instituteId}&classLevel=${classLevel}&section=${sectionName}`
      );

      setTotalStudent(data.enrolled.length);
      setTotalUnassignStudent(data.unenrolled);
      const teacherName = data?.teacher?.teacherName;
      setAssignedTeacher(teacherName);

      const filteredData = data?.enrolled?.map((obj: any) => {
        const enrolledStudentObj: any = {};
        enrolledStudentObj.name = obj?.studentName;
        enrolledStudentObj.parentName = obj?.parentName;
        enrolledStudentObj.class = `${classLevel} - ${sectionName}`;
        enrolledStudentObj.rollNumber = obj?.rollNumber;

        return enrolledStudentObj;
      });
      setData(filteredData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClassData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full relative">
      <div className="flex items-center justify-between px-6 py-4 border-b border-lms-100">
        <h4 className="text-2xl font-semibold text-lmsPrimary">{`${classLevel}${
          classLevel === "1"
            ? "st"
            : classLevel === "2"
            ? "nd"
            : classLevel === "3"
            ? "rd"
            : classLevel === "P"
            ? "re-Nursery"
            : classLevel === "U"
            ? "KG"
            : classLevel === "L"
            ? "KG"
            : classLevel === "N"
            ? "ursery"
            : "th"
        } - ${sectionName}`}</h4>
      </div>
      <div className="h-36 bg-gradient-to-tl from-[#B06AB3] to-[#4568DC] p-6 m-7 rounded-sm text-white grid grid-cols-3 gap-y-5">
        <div>
          <h6 className="text-xs text-lms-100">Class Teacher</h6>
          {assignedTeacher ? (
            <h5 className="text-sm font-medium">{assignedTeacher}</h5>
          ) : (
            <Drawer title="Class Teacher" triggerText="Assign Class Teacher">
              <AddTeacher
                sectionId={sectionId}
                fetchSectionDetails={fetchClassData}
              />
            </Drawer>
          )}
        </div>
        <div>
          <h6 className="text-xs text-lms-100">Class</h6>
          <h5 className="text-sm font-medium">
            {`${classLevel}${
              classLevel === "1"
                ? "st"
                : classLevel === "2"
                ? "nd"
                : classLevel === "3"
                ? "rd"
                : classLevel === "P"
                ? "re-Nursery"
                : classLevel === "U"
                ? "KG"
                : classLevel === "L"
                ? "KG"
                : classLevel === "N"
                ? "ursery"
                : "th"
            }`}
          </h5>
        </div>
        <div>
          <h6 className="text-xs text-lms-100">Section</h6>
          <h5 className="text-sm font-medium">{`${sectionName}`}</h5>
        </div>
        <div>
          <h6 className="text-xs text-lms-100">Total Students</h6>
          <h5 className="text-sm font-medium">
            {totalStudent ? totalStudent : "0"}
          </h5>
        </div>
        <div>
          <h6 className="text-xs text-lms-100">Present</h6>
          <h5 className="text-sm font-medium">28</h5>
        </div>
        <div>
          <h6 className="text-xs text-lms-100">Absent</h6>
          <h5 className="text-sm font-medium">2</h5>
        </div>
      </div>
      {/* <Button
				onClick={() => {
					toast({
						title: "",
						description: (
							<div
								style={{
									display: "flex",
									alignItems: "center",
								}}
							>
								<CheckCircleIcon
									size={24}
									style={{ marginRight: "18px" }}
									className='text-lmsSuccess'
								/>
								<div>
									<strong>Success</strong>
									<p>
										You can access all the files in this
										folder.
									</p>
								</div>
							</div>
						),
						style: {
							backgroundColor: "#baf8c6",
							color: "#092F5C",
							padding: "12px 16px",
							borderRadius: "8px",
							borderLeft: "4px solid #24A148", // Left border color and thickness
							boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
							maxWidth: "350px",
						},
						duration: 3000, // Auto-hide after 3 seconds
					});
				}}
			>
				Show Toast
			</Button> */}

      <div className=" w-full rounded px-7">
        <DataTable
          columns={columns}
          data={data}
          isLoading={isLoading}
          headingText={`Total Assigned Students (${data.length})`}
          buttonComponent={
            <Drawer
              title="Assign Student To Classroom"
              triggerText="Assign Students"
            >
              <AddStudent
                students={unassignStudent}
                sectionId={sectionId}
                fetchSectionDetails={() => {}}
              />
            </Drawer>
          }
        />
      </div>
    </div>
  );
};

export default Page;
