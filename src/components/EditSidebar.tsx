"use client"
import React from 'react';
import EditProfile from '../components/EditProfile';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed rounded-tl-3xl top-2 right-0 z-20 w-7/12 bg-white h-full shadow-xl border transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-4 flex justify-end">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          &times;
        </button>
      </div>
      <div className="p-4">
        <EditProfile />
      </div>
    </div>
  );
};

export default Sidebar;
