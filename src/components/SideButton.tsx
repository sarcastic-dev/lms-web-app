// components/SideButton.tsx
import React from 'react';
import { Button, ButtonProps } from './ui/button';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './ui/tooltip';

interface SidebarButtonProps extends ButtonProps {
    icon?: LucideIcon;
    collapsed?: boolean;
    label: string;
}

const SideButton = ({ icon: Icon, className, children, collapsed, label, ...props }: SidebarButtonProps) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" className={cn('gap-3 justify-start transition-all duration-500', className)} {...props}>
                        {Icon && <Icon size={20} className="min-w-[20px]" color='#0067ff'/>}
                        <span
                            className={`transition-all duration-500 transform ${collapsed ? 'scale-0' : 'scale-100'} origin-left`}
                            style={{ transformOrigin: 'left' }}
                        >
                            {children}
                        </span>
                    </Button>   
                </TooltipTrigger>
                {collapsed && (
                    <TooltipContent side='right'>
                        {label}
                    </TooltipContent>
                )}
            </Tooltip>
        </TooltipProvider>
    );
};

export default SideButton;
