import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, School, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
	return (
		<div className='2xl:px-16 2xl:py-2 xl:px-8 xl:py-2 lg:px-12 lg:py-4 my-4 w-full'>
			<div className='flex items-center justify-between'>
				<h4 className='text-lmsPrimary text-2xl font-bold'>Profile</h4>
				<Settings className='text-lmsAccent' />
			</div>
			<div className='mt-3'>
				<h5 className='text-lmsAccent text-xl font-semibold '>
					St John's Senior Secondary School
				</h5>
				<div className='flex items-center '>
					<div className='flex items-center justify-between w-24 bg-lmsAccent  px-3 rounded py-1 mt-2 mr-2'>
						<span>
							<School
								className='text-white '
								size={18}
							/>
						</span>
						<p className='text-white text-sm'> School</p>
					</div>
					<Link
						href={"https://www.google.co.in/"}
						className='mt-1.5'
					>
						<ExternalLink
							className='text-lmsPrimary'
							size={18}
						/>
					</Link>
				</div>
			</div>
			<div className=' bg-lms-100 h-28 hover:backdrop-blur-lg mt-10 rounded flex items-center justify-between'>
				<div className='flex items-center mx-16'>
					<div className='w-20 h-20 border border-white bg-white rounded'></div>
					<div className="ml-5">
						<h6 className="text-lmsSecondary font-normal text-base">Owner Name</h6>
						<p className="text-lmsPrimary text-2xl font-semibold tracking-wide">Akshay Jain</p>
					</div>
				</div>
				<div className='flex flex-col mx-16 w-[315px]'>
          <div className="flex items-center justify-between">
            <p className="text-base font-light tracking-wide text-lmsSecondary">Owner Email:</p>
            <p className="text-sm font-medium tracking-wider text-lmsPrimary">akshayjain2823@gmail.com</p>
          </div>
          <Separator className="my-1 bg-lmsSecondary"/>
          <div className="flex items-center justify-between">
            <p className="text-base font-light tracking-wide text-lmsSecondary">Owner Phone:</p>
            <p className="text-sm font-medium tracking-wider text-lmsPrimary">+91- 9084112094</p>
          </div>
				</div>
			</div>
		</div>
	);
};

export default page;
