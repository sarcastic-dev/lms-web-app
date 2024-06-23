import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, UserPlus, CloudUpload, Download } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import columns from "./columns";
import { DataTable } from "./data-table";
import { Input } from "@/components/ui/input";

async function getTeacher() {
    const res = await fetch(
        "https://666945b12e964a6dfed467a7.mockapi.io/api/v1/teachers"
    );
    const data = await res.json();
    return data;
}

const page = () => {
    const data = getTeacher();
    return (
        <div className='flex flex-col w-full h-screen space-y-8'>
            <div>
                <h1 className='font-semibold text-2xl'>Staff Directory</h1>
            </div>
            <div className='w-full border-b border-dashed border-black'></div>
            <div >
                <Tabs defaultValue='teaching'>
                    <div className='flex justify-between items-center mb-6'>
                        <TabsList className="">
                            <TabsTrigger value='teaching'>Teaching Staff</TabsTrigger>
                            <TabsTrigger value='non-teaching'>Non-Teaching Staff</TabsTrigger>
                        </TabsList>
                        <div className='flex gap-3'>
                            <Dialog>
                                <DialogTrigger asChild>
                                <Button
                                variant={"outline"}

                            >
                                <CloudUpload
                                    size={15}
                                    className='mr-2'
                                />{" "}
                                 Bulk Upload
                            </Button>
                                </DialogTrigger>
                                <DialogContent className='sm:max-w-4xl h-[500px] px-12'>
                                    <DialogHeader className="mb-6">
                                        <DialogTitle className="text-2xl">Bulk Update</DialogTitle>
                                    </DialogHeader>
                                    <div className='border border-dashed border-blue-500 rounded-lg bg-blue-50'>
                                        <label className='col-span-3 w-full h-52 flex flex-col justify-center items-center cursor-pointer'>
                                            <CloudUpload className='text-blue-500 mb-2 z-40' size={40} />
                                            <span className="text-gray-500">Click <span className="text-blue-500">here</span> to upload file</span>
                                            <Input
                                                id='file'
                                                type='file'
                                                className='hidden'
                                            />
                                        </label>
                                    </div>
									<DialogFooter className="mt-10 flex justify-between items-center relative">

                                        <Button type='submit'>Upload File</Button>


										<Button variant="link" className="absolute -left-5">Download Sample List <Download className="ml-2" size={15}/></Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <Button
                                variant={"outline"}

                            >
                                <Pencil
                                    size={15}
                                    className='mr-2'
                                />{" "}
                                Update Data
                            </Button>

                            <Link href={"/staffRegistration"}>
                                <Button
                                    variant={"outline"}
                                    
                                >
                                    <UserPlus
                                        size={18}
                                        className='mr-2'
                                    />{" "}
                                    Add Staff
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <TabsContent value='teaching'>
                        <DataTable
                            columns={columns}
                            data={data}
                        />
                    </TabsContent>
                    <TabsContent value='non-teaching'>
                        Change your password here.
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default page;

