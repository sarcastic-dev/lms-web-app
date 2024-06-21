"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EllipsisVertical, GraduationCap, Search } from "lucide-react";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectGroup,
    SelectValue,
    SelectLabel,
} from "@/components/ui/select";
import { Teachers, educationStages } from "@/Constant";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Page = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className='m-5'>
            <h2 className='text-3xl text-gray-800 font-semibold'>
                Classroom Setup
            </h2>
            <div className='flex flex-wrap justify-between items-center bg-gray-100 p-8 rounded-lg mt-10'>
                <div className='relative w-72 flex items-center'>
                    <Input
                        placeholder='Search For Classroom'
                        className='pl-9'
                    />
                    <Search
                        className='absolute left-3 top-2.5 text-gray-400 placeholder:text-gray-500'
                        size='20'
                    />
                </div>

                <div className='flex items-center'>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                style={{
                                    backgroundColor: "white",
                                    border: "dashed",
                                    color: "black",
                                }}
                            >
                                Create Classroom
                            </Button>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-[425px]'>
                            <DialogHeader>
                                <DialogTitle>Classroom</DialogTitle>
                                <DialogDescription>
                                    Create a classroom, you can add teacher &
                                    student in further process.
                                </DialogDescription>
                            </DialogHeader>
                            <div className='grid gap-4 py-4'>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label
                                        htmlFor='name'
                                        className='text-right'
                                    >
                                        Name
                                    </Label>
                                    <Select>
                                        <SelectTrigger className='col-span-3 p-2 px-3 rounded-md border focus:outline-none'>
                                            <SelectValue placeholder='Select class' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {educationStages.map((stage) => (
                                                <SelectGroup key={stage.stage}>
                                                    <SelectLabel className='bg-gray-50 rounded-sm'>
                                                        {stage.stage}
                                                    </SelectLabel>
                                                    {stage.classes.map(
                                                        (className) => (
                                                            <SelectItem
                                                                key={className}
                                                                value={
                                                                    className
                                                                }
                                                            >
                                                                {className}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectGroup>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label
                                        htmlFor='teacher'
                                        className='text-right'
                                    >
                                        Teacher
                                    </Label>
                                    <Select>
                                        <SelectTrigger className='col-span-3 p-2 px-3 rounded-md border focus:outline-none'>
                                            <SelectValue placeholder='Select teacher' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Teachers.map((teacher) => (
                                                <SelectItem
                                                    key={teacher.id}
                                                    value={teacher.name}
                                                >
                                                    {teacher.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type='submit'>Create</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className='w-full bg-gray-100 h-40 mt-6 rounded-md flex flex-col justify-evenly'>
                <div className='flex flex-wrap justify-between items-center pl-5'>
                    <div>
                        <h2 className='font-semibold text-lg text-blue-600'>
                            ClassRoom No.1
                        </h2>
                    </div>
                    <div>
                        <DropdownMenu
                            open={open}
                            onOpenChange={setOpen}
                        >
                            <DropdownMenuTrigger asChild>
                                <Button variant='ghost'>
                                    <EllipsisVertical size={20} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align='end'
                                className='w-[200px] font-semibold'
                            >
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        Edit Classroom Name
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        Add Student
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        Add Teacher
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        Add Co-Teacher
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className='text-red-600'>
                                        Delete Classroom
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className='bg-white w-64 ml-4 px-3 py-2 rounded-md text-sm font-medium'>
                    12th (Senior Secondary)
                </div>

                <div className='flex justify-between items-center'>
                    <div className='w-1/3 flex justify-around'>
                        <div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant='ghost' className="text-blue-500">
                                        Add Teacher
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className='sm:max-w-[425px]'>
                                    <DialogHeader>
                                        <DialogTitle>Edit profile</DialogTitle>
                                        <DialogDescription>
                                            Make changes to your profile here.
                                            Click save when you&apos;re done.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className='grid gap-4 py-4'>
                                        <div className='grid grid-cols-4 items-center gap-4'>
                                            <Label
                                                htmlFor='name'
                                                className='text-right'
                                            >
                                                Name
                                            </Label>
                                            <Input
                                                id='name'
                                                value='Pedro Duarte'
                                                className='col-span-3'
                                            />
                                        </div>
                                        <div className='grid grid-cols-4 items-center gap-4'>
                                            <Label
                                                htmlFor='username'
                                                className='text-right'
                                            >
                                                Username
                                            </Label>
                                            <Input
                                                id='username'
                                                value='@peduarte'
                                                className='col-span-3'
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type='submit'>
                                            Save changes
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant='ghost' className="text-blue-500">
                                        Add Co-Teacher
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className='sm:max-w-[425px]'>
                                    <DialogHeader>
                                        <DialogTitle>Edit profile</DialogTitle>
                                        <DialogDescription>
                                            Make changes to your profile here.
                                            Click save when you&apos;re done.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className='grid gap-4 py-4'>
                                        <div className='grid grid-cols-4 items-center gap-4'>
                                            <Label
                                                htmlFor='name'
                                                className='text-right'
                                            >
                                                Name
                                            </Label>
                                            <Input
                                                id='name'
                                                value='Pedro Duarte'
                                                className='col-span-3'
                                            />
                                        </div>
                                        <div className='grid grid-cols-4 items-center gap-4'>
                                            <Label
                                                htmlFor='username'
                                                className='text-right'
                                            >
                                                Username
                                            </Label>
                                            <Input
                                                id='username'
                                                value='@peduarte'
                                                className='col-span-3'
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type='submit'>
                                            Save changes
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <p className="flex items-center"><GraduationCap color="#ef4444" size={20}/> <span className="text-red-500 pl-2 text-sm">25 Students</span></p>
                    </div>
                    <div className="px-4">
                        <Button variant='link'>View Classroom</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
