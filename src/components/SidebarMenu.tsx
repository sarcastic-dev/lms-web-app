// components/SidebarMenu.tsx
'use client'
import React, { useState } from 'react';
import { BiMenuAltLeft, BiMenuAltRight } from "react-icons/bi";
import { GraduationCap, Menu } from 'lucide-react';
import SideButton from './SideButton';
import { SidebarItems } from '@/types';
import Link from 'next/link';

interface SidebarMenuProps {
  sidebarItems: SidebarItems;
}

const SidebarMenu = ({ sidebarItems }: SidebarMenuProps) => {
  const [open, setOpen] = useState(true);

  return (
    <aside
      className={`bg-gray-200 h-screen p-5 z-40 relative transition-all duration-500 ${open ? 'w-60' : 'w-24'}`}
    >
      {
        open ? (
          <BiMenuAltRight
            color='#0067ff'
            className="bg-white text-gray-900 text-4xl p-1 rounded-full absolute top-12 -right-3.5 border border-gray-200 cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        ) : (
            <BiMenuAltLeft
              color='#0067ff'
            className="bg-white text-gray-900 text-4xl p-1 rounded-full absolute top-12 -right-3.5 border border-gray-200 cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        )
      }

      <div className='h-full'>
        <div className='text-lg font-semibold text-foreground transition-all duration-300 flex items-center justify-center'>
          {open ? (
            <h3>Logo.</h3>
          ) : (
              // <GraduationCap size={35} />
              <h3>Logo.</h3>
          )}
        </div>
        <div className='mt-10'>
          <div className='flex flex-col gap-2 w-full'>
            {
              sidebarItems.links.map((link, index) => (
                <Link key={index} href={link.href}>
                  <SideButton icon={link.icon} collapsed={!open} className='w-full' label={link.label}>{link.label}</SideButton>
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarMenu;
