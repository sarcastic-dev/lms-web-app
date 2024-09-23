"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axiosInstance from "@/lib/axiosInstance";
import { AttendanceSummaryBySection } from "./attendanceBySection/AttendanceSummaryBySection";
import { AttendanceByStudent } from "./attendanceByStudent/AttendanceByStudent";
import AllSectionsAttendance from "./allSectionsAttendance/AllSectionsAttendance";

export interface SectionResponse {
  id: string;
  name: string;
}

export interface ClassResponse {
  id: string;
  name: string;
  level: string;
  sections: SectionResponse[];
}

export interface ClassSectionResponse {
  classes: ClassResponse[];
}

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [classSectionData, setClassSectionData] = useState<ClassResponse[]>([]);

  useEffect(() => {
    fetchClassSectionData();
    // fetchAttendanceData();
  }, []);

  const fetchClassSectionData = async () => {
    const instituteId = Cookies.get("instituteId");
    const accessToken = Cookies.get("accessToken");
    if (!instituteId) return;
    if (!accessToken) return;


    setLoading(true);

    try {
      // Fetch attendance data
      const classSectionDataResponse = await axiosInstance.get<
        ClassSectionResponse[]
      >(`/classes/institute/${instituteId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const filteredData = classSectionDataResponse.data
        .map((obj: ClassSectionResponse) => obj.classes)
        .flat();

      setClassSectionData(filteredData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen my-4 space-y-4 2xl:px-5 2xl:py-3 xl:px-8 xl:py-2 lg:px-12 lg:py-4">
      <AllSectionsAttendance />
      <AttendanceSummaryBySection classSectionData={classSectionData} />
      <AttendanceByStudent classSectionData={classSectionData} />
    </div>
  );
};

export default Page;
