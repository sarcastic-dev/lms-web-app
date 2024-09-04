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
					className='px-0 py-0 outline-none border-none uppercase font-bold text-lmsBase leading-4 tracking-wider text-lmsPrimary hover:bg-white'
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
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					className='px-0 py-0 outline-none border-none uppercase font-bold text-lmsBase leading-4 tracking-wider text-lmsPrimary hover:bg-white'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					Contact
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		accessorKey: "email",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					className='px-0 py-0 outline-none border-none uppercase font-bold text-lmsBase leading-4 tracking-wider text-lmsPrimary hover:bg-white'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					Email
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		accessorKey: "designation",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					className='px-0 py-0 outline-none border-none uppercase font-bold text-lmsBase leading-4 tracking-wider text-lmsPrimary hover:bg-white'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					Designation
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		accessorKey: "department",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					className='px-0 py-0 outline-none border-none uppercase font-bold text-lmsBase leading-4 tracking-wider text-lmsPrimary hover:bg-white'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					Department
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => (
			<ActionCell
				id={row.original.id}
				fetchById={fetchStaffById}
				setViewState={setViewState}
				pathName='users'
				userType="staff"
			/>
		),
	},
];

export default columns;
