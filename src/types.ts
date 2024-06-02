import { LucideIcon } from "lucide-react"

export interface SidebarItems{
    links: Array<{
        label: string,
        href: string,
        icon: LucideIcon
    }>;
}
export interface StepProps {
    step: number;
    currentStep: number;
    description: string;
    icon: LucideIcon;
  }
  
export interface StepperProps {
    step: number;
  }
  
export  interface IconProps {
    className: string;
  }