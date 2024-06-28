// src/components/columns.tsx

"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import ActionCell from "@/components/ActionCell";
import { fetchStaffById, setViewState } from "@/context/staffSlice";

export type Teacher = {
	id: string;
	name: string;
	contact: string;
	role: string;
	designation: string;
	department: string;
};

const columns: ColumnDef<Teacher>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					Name
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		accessorKey: "contact",
		header: "Contact",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "designation",
		header: "Designation",
	},
	{
		accessorKey: "department",
		header: "Department",
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => (
			<ActionCell
				id={row.original.id}
				fetchById={fetchStaffById}
				setViewState={setViewState}
				pathName="staffs"
			/>
		),
	},
];

export default columns;
