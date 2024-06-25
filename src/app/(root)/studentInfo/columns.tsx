"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";

// Set the default base URL for axios

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Teacher = {
  id: string;
  name: string;
  contact: string;
  class: string;
  role: string;
  status: "Active" | "Inactive";
};

const columns: ColumnDef<Teacher>[] = [
  {
    accessorKey: "name",
    header: "Name",
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
    header: "Parent name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      // const viewStudent = async (id: string) => {
      //   try {
      //     const { data } = await axios.get(`/students/${id}`);
      //     console.log("Student data:", data);
      //     // Handle the data as needed, e.g., display it in a modal
      //   } catch (error) {
      //     console.error("Error fetching student data:", error);
      //   }
      // };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <EllipsisVertical size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px] font-semibold">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <Link
                href={{
                  pathname: `/students`,
                  query: {
                    id: row.original.id,
                  },
                }}
              >
                <DropdownMenuItem>View</DropdownMenuItem>
              </Link>

              <DropdownMenuSeparator />
              <Link
                href={{
                  pathname: `/students`,
                  query: {
                    id: row.original.id,
                  },
                }}
              >
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default columns;
