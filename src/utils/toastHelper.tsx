import { toast } from "@/components/ui/use-toast";
import { CheckCircleIcon, CircleX } from "lucide-react";

type ToastType = "success" | "error";

// Toast Function to Show Toast with Typescript
export const showToast = (type: ToastType, message: string): void => {
	const isSuccess = type === "success";
	const Icon = isSuccess ? CheckCircleIcon : CircleX;
	const bgColor = isSuccess ? "#baf8c6" : "#ffb8b7"; // Success or error colors
	const borderColor = isSuccess ? "#24A148" : "#C92710"; // Success or error border colors

	toast({
		title: "",
		description: (
			<div
				style={{
					display: "flex",
					alignItems: "center",
				}}
			>
				<Icon
					size={24}
					style={{ marginRight: "18px" }}
					className={isSuccess ? "text-lmsSuccess" : "text-lmsError"}
				/>
				<div>
					<strong>{isSuccess ? "Success" : "Error!!"}</strong>
					<p>{message}</p>
				</div>
			</div>
		),
		style: {
			backgroundColor: bgColor,
			color: "#092F5C",
			padding: "12px 16px",
			borderRadius: "8px",
			borderLeft: `4px solid ${borderColor}`,
			boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
		},
		duration: 3000, // Auto-hide after 3 seconds
	});
};
