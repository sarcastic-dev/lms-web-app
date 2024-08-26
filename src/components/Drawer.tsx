import React, { useEffect, useState } from "react";
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
import { Pencil, Plus, PlusCircle, Search } from "lucide-react";
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
	const [currentPath, setCurrentPath] = useState("");
	useEffect(() => {
		setCurrentPath(window.location.pathname);
	});
	return (
		<div>
			<Sheet>
				<SheetTrigger asChild>
					{triggerText === "Assign Class Teacher" ? (
						<Button
							className={`space-x-1 text-white p-0 h-0 text-sm`}
							variant={"link"}
						>
							<p className='text-xs font-medium'>{triggerText}</p>
							<span>
								<Pencil size={12} />
							</span>
						</Button>
					) : (
						<Button variant='lmsActive'>
							<PlusCircle size={15} className="mr-1"/>
							{triggerText}
						</Button>
					)}
				</SheetTrigger>
				<SheetContent className={`max-w-[400px] ${title === 'Assign Student To Classroom'?'sm:max-w-[700px]':'sm:max-w-[600px]'}`}>
					<SheetHeader>
						<SheetTitle className='text-2xl font-bold text-lmsPrimary'>
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
