"use client"
import React from 'react';
import Navbar from '../../components/Navbar';
import { FaSyncAlt } from 'react-icons/fa';
import Image from 'next/image';

const Dashboard: React.FC = () => {
  const handleRefresh = () => {
    // Implement your refresh logic here
    console.log('Refreshing data...');
  };
  return (
    <div className="flex-1 h-screen bg-white p-10">
      <div className='absolute top-0 w-screen left-0'>
      <Navbar/>
      </div>
      <div className='absolute top-28 w-11/12 left-16'>
      <div className="bg-blue-100 text-black font-semibold p-4 mb-10 rounded-lg">
        <p className='ml-3'>Teacher Invite Link</p>
        <p className='ml-3 mt-3 mb-3'>Share the below link with your teachers to join your institute (TFI ID : SAB517 )</p>
        <a href="#" className="text-blue-500 font-normal ml-3">https://www.schoolbuddy.com/enrollment?token=8b3ed19b-70d9-4963-938a-9ad40aaee6f0</a>
      </div>
      <div className="grid grid-cols-2 gap-10">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <div className='flex justify-between'>
            <div className='flex space-x-2'>
            <div>
              <Image src='/videoDash' alt='iconImage' width={200} height={200}/>
            </div>
            <h2 className="text-md font-semibold">Classroom Engagement</h2>
            <button
              onClick={handleRefresh}
              className="text-gray-500 hover:text-gray-700"
              title="Refresh"
               >
              <FaSyncAlt className="text-sm" />
            </button>
            </div>
          <button className="text-blue-500">View Reports</button>
          </div>
          <p>Teacher Licenses Used</p>
          <p>Total Teacher Licenses</p>
          <div className="mt-6">
            <p>Teachers using IFP</p>
            <p>Total Teachers</p>
            <p>Total Active Classrooms</p>
            <p>Total Classrooms</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div>

          </div>
        <div>
              <Image src='/schoolDash.png' alt='iconImage' width={200} height={200}/>
            </div>
          <h2 className="text-xl font-bold mb-4">Institute Overview</h2>
          <p>Teacher</p>
          <p>Student</p>
          <p>Non Teaching Staff</p>
          <button className="text-blue-500 mt-4">Add teachers</button>
          <button className="text-blue-500 mt-4">Assign students</button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
