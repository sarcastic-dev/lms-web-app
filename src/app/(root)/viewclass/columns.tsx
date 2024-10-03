"use client";

import ActionCell from "@/components/ActionCell";
import ClassActionCell from "@/components/ClassActionCell";
import { Button } from "@/components/ui/button";
import { setViewState } from "@/context/staffSlice";
import { fetchStudentById } from "@/context/studentSlice";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type EnrolledStudent = {
	id: string;
	name: string;
	fatherName: string;
	class: string;
	rollNumber: string;
};

export const columns: ColumnDef<EnrolledStudent>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					className='p-0 outline-none border-none uppercase font-bold text-lmsBase leading-4 tracking-wider text-lmsPrimary hover:bg-white'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					Student Name
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		accessorKey: "rollNumber",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					className='p-0 outline-none border-none uppercase font-bold text-lmsBase leading-4 tracking-wider text-lmsPrimary hover:bg-white'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					Roll Number
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},

	{
		accessorKey: "parentName",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					className='p-0 outline-none border-none uppercase font-bold text-lmsBase leading-4 tracking-wider text-lmsPrimary hover:bg-white'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					Parent Name
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	// {
	// 	accessorKey: "class",
	// 	header: ({ column }) => {
	// 		return (
	// 			<Button
	// 				variant='ghost'
	// 				className='p-0 outline-none border-none uppercase font-bold text-lmsBase leading-4 tracking-wider text-lmsPrimary hover:bg-white'
	// 				onClick={() =>
	// 					column.toggleSorting(column.getIsSorted() === "asc")
	// 				}
	// 			>
	// 				Class
	// 				<ArrowUpDown className='ml-2 h-4 w-4' />
	// 			</Button>
	// 		);
	// 	},
	// },

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
