// Sidebar.tsx
"use client";

import React from "react";
import SidebarMenu from "./SidebarMenu";
import { SidebarItems } from "@/types";
import {
  Calendar,
  LayoutDashboard,
  Users,
  CalendarClockIcon,
  Activity,
  User,
  ClipboardCheck,
  School2,
} from "lucide-react";

interface SidebarProps {
  className?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const sidebarItems: SidebarItems = {
  links: [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      className: "string",
    },
    {
      label: "Student Information",
      href: "/studentInfo",
      icon: Users,
      className: "string",
    },
    {
      label: "Staff Information",
      href: "/staffInfo",
      icon: User,
      className: "string",
    },
    {
      label: "Attendance",
      href: "/attendance",
      icon: ClipboardCheck,
      className: "string",
    },
    {
      label: "Dummy Attendance",
      href: "/dummyAttendance",
      icon: ClipboardCheck,
      className: "string",
    },
    {
      label: "Classroom",
      href: "/classroom",
      icon: School2,
      className: "string",
    },
    { label: "TimeTable", href: "/", icon: Calendar, className: "string" },
    {
      label: "Events",
      href: "/",
      icon: CalendarClockIcon,
      className: "string",
    },
    { label: "Activity", href: "/", icon: Activity, className: "string" },
  ],
};

const Sidebar: React.FC<SidebarProps> = ({ className, open, setOpen }) => {
  return (
    <div className={className}>
      <SidebarMenu sidebarItems={sidebarItems} open={open} setOpen={setOpen} />
    </div>
  );
};

export default Sidebar;
