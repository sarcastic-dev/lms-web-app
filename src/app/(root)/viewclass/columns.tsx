"use client";

import ActionCell from "@/components/ActionCell";
import ClassActionCell from "@/components/ClassActionCell";
import { setViewState } from "@/context/staffSlice";
import { fetchStudentById } from "@/context/studentSlice";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type EnrolledStudent = {
  id: string;
  studentName: string;
  fatherName: string;
  class: string;
  rollNumber: string;
};

export const columns: ColumnDef<EnrolledStudent>[] = [
  {
    accessorKey: "studentName",
    header: "Student Name",
  },
  {
    accessorKey: "parentName",
    header: "Parent Name",
  },
  {
    accessorKey: "class",
    header: "Class",
  },
  {
    accessorKey: "rollNumber",
    header: "Roll Number",
  },
  {
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => (
			<ClassActionCell
				id={row.original.id}
				fetchById={fetchStudentById}
				setViewState={setViewState}
				pathName='students'
			/>
		),
	},
];
