"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import ActionCell from "@/components/AttendanceActionCell";

export type Attendance = {
  attendanceRecords: {
    studentName: string;
    fatherName: string;
    status: string;
  }[]; 
  classId: string;
  className: string;
  sectionId: string;
  sectionName: string;
  totalStudents: number;
  totalPresent: number;
  totalAbsent: number;
  totalLate: number;
};

const columns: ColumnDef<Attendance>[] = [
  {
    accessorKey: "className",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 py-0 outline-none border-none uppercase font-bold text-lmsBase leading-4 tracking-wider text-lmsPrimary hover:bg-white"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Class
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "sectionName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 py-0 outline-none border-none uppercase font-bold text-lmsBase leading-4 tracking-wider text-lmsPrimary hover:bg-white"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Section
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "totalStudents",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 py-0 outline-none border-none uppercase font-bold text-lmsBase leading-4 tracking-wider text-lmsPrimary hover:bg-white"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Students
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "totalPresent",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 py-0 outline-none border-none uppercase font-bold text-lmsBase leading-4 tracking-wider text-lmsPrimary hover:bg-white"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Present
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "totalAbsent",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 py-0 outline-none border-none uppercase font-bold text-lmsBase leading-4 tracking-wider text-lmsPrimary hover:bg-white"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Absent
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  // {
  //   accessorKey: "totalLate",
  //   header: ({ column }) => (
  //     <Button
  //       variant="ghost"
  //       className="px-0 py-0 outline-none border-none uppercase font-bold text-lmsBase leading-4 tracking-wider text-lmsPrimary hover:bg-white"
  //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //     >
  //       Total Late
  //       <ArrowUpDown className="ml-2 h-4 w-4" />
  //     </Button>
  //   ),
  // },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <div>
        <ActionCell
          sectionId={row.original.sectionId}
          attendanceRecords={
            row.original.attendanceRecords ? row.original.attendanceRecords : []
          }
          fetchById={() => {}}
          setViewState={() => {}}
        />
      </div>
    ),
  },
];

export default columns;
