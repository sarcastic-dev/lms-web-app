import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // Ensure this utility function is correctly implemented
import { Loader } from "lucide-react";

// Define the button variants with CVA
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
			variant: {
				default:
					"bg-primary text-white hover:bg-primary/90",
				lms: "bg-lmsAccent text-white rounded font-semibold text-sm",
				lmsOutline:
					"outline-lmsAccent outline rounded text-lmsAccent font-semibold text-sm",
				lmsNext:
					"text-white w-20 h-10 rounded bg-lmsAccent text-semibold text-sm disabled:bg-lms-200 disabled:text-lms-600   transition-all duration-300 hover:bg-gradient-to-r hover:from-[#115DB8] hover:to-[#0F4A95]",
				lmsBack:
					"bg-background  border border-[#CDD3DB] text-lmsPrimary text-sm font-semibold w-20 h-10 rounded gap-2.5",
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
				lms: "py-2.5 px-6 sm:w-[250px] md:w-[320px] lg:w-[402px] mt-5 h-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
  }
);

// Define ButtonProps interface extending HTMLButtonElement and VariantProps
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode; // Optional icon prop
  loading?: boolean; // Loader state
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, icon, loading, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled} // Disable button when loading or explicitly disabled
        {...props}
      >
        {props.disabled && <Loader className="animate-spin mr-2" size={20} />} {/* Show Loader when loading */}
        {!loading && icon && <span className="icon">{icon}</span>} {/* Show icon when not loading */}
        {props.children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
