"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/newButton";
import WelcomeCarousel from "./WelcomeCarousel";
import WelcomeAbout from "./WelcomeAbout";
import WelcomeUpcoming from "./WelcomeUpcoming";
import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";

const WelcomeHome: React.FC = () => {
	return (
		<>
			<div
				className='relative bg-white h-screen'
				id='mainSection'
			>
				<div className='relative z-10'>
					{/* <Navbar /> */}
					<div className='flex flex-col items-center relative h-screen overflow-hidden z-0'>
						<div className='bg-gradient-to-r from-[#4568DC] via-[#86A1EC] to-[#C7DAFC] h-[1000px] w-[1000px] -top-28 left-[1000px] overflow-hidden rounded-full absolute inset-0 z-0 opacity-15'></div>
						<div className='bg-gradient-to-r from-[#4568DC] via-[#C7DAFC] to-white w-screen absolute inset-0 z-0 opacity-10'></div>
						<WelcomeCarousel />
					</div>

					<div
						className='relative bg-white h-screen flex items-center overflow-hidden'
						id='aboutSection'
					>
						<div className='bg-gradient-to-r from-[#4568DC] via-[#86A1EC] to-[#C7DAFC] h-[300px] w-[300px] top-10 left-[550px]  rounded-full absolute inset-0 z-0 opacity-20'></div>
						<div className='bg-gradient-to-r from-[#4568DC] via-[#86A1EC] to-[#C7DAFC] h-[300px] w-[300px] top-96 left-[1100px]  rounded-full absolute inset-0 z-0 opacity-20'></div>
						<div className='bg-gradient-to-r from-[#4568DC] via-[#C7DAFC] to-white w-screen -left-48 -top-24 absolute inset-0 z-0 opacity-10'></div>
						<WelcomeAbout />
					</div>
					<div
						className='relative bg-white h-full pb-20 overflow-hidden'
						id='upcomingSection'
					>
						<div className='bg-gradient-to-r from-[#4568DC] via-[#86A1EC] to-[#C7DAFC] h-[300px] w-[300px] -top-10 left-[600px]  rounded-full absolute inset-0 z-0 opacity-20'></div>
						<div className='bg-gradient-to-r from-[#4568DC] via-[#86A1EC] to-[#C7DAFC] h-[300px] w-[300px] top-72 left-[1100px]  rounded-full absolute inset-0 z-0 opacity-20'></div>
						<div className='bg-gradient-to-r from-[#4568DC] via-[#86A1EC] to-[#C7DAFC] h-[300px] w-[300px] top-96 left-[200px]  rounded-full absolute inset-0 z-0 opacity-20'></div>
						<div className='bg-gradient-to-r from-[#4568DC] via-[#C7DAFC] to-white w-screen -left-48 -top-24 absolute inset-0 z-0 opacity-10'></div>{" "}
						<div className='bg-gradient-to-r from-white via-[#C7DAFC] to-[#4568DC] w-screen -top-24 absolute inset-0 z-0 opacity-5 overflow-hidden'></div>{" "}
						<WelcomeUpcoming />
					</div>
					<Footer />
				</div>
			</div>
		</>
	);
};

export default WelcomeHome;
