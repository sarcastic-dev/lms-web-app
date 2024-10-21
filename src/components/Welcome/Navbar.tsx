"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/newButton";
import Link from "next/link";

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	const handleScrollToSection = (sectionId: string) => {
		const section = document.getElementById(sectionId);
		if (section) {
			section.scrollIntoView({ behavior: "smooth" });
		}
	};

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			setIsScrolled(scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	return (
		<div
			className={`sticky top-0 flex items-center justify-between sm:px-8 lg:px-14 h-16 z-50 transition-all duration-300 ${
				isScrolled ? "bg-white shadow-lg" : "bg-transparent"
			}`}
		>
			{" "}
			<div className='bg-gradient-to-r from-[#4568DC] via-[#C7DAFC] to-white absolute inset-0 z-0 opacity-10'></div>
			<div
				className='flex items-center z-50'
				onClick={() => handleScrollToSection("mainSection")}
			>
				<div className='flex items-center cursor-pointer'>
					<Link href={"/"}>
						<img
							src='/lmsBuddyLogo.png'
							alt='Brand Logo'
							className='sm:w-32 md:w-36 lg:w-40 sm:h-7 md:h-8 lg:h-10'
						/>
					</Link>

					{/* LMS<span className="text-lmsAccent">Buddy</span> */}
				</div>
			</div>
			<div className='flex items-center space-x-10 z-50'>
				<div className='flex space-x-5 z-50'>
					{/* <Button
          variant={"link"}
          className="text-base font-medium text-lmsAccent"
        >
          Services
        </Button> */}
					<Button
						variant={"link"}
						className='sm:text-xs md:text-sm lg:text-base font-medium text-lmsAccent p-0'
						onClick={() => handleScrollToSection("aboutSection")}
					>
						About
					</Button>
					<Button
						variant={"link"}
						className='sm:text-xs md:text-sm lg:text-base font-medium text-lmsAccent p-0'
						onClick={() => handleScrollToSection("upcomingSection")}
					>
						Upcoming Features
					</Button>
				</div>
				<div className='flex space-x-5 z-50'>
					<Link href={"/login"}>
						<Button
							variant={"lmsBorder"}
							className='sm:text-xs lg:text-sm sm:p-2 lg:p-4 sm:h-7 lg:h-10 bg-transparent'
						>
							Login
						</Button>
					</Link>
					<Link href={"/signup"}>
						<Button
							variant={"lmsActive"}
							className='sm:text-xs lg:text-sm sm:h-7 lg:h-10 sm:p-3 lg:p-4'
						>
							Get Started
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
