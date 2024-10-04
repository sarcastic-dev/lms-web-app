// SidebarMenu.tsx
"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, LogOut, User } from "lucide-react";
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
  const [name, setName] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [instituteLogo, setInstituteLogo] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setName(Cookies.get("name") || "");
    }

    const updateImagesFromCookies = () => {
      const storedInstituteLogo = Cookies.get("logoImageUrl");
      const storedProfileImage = Cookies.get("adminImageUrl");

      if (storedInstituteLogo) {
        setInstituteLogo(storedInstituteLogo);
      }
      if (storedProfileImage) {
        setProfileImage(storedProfileImage);
      }
    };

    // Listen for changes in cookies
    window.addEventListener("storage", updateImagesFromCookies);

    // Initial load
    updateImagesFromCookies();

    return () => {
      window.removeEventListener("storage", updateImagesFromCookies);
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove("accessToken", { path: "/" });
    Cookies.remove("instituteId", { path: "/" });
    Cookies.remove("refreshToken", { path: "/" });
    Cookies.remove("email", { path: "/" });
    Cookies.remove("name", { path: "/" });
    Cookies.remove("userId", { path: "/" });
    Cookies.remove("adminImageUrl", { path: "/" });
    Cookies.remove("logoImageUrl", { path: "/" });

    window.location.href = "/login";
  };

  return (
    <aside
      className={`bg-lms-50 h-screen p-5 relative transition-all duration-500 ${
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
        <div className="w-8 h-8 border-2 border-lms-100 cursor-pointer absolute top-3 right-[30px] rounded-full flex items-center justify-center bg-white transition-all duration-500 ">
          <ChevronRight
            className="text-4xl text-lmgSecondary"
            onClick={() => setOpen(!open)}
          />
        </div>
      )}

      <div className="h-full">
        <div className="flex justify-center">
          <img
            src={instituteLogo ?? undefined}
            alt="Selected file preview"
            className={`${
              open ? "h-28 w-28" : "h-14 w-14"
            } mt-14 rounded-full object-cover`}
          />
        </div>

        <div className="mt-8">
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
              <Avatar
                className={`border-[0.5px] ${open ? "ml-0" : "ml-[27px]"}`}
              >
                <AvatarImage
                  src={profileImage ?? undefined}
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
                    <span>{name}</span>
                    <span className="flex justify-start text-xs text-[#3A597D]">
                      Admin
                    </span>
                  </span>
                </div>
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[220px] h-32 mb-2 bg-white">
            <div className="flex flex-col justify-start items-center text-xs gap-2">
              <Link href="/profile" className="flex w-full">
                <Button variant="ghost" className="gap-3 w-full justify-start">
                  <User size={20} color="#0067ff" /> <span>Profile</span>
                </Button>
              </Link>
              <Link href="/login" className="flex w-full">
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
