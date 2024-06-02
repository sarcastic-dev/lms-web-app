import React, { useState } from 'react';
import { FaBell, FaQuestionCircle, FaPhoneAlt, FaUser, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Image from 'next/image';
import ExpandedModal from '../extendedmodal/page';

const Navbar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center bg-white p-1 px-5 shadow-md">
        <div className="flex items-center bg-slate-200 px-2 py-1 rounded-xl space-x-1">
          <div className="flex items-center bg-blue-100 rounded-full p-2">
            <Image src="/schoolNavMain1.png" alt="School Icon" width={400} height={400} className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-sm font-semibold">Sabke Level Niklenge</h1>
            <p className="text-xs text-gray-600">AY 2024-25</p>
          </div>
          <button onClick={() => setIsExpanded(!isExpanded)} className="flex items-center bg-gray-200 rounded-full p-2">
            {isExpanded ? <FaChevronUp className="text-xl text-gray-600" /> : <FaChevronDown className="text-xl text-gray-600" />}
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <FaBell className="text-xl text-gray-600" />
          <button className="flex items-center bg-gray-200 text-gray-600 py-2 px-4 rounded-lg">
            <FaQuestionCircle className="mr-2" />
            Help
          </button>
          <button className="flex items-center bg-blue-100 text-blue-600 py-2 px-4 rounded-lg">
            <FaPhoneAlt className="mr-2" />
            Request call back
          </button>
          <div className="flex items-center bg-gray-200 rounded-full p-2">
            <FaUser className="text-xl text-gray-600" />
          </div>
        </div>
      </div>
      {isExpanded && <ExpandedModal onClose={() => setIsExpanded(false)} />}
    </div>
  );
};

export default Navbar;
