// src/app/(root)/studentInfo/columns.tsx

"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type Attendance = {
  studentId: string;
  studentName: string;
  parentName: string;
  daysPresent: number;
  daysAbsent: number;
  attendancePercentage: number;
};

const columns: ColumnDef<Attendance>[] = [
  {
    accessorKey: "studentName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 py-0 outline-none border-none uppercase font-bold text-lmsBase leading-4 tracking-wider text-lmsPrimary hover:bg-white"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Student Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "parentName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 py-0 outline-none border-none uppercase font-bold text-lmsBase leading-4 tracking-wider text-lmsPrimary hover:bg-white"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Parent Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "daysPresent",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 py-0 outline-none border-none uppercase font-bold text-lmsBase leading-4 tracking-wider text-lmsPrimary hover:bg-white"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Days Present
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "daysAbsent",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 py-0 outline-none border-none uppercase font-bold text-lmsBase leading-4 tracking-wider text-lmsPrimary hover:bg-white"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Days Absent
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "attendancePercentage",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 py-0 outline-none border-none uppercase font-bold text-lmsBase leading-4 tracking-wider text-lmsPrimary hover:bg-white"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Attendance Percentage
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
];

export default columns;
