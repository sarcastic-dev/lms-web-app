import axiosInstance from "@/lib/axiosInstance";
import { UserRoundX } from "lucide-react";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

interface AttendanceCardProps {
  bgColor: string; // Specify the type for bgColor
  iconPath: React.ReactNode; // Change to ReactNode to accommodate SVGs
  title: string;
  value: string | number; // Can be string or number based on your data
  iconColor: string; // Specify the type for iconColor
}

const AttendanceCards: React.FC<AttendanceCardProps> = ({
  bgColor,
  iconPath,
  title,
  value,
  iconColor,
}) => {
  const [attendanceData, setAttendanceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      const instituteId = Cookies.get("instituteId");
      if (!instituteId) {
        setError("Institute ID not found");
        setLoading(false);
        return;
      }

      const presentDate = new Date().toISOString().split("T")[0]; // Current date

      try {
        // Update the API call to dynamically use the instituteId from the cookie
        const response = await axiosInstance.get(
          `/attendances/total_summary?instituteId=${instituteId}&date=${presentDate}`
        );
        setAttendanceData(response.data);
      } catch (err) {
        setError("Error fetching attendance data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!attendanceData) {
    return <div>No attendance data available.</div>;
  }

  const totalStudents = attendanceData?.totalStudents ?? 0;
  const totalPresent = attendanceData?.totalPresent ?? 0;
  const totalAbsent = attendanceData?.totalAbsent ?? 0;

  const attendanceItems = [
    {
      bgColor: "bg-amber-100",
      iconColor: "bg-amber-400",
      iconPath: (
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 640 512"
        >
          <path d="...svg path..." />
        </svg>
      ),
      title: "Total Teachers",
      value: attendanceData.totalTeachers || "N/A",
    },
    {
      bgColor: "bg-sky-100",
      iconColor: "bg-sky-400",
      iconPath: (
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 640 512"
        >
          <path d="...svg path..." />
        </svg>
      ),
      title: "Total Students",
      value: attendanceData.totalStudents,
    },
    {
      bgColor: "bg-purple-100",
      iconColor: "bg-purple-400",
      iconPath: (
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 640 512"
        >
          <path d="...svg path..." />
        </svg>
      ),
      title: "Total Classrooms",
      value: attendanceData.totalClassrooms || "N/A",
    },
    {
      bgColor: "bg-green-100",
      iconColor: "bg-green-400",
      iconPath: (
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 640 512"
        >
          <path d="...svg path..." />
        </svg>
      ),
      title: "Total Present",
      value: attendanceData.totalPresent,
    },
    {
      bgColor: "bg-red-100",
      iconColor: "bg-red-400",
      iconPath: (
        <UserRoundX className="text-white" strokeWidth={3} size={22} />
      ),
      title: "Total Absent",
      value: attendanceData.totalAbsent,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {attendanceItems.map((item, index) => (
        <AttendanceCards
          key={index}
          bgColor={item.bgColor}
          iconColor={item.iconColor}
          iconPath={item.iconPath}
          title={item.title}
          value={item.value}
        />
      ))}
    </div>
  );
};

export default AttendanceCards;
