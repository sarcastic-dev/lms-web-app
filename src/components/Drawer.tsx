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
import { Search } from "lucide-react";
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
				<SheetTrigger asChild><Button variant='outline'>{triggerText}</Button></SheetTrigger>
				<SheetContent className='max-w-[400px] sm:max-w-[600px]'>
					<SheetHeader>
						<SheetTitle className="text-xl font-semibold text-gray-600">{title}</SheetTitle>
					</SheetHeader>
					{children}
					{/* <SheetTitle onClick={onClick}>{title}</SheetTitle> */}
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default Drawer;
