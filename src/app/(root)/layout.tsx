// RootLayout.tsx
"use client";

import Sidebar from "@/components/Sidebar";
import React, { ReactNode, useState } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
	const [sidebarOpen, setSidebarOpen] = useState(true);

	return (
		<div className='flex'>
			<Sidebar
				open={sidebarOpen}
				setOpen={setSidebarOpen}
				className='fixed top-0 left-0 h-screen overflow-y-auto overflow-x-hidden bg-gray-200 border border-r-lms-200'
			/>
			<section
				className={`transition-all duration-500 ${
					sidebarOpen ? "ml-[248px]" : "ml-24"
				} w-full h-screen overflow-y-auto`}
			>
				<div className=''>
					{children}
				</div>
			</section>
		</div>
	);
};

// 2xl:p-4 xl:px-10 xl:py-5 2xl:py-3 

export default RootLayout;
