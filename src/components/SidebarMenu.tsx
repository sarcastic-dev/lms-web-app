// SidebarMenu.tsx
"use client";
import React from "react";
import { BiMenuAltLeft, BiMenuAltRight } from "react-icons/bi";
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import SideButton from "./SideButton";
import { SidebarItems } from "@/types";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/newButton";
import { usePathname } from "next/navigation";
import { Avatar, AvatarImage } from "./ui/avatar";
import Cookies from "js-cookie";

interface SidebarMenuProps {
  sidebarItems: SidebarItems;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarMenu = ({ sidebarItems, open, setOpen }: SidebarMenuProps) => {
  const pathName = usePathname();

  const handleLogout = () => {
    Cookies.remove("accessToken", { path: "/" });
    Cookies.remove("instituteId", { path: "/" });
    Cookies.remove("refreshToken", { path: "/" });

    window.location.href = "/login";
  };

  return (
    <aside
      className={`bg-lms-50 h-screen p-5  relative transition-all duration-500 ${
        open ? "w-[248px]" : "w-[93px]"
      }`}
    >
      {open ? (
        <div className="w-8 h-8 border-2 border-lms-100 cursor-pointer absolute top-3 right-3 rounded-full flex items-center justify-center bg-white transition-all duration-500">
          <ChevronLeft
            className="text-4xl text-lmgSecondary"
            onClick={() => setOpen(!open)}
          />
        </div>
      ) : (
        <div className="w-8 h-8 border-2 border-lms-100 cursor-pointer absolute top-3 right-3 rounded-full flex items-center justify-center bg-white transition-all duration-500 ">
          <ChevronRight
            className="text-4xl text-lmgSecondary"
            onClick={() => setOpen(!open)}
          />
        </div>
      )}

      <div className="h-full">
        {/* <div className='text-lg font-semibold text-foreground transition-all duration-300 flex items-center justify-center'>
					{open ? <h3>Logo.</h3> : <h3>Logo.</h3>}
				</div> */}
        <div className="mt-10">
          <div className="flex flex-col gap-2 w-full">
            {sidebarItems.links.map((link, index) => (
              <Link key={index} href={link.href}>
                <SideButton
                  icon={link.icon}
                  collapsed={!open}
                  className="w-full"
                  label={link.label}
                  nameOfPath={link.href}
                  variant={pathName === link.href ? "lmsActive" : "lmsInActive"}
                >
                  {link.label}
                </SideButton>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 w-full left-0 px-5">
        <Separator className="mb-4 bg-gray-500 shadow" />
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex justify-center px-4 space-x-2">
              <Avatar className="border-[0.5px]">
                <AvatarImage
                  src="/profileAvatar.png"
                  alt="profileImage"
                ></AvatarImage>
              </Avatar>
              <Button
                variant="ghost"
                iconName="chevronDown"
                iconPosition="end"
                iconAlign="start"
                iconSize={20}
                className="gap-3 p-0 justify-start w-full"
              >
                <div>
                  <span
                    className={`transition-all flex flex-col text-[#092F5C] text-sm duration-500 transform ${
                      !open ? "scale-0" : "scale-100"
                    } origin-left`}
                    style={{ transformOrigin: "left" }}
                  >
                    Arpita Saxena
                    <span className="flex justify-start text-xs text-[#3A597D]">
                      Admin
                    </span>
                  </span>
                </div>
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[220px] h-56 mb-2 bg-white">
            <div className="flex flex-col justify-start items-center text-xs gap-2">
              <Link href="/profile" className="flex w-full">
                <Button variant="ghost" className="gap-3 w-full justify-start">
                  <User size={20} color="#0067ff" /> <span>Profile</span>
                </Button>
              </Link>
              <Link href="/logout" className="flex w-full">
                <Button
                  variant="ghost"
                  className="gap-3 w-full justify-start"
                  onClick={handleLogout}
                >
                  <LogOut size={20} color="#0067ff" /> <span>Logout</span>
                </Button>
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </aside>
  );
};

export default SidebarMenu;
