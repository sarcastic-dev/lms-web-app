import React from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "./ui/input";
import { Plus, Search } from "lucide-react";
import { Button } from "./ui/button";

interface AppProps {
	title: string;
	children: React.ReactNode;
	triggerText?: string;
	// buttonTitle: string;
	// onClick: () => void;
}

const Drawer: React.FC<AppProps> = ({
	children,
	title,
	triggerText,
	// buttonTitle,
	// onClick,
}) => {
	return (
		<div>
			<Sheet>
				<SheetTrigger asChild>
					{triggerText === "Add Teacher" || triggerText === "Add Students" ? (
						<Button
							className='space-x-1 text-blue-500'
							variant={"link"}
						>
							<span>
								<Plus size={12} />
							</span>
							<p className='text-xs font-semibold'>
								{triggerText}
							</p>
						</Button>
					) : (
						<Button variant='outline'>{triggerText}</Button>
					)}
				</SheetTrigger>
				<SheetContent className='max-w-[400px] sm:max-w-[600px]'>
					<SheetHeader>
						<SheetTitle className='text-2xl font-bold text-gray-600'>
							{title}
						</SheetTitle>
					</SheetHeader>
					{children}
					{/* <SheetTitle onClick={onClick}>{title}</SheetTitle> */}
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default Drawer;
