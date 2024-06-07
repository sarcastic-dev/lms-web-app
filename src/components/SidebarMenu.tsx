// components/SidebarMenu.tsx
"use client";
import React, { useState } from "react";
import { BiMenuAltLeft, BiMenuAltRight } from "react-icons/bi";
import { LogOut, Settings, User } from "lucide-react";
import SideButton from "./SideButton";
import { SidebarItems } from "@/types";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

interface SidebarMenuProps {
	sidebarItems: SidebarItems;
}

const SidebarMenu = ({ sidebarItems }: SidebarMenuProps) => {
	const [open, setOpen] = useState(true);
	const pathName = usePathname();

	return (
		<aside
			className={`bg-gray-200 h-screen p-5 z-40 relative transition-all duration-500 ${
				open ? "w-60" : "w-24"
			}`}
		>
			{open ? (
				<BiMenuAltRight
					color='#0067ff'
					className='bg-white text-gray-900 text-4xl p-1 rounded-full absolute top-12 -right-4 border border-gray-200 cursor-pointer'
					onClick={() => setOpen(!open)}
				/>
			) : (
				<BiMenuAltLeft
					color='#0067ff'
					className='bg-white text-gray-900 text-4xl p-1 rounded-full absolute top-12 -right-4 border border-gray-200 cursor-pointer'
					onClick={() => setOpen(!open)}
				/>
			)}

			<div className='h-full'>
				<div className='text-lg  font-semibold text-foreground transition-all duration-300 flex items-center justify-center'>
					{open ? (
						<h3>Logo.</h3>
					) : (
						// <GraduationCap size={35} />
						<h3>Logo.</h3>
					)}
				</div>
				<div className='mt-10'>
					<div className='flex flex-col gap-2 w-full'>
						{sidebarItems.links.map((link, index) => (
							<Link
								key={index}
								href={link.href}
							>
								<SideButton
									icon={link.icon}
									collapsed={!open}
									className='w-full'
									label={link.label}
									variant={pathName === link.href ? 'secondary':'ghost'}
								>
									{link.label}
								</SideButton>
							</Link>
						))}
					</div>
				</div>
			</div>
			<div className='absolute bottom-4 w-full left-0 px-5'>
				<Separator className='mb-1 bg-gray-500 shadow' />
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant='ghost'
							className='gap-3 justify-start w-full'
						>
							<Settings
								size={20}
								color='#0067ff'
								className='min-w-[20px]'
							/>
							<span
								className={`transition-all duration-500 transform ${
									!open ? "scale-0" : "scale-100"
								} origin-left`}
								style={{ transformOrigin: "left" }}
							>
								Settings
							</span>
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-44 mb-2 bg-white'>
						<div className='flex flex-col justify-start items-center text-xs gap-2'>
							<Link
								href='/profile'
								className='flex w-full'
							>
								<Button
									variant='ghost'
									className='gap-3 w-full justify-start '
								>
									<User
										size={20}
										color='#0067ff'
									/>{" "}
									<span>Profile</span>
								</Button>
							</Link>
							<Link
								href='/logout'
								className='flex w-full'
							>
								<Button
									variant='ghost'
									className='gap-3 w-full justify-start'
								>
									<LogOut
										size={20}
										color='#0067ff'
									/>{" "}
									<span>Logout</span>
								</Button>
							</Link>
						</div>
					</PopoverContent>
				</Popover>
			</div>
		</aside>
	);
};

export default SidebarMenu;
