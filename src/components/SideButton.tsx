// components/SideButton.tsx
import React from "react";
import { Button, ButtonProps } from "./ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipProvider,
} from "./ui/tooltip";
import { usePathname } from "next/navigation";

interface SidebarButtonProps extends ButtonProps {
	icon?: LucideIcon;
	collapsed?: boolean;
	label: string;
	nameOfPath: string;
}

const SideButton = ({
	icon: Icon,
	className,
	children,
	collapsed,
	label,
	nameOfPath,
	...props
}: SidebarButtonProps) => {
	const pathName = usePathname();
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant={"lmsInActive"}
						className={cn(
							`gap-3 justify-start text-white ${
								nameOfPath === pathName ? "text-white" : "text-lmsPrimary"
							} `,
							className
						)}
						{...props}
					>
						{nameOfPath === pathName
							? Icon && (
									<Icon
										size={20}
										className='min-w-[20px] text-white '
									/>
							  )
							: Icon && (
									<Icon
										size={20}
										className='min-w-[20px] text-lmsPrimary '
									/>
							  )}
						<span
							className={`transition-all duration-500 transform ${
								collapsed ? "scale-0" : "scale-100"
							} origin-left`}
							style={{ transformOrigin: "left" }}
						>
							{children}
						</span>
					</Button>
				</TooltipTrigger>
				{collapsed && (
					<TooltipContent side='right' className="z-50">{label}</TooltipContent>
				)}
			</Tooltip>
		</TooltipProvider>
	);
};

export default SideButton;
