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

interface ActionCellProps<T> {
	id: string;
	fetchById: (id: string) => any;
	setViewState: (state: T) => any;
	pathName: string;
}

const ActionCell = <T extends string | null>({
	id,
	fetchById,
	setViewState,
	pathName,
}: ActionCellProps<T>) => {
	const dispatch = useDispatch<AppDispatch>();

	const handleViewClick = () => {
		dispatch(fetchById(id));
		dispatch(setViewState("view" as T));
	};

	const handleEditClick = () => {
		dispatch(fetchById(id));
		dispatch(setViewState("edit" as T));
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				asChild
				className='rounded'
			>
				<Button
					variant='ghost'
					className='border-none bg-none py-0 px-0'
				>
					<EllipsisVertical size={20} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align='end'
				className='w-[200px]'
			>
				<DropdownMenuGroup>
					<Link href={{ pathname: `/${pathName}`, query: { id } }}>
						<DropdownMenuItem
							onClick={handleViewClick}
							className='text-lmgSecondary font-semibold'
						>
							View
						</DropdownMenuItem>
					</Link>
					<DropdownMenuSeparator />
					<Link href={{ pathname: `/${pathName}`, query: { id } }}>
						<DropdownMenuItem
							onClick={handleEditClick}
							className='text-lmgSecondary font-semibold'
						>
							Edit
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
