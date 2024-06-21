import Image from 'next/image';
import React, { useState } from 'react';
import { FaCog } from 'react-icons/fa';
import Sidebar from '../components/EditSidebar';

const ExpandedCard: React.FC = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(true);

  const handleSettingsClick = () => {
    setIsSidebarOpen(true);
    setIsCardVisible(false);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setIsCardVisible(true);
  };

  return (
    <div>
      {isCardVisible && (
        <div className="flex flex-col bg-white p-4 shadow-lg rounded-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex items-center bg-blue-100 rounded-full p-2">
                <Image src="/schoolNavMain1.png" alt="School Icon" width={200} height={200} className="w-8 h-8" />
              </div>
              <div className="ml-4">
                <h1 className="text-sm font-bold">Sabke Level Niklenge</h1>
                <p className="text-xs text-gray-600">TFI ID: SAB517</p>
              </div>
            </div>
            <button onClick={handleSettingsClick} className='bg-slate-100 p-2 rounded-lg'>
              <FaCog className="text-xl text-blue-400" />
            </button>
          </div>
          <div className="border-t-2 border-slate-200 w-72 mt-3 ml-2"></div>
          <div className='flex justify-between space-x-5'>
            <div className="mt-4 w-60">
              <label className="text-xs text-gray-600">Academic Session</label>
              <select className="block w-full mt-1 bg-gray-100 py-3 px-2 rounded-lg">
                <option>AY 2024-25</option>
              </select>
            </div>
            <div className="mt-4">
              <label className="text-xs text-gray-600">Status</label>
              <button className="block text-sm w-full mt-1 bg-green-600 text-white p-3 px-5 rounded-lg">Ongoing</button>
            </div>
          </div>
          <div className="mt-4 text-sm font-medium text-blue-600">
            <button>Manage All Session</button>
          </div>
        </div>
      )}
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
    </div>
  );
};

export default ExpandedCard;
