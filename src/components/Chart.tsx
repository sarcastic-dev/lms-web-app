"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import axiosInstance from "@/lib/axiosInstance";

interface ChartData {
  date: string;
  presentPercentage: number;
  absentPercentage: number;
}

interface FormattedData {
  weekday: string;
  present: number;
  absent: number;
}

const chartConfig: ChartConfig = {
  present: {
    label: "Present",
    color: "#2563eb",
  },
  absent: {
    label: "Absent",
    color: "#60a5fa",
  },
};

export function Chart() {
  const [chartData, setChartData] = useState<FormattedData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const instituteId = Cookies.get("instituteId");
  const accessToken = Cookies.get("accessToken"); // Retrieve JWT from cookies


  // Helper function to get the first 3 letters of the weekday name
  const getWeekdayAbbreviation = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "short" }).slice(0, 3);
  };

  useEffect(() => {
    if (!instituteId) {
      setError("Institute ID not found");
      setLoading(false);
      return;
    }

    if (!accessToken) {
      setError("JWT not found");
      setLoading(false);
      return;
    }


    const fetchChartData = async () => {
      // Defaults to today's date if no date is provided
      const todayDate = new Date().toISOString().split("T")[0];

      try {
        const response = await axiosInstance.get(
          `/attendances/institute/${instituteId}/last6days?date=${todayDate}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Attach JWT
            },
          }
        );

        const data: ChartData[] = response.data;

        // Format the data to show the abbreviated weekday name
        const formattedData: FormattedData[] = data.map((item) => ({
          weekday: getWeekdayAbbreviation(item.date), // Use abbreviated weekday
          present: item.presentPercentage,
          absent: item.absentPercentage,
        }));

        setChartData(formattedData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [instituteId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[300px] border border-lms-100 p-6 rounded-sm"
    >
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="weekday" // Use the abbreviated weekday as the X-axis label
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent className="rounded" />} />
        <Bar dataKey="present" fill="var(--color-present)" radius={4} />
        <Bar dataKey="absent" fill="var(--color-absent)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
