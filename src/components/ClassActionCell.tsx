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
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { AppDispatch } from "@/context/store";

interface ActionCellProps<T> {
  id: string;
  fetchById: (id: string) => any;
	setViewState: (state: T) => any;
	pathName:string
}

const ActionCell = <T extends string | null>({ id, fetchById, setViewState,pathName }: ActionCellProps<T>) => {
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
      <DropdownMenuTrigger asChild>
        <Button variant='ghost'>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='center' className='w-[200px]'>
        <DropdownMenuGroup>
          <DropdownMenuLabel className='font-semibold'>Actions</DropdownMenuLabel>
          <DropdownMenuItem className='text-red-600'>Remove</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionCell;
