// src/components/ActionCell.tsx

import React from "react";
import { useDispatch } from "react-redux";
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
import { EllipsisVertical, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { AppDispatch } from "@/context/store";
import { fetchStaffById, setViewState } from "@/context/staffSlice";
import { resetRegistrationData } from "@/context/staffRegistrationSlice";

interface ActionCellProps {
	id: string;
}

const ActionCell: React.FC<ActionCellProps> = ({ id }) => {
	const dispatch = useDispatch<AppDispatch>();

	const handleViewClick = () => {
		dispatch(fetchStaffById(id));
		dispatch(setViewState("view"));
	};
	const handleEditClick = () => {
		dispatch(fetchStaffById(id));
		dispatch(setViewState("edit"));

	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost'>
					{/* <EllipsisVertical size={20} /> */}
					<MoreHorizontal />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align='center'
				className='w-[200px]'
			>
				<DropdownMenuGroup>
					<DropdownMenuLabel className='font-semibold'>
						Actions
					</DropdownMenuLabel>

					<Link
						href={{
							pathname: `/staffs`,
							query: {
								id,
							},
						}}
					>
						<DropdownMenuItem onClick={handleViewClick}>
							View{" "}
						</DropdownMenuItem>
					</Link>

					<DropdownMenuSeparator />
					<Link
						href={{
							pathname: `/staffs`,
							query: {
								id,
							},
						}}
					>
						<DropdownMenuItem onClick={handleEditClick}>
							Edit{" "}
						</DropdownMenuItem>
					</Link>
					<DropdownMenuSeparator />
					<DropdownMenuItem className='text-red-600'>
						Delete
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ActionCell;
