import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, UserPlus } from "lucide-react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import columns from "./columns";
import { DataTable } from "./data-table";

async function getTeacher (){
	const res = await fetch('https://666945b12e964a6dfed467a7.mockapi.io/api/v1/teachers');
	const data = await res.json()
	return data
}

  
const page = () => {
	const data = getTeacher()
	return (
		<div className='flex flex-col w-full h-screen space-y-8'>
			{/* <div>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink
								href='/'
								className='font-semibold'
							>
								{" "}
								Dashboard
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />

						<BreadcrumbItem>
							<BreadcrumbLink className='font-semibold'>
								Staff Information
							</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div> */}
			<div>
				<h1 className='font-semibold text-2xl'>Staff Directory</h1>
			</div>
			<div className='w-full border-b border-dashed border-black'></div>
			<div>
				<Tabs defaultValue='teaching'>
					<div className='flex justify-between items-center'>
						<TabsList>
							<TabsTrigger value='teaching'>
								Teaching Staff
							</TabsTrigger>
							<TabsTrigger value='non-teaching'>
								Non-Teaching Staff
							</TabsTrigger>
						</TabsList>
						<div className='flex gap-3'>
							
								<Button
									variant={"ghost"}
									style={{ border: "dashed" }}
									className=''
								>
									<Pencil
										size={15}
										className='mr-2'
									/>{" "}
									Update Data
								</Button>
						
						<Link href={"/staffRegistration"}>
							<Button
								variant={"ghost"}
								style={{ border: "dashed" }}
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
						<DataTable columns={columns} data={data}/>
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
/*

			
			
			
*/
