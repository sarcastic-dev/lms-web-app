// src/app/(root)/studentInfo/columns.tsx

"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import ActionCell from "@/components/ActionCell";
import { fetchStudentById, setViewState } from "@/context/studentSlice"; // Adjust the import path based on your project structure

export type Student = {
	id: string;
	name: string;
	class: string;
	contact: string;
	parentName: string;
	status: string;
};

const columns: ColumnDef<Student>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => (
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
		),
	},
	{
		accessorKey: "class",
		header: ({ column }) => (
			<Button
				variant='ghost'
				className='px-0 py-0 outline-none border-none uppercase font-bold text-lmsBase leading-4 tracking-wider text-lmsPrimary hover:bg-white'
				onClick={() =>
					column.toggleSorting(column.getIsSorted() === "asc")
				}
			>
				Class & Section
				<ArrowUpDown className='ml-2 h-4 w-4' />
			</Button>
		),
	},
	{
		accessorKey: "contact",
		header: ({ column }) => (
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
		),
	},
	{
		accessorKey: "parentName",
		header: ({ column }) => (
			<Button
				variant='ghost'
				className='px-0 py-0 outline-none border-none uppercase font-bold text-lmsBase leading-4 tracking-wider text-lmsPrimary hover:bg-white'
				onClick={() =>
					column.toggleSorting(column.getIsSorted() === "asc")
				}
			>
				Parent Name
				<ArrowUpDown className='ml-2 h-4 w-4' />
			</Button>
		),
	},
	{
		accessorKey: "email",
		header: ({ column }) => (
			<Button
				variant='ghost'
				className='px-0 py-0 outline-none border-none uppercase font-bold text-lmsBase leading-4 tracking-wider text-lmsPrimary hover:bg-white'
				onClick={() =>
					column.toggleSorting(column.getIsSorted() === "asc")
				}
			>
				EMAIL ID
				<ArrowUpDown className='ml-2 h-4 w-4' />
			</Button>
		),
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => (
			<div className='flex justify-center items-center xl:w-1 2xl:w-full '>
				<ActionCell
					id={row.original.id}
					fetchById={fetchStudentById}
					setViewState={setViewState}
					pathName='users'
					userType="student"
				/>
			</div>
		),
	},
];

export default columns;
