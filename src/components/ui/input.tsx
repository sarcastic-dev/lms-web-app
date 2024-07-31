import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					"h-10 w-full rounded border border-lms-200 bg-background px-4 xl:py-6 lg:py-5 xl:text-sm lg:text-xs  text-lmsPrimary focus:to-lmsSecondary xl:font-semibold lg:font-medium  focus:border-lmsSecondary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-lms-300 xl:placeholder:text-sm lg:placeholder:text-xs placeholder:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Input.displayName = "Input";

export { Input };
