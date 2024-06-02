import Sidebar from "@/components/Sidebar";
import React, { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<main className='flex'>
			<Sidebar/>
			<section className='w-full h-screen'>
				<div className=''>{children}</div>
			</section>
		</main>
	);
};

export default RootLayout;
