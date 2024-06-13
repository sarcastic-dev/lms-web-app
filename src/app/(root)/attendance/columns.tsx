"use client";

// import { Teacher } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

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
		accessorKey: "contact",
		header: "Contact",
	},
	{
		accessorKey: "class",
		header: "Class",
	},
	{
		accessorKey: "role",
		header: "Role",
	},
	{
		accessorKey: "status",
		header: "Status",
	},
];
export default columns;
