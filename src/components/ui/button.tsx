// file: components/Button.tsx

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as LucideIcons from "lucide-react"; // Import all icons from Lucide React
import { cn } from "@/lib/utils"; // Utility for combining class names

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-primary text-white hover:bg-primary/90",
				lms: "bg-lmsAccent text-white rounded font-semibold text-sm",
				lmsOutline:
					"outline-lmsAccent outline rounded text-lmsAccent font-semibold text-sm",
				lmsNext:
					"text-white w-20 h-10 rounded bg-lmsAccent text-semibold text-sm disabled:bg-lms-200 disabled:text-lms-600 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#115DB8] hover:to-[#0F4A95]",
				lmsBack:
					"bg-background border border-[#CDD3DB] text-lmsPrimary text-sm font-semibold w-20 h-10 rounded gap-2.5",
				lmsActive:
					"bg-lmsAccent text-[#fff] rounded text-sm font-medium",
				lmsInActive:
					"bg-lms-50 text-lmsPrimary hover:bg-lms-50 text-sm font-medium text-lmsPrimary rounded",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90",
				outline:
					"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-10 rounded w-32 py-2.5 px-6",
				icon: "h-10 w-10",
				lms: "py-2.5 px-6 w-40 h-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	iconName?: keyof typeof LucideIcons; // Icon name from Lucide icons
	iconSize?: number; // Size of the icon (Tailwind size)
	iconPosition?: "left" | "right"; // Position of the icon
	iconMargin?: string; // Tailwind margin classes like 'mr-2', 'ml-2'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			iconName,
			iconSize = 5, // Default tailwind size class
			iconPosition = "left", // Default position of icon is left
			iconMargin = "mr-2", // Default margin when icon is on the left
			children,
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot : "button";

		// Check if the iconName exists and is a valid component
		const IconComponent =
			iconName && LucideIcons[iconName]
				? (LucideIcons[iconName] as React.FC<
						React.SVGProps<SVGSVGElement>
				  >)
				: null;

		// Dynamically generate tailwind class based on the iconSize prop
		const iconSizeClass = `h-${iconSize} w-${iconSize}`;

		// Conditionally generate margin class based on iconPosition
		const marginClass =
			iconPosition === "left"
				? iconMargin
				: `ml-${iconMargin.split("-")[1]}`;

		// Conditional rendering based on iconPosition
		const renderIcon = () =>
			IconComponent && (
				<IconComponent
					className={cn(
						`text-lmsAccent ${iconSizeClass} ${marginClass}`
					)}
				/>
			);

		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			>
				{iconPosition === "left" && renderIcon()}{" "}
				{/* Icon on the left */}
				{children} {/* Button label/content */}
				{iconPosition === "right" && renderIcon()}{" "}
				{/* Icon on the right */}
			</Comp>
		);
	}
);

Button.displayName = "Button";

export { Button, buttonVariants };
