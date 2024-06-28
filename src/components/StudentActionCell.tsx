// src/components/columns.tsx

"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import ActionCell from "@/components/ActionCell";
import { fetchStudentById, setViewState } from "@/context/studentSlice";


export type Student = {
  id: string;
  name: string;
  class: string;
  contact: string;
  parentName: string;
  status: "Active" | "Inactive";
};

const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: "class",
    header: "Class",
  },
  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    accessorKey: "parentName",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Parent Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <ActionCell id={row.original.id} fetchById={fetchStudentById} setViewState={setViewState} pathName="students"/>
    ),
  },
];

export default columns;
