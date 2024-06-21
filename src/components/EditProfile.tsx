"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const EditProfile: React.FC = () => {
  const [instituteName, setInstituteName] = useState('Sabke Level Niklenge');
  const [contactNumber, setContactNumber] = useState('91-8979916865');
  const [alternateNumber, setAlternateNumber] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [isBasicDetailsVisible, setIsBasicDetailsVisible] = useState(true);
  const [notification, setNotification] = useState<{ message: string; type: string } | null>(null);


  // State for card details
  const [cardDetails, setCardDetails] = useState({
    instituteName: 'Sabke Level Niklenge',
    academicYear: 'AY 2024-25',
    status: 'Ongoing'
  });

  // Notification Component
  const Notification = ({ message, type }: { message: string; type: string }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <div className={`absolute bottom-5 left-8 z-50 font-medium mb-4 rounded-lg text-green-500`}>
        {message}
      </div>
    );
  };
  

  const handleUpdate = () => {
    // Update card details with the form values
    setCardDetails({
      instituteName,
      academicYear: 'AY 2024-25', // Assuming academic year is static for now
      status: 'Ongoing' // Assuming status is static for now
    });

     // Show notification
     setNotification({ message: 'Details Saved', type: 'green' });

     // Close sidebar
     setIsBasicDetailsVisible(false);

    console.log('Updated details:', {
      instituteName,
      contactNumber,
      alternateNumber,
      email,
      website,
      addressLine1,
      addressLine2,
      pincode,
      state,
      city,
    });
  };

  return (
    <div >
      <div className='absolute rounded-tl-3xl bg-slate-50 w-screen top-0 left-0 p-3'>
        <h2 className="text-xl font-bold mb-3 mt-3 ml-10">Institute Details</h2>
      </div>
      <div>
        <div className='flex ml-6 mt-4'>
          <div className='bg-gray-200 w-20 h-20 rounded-xl mt-2'>
            <Image src='/editSchool.png' alt='schoolImage' width={100} height={70} priority />
          </div>
          <div className='mt-3 ml-5'>
            <p className='text-sm mb-2'>Upload institute logo</p>
            <p className='text-xs mb-1'>(File size: max 10MB | Formats: .PNG, .JPG)</p>
            <button className='text-blue-500 font-semibold'>Upload</button>
          </div>
        </div>
      </div>
      <div className='bg-white border rounded-3xl shadow-lg mt-5 ml-6'>
        <div className='rounded-3xl bg-slate-100 w-full top-0 left-0 p-1 flex justify-between items-center'>
          <h1 className="text-xl font-bold mb-3 mt-3 ml-2">Basic Details</h1>
          <button
            onClick={() => setIsBasicDetailsVisible(!isBasicDetailsVisible)}
            className="mr-4"
          >
            {isBasicDetailsVisible ? <FaChevronUp className="text-xl text-gray-600" /> : <FaChevronDown className="text-xl text-gray-600" />}
          </button>
        </div>
        {isBasicDetailsVisible && (
          <div className='flex flex-wrap ml-7 mt-4 max-h-96 overflow-y-auto hide-scrollbar'>
            <div className="mb-4">
              <label className="block text-sm text-gray-700">Institute Name <span className='text-red-500'>*</span></label>
              <input
                type="text"
                value={instituteName}
                onChange={(e) => setInstituteName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4 ml-10">
              <label className="block text-sm text-gray-700">Institute Contact Number</label>
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4 ml-10">
              <label className="block text-sm text-gray-700">Alternate Contact Number</label>
              <input
                type="text"
                value={alternateNumber}
                onChange={(e) => setAlternateNumber(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4 mt-2 w-5/12">
              <label className="block text-sm text-gray-700">Email ID</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4 mt-2 ml-14 w-6/12">
              <label className="block text-sm text-gray-700">Website URL</label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="border-t-2 border-slate-100 w-11/12 ml-9 mb-2"></div>
            <div className="mb-4">
              <p className=' font-medium'>Institute Address</p>
              <div className='ml-7 mr-7 mt-3'>
                <label className="block text-gray-700 text-sm">Address Line 1 <span className='text-red-500'>*</span></label>
                <input
                  type="text"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                />
              </div>
              <div className='ml-7 mr-7 mt-3'>
                <label className="block text-gray-700 text-sm">Address Line 2</label>
                <input
                  type="text"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className='flex mt-3'>
                <div className='ml-7 mr-7 mt-3'>
                  <label className="block text-gray-700 text-sm">Pincode <span className='text-red-500'>*</span></label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className='ml-7 mr-7 mt-3'>
                  <label className="block text-gray-700 text-sm">State <span className='text-red-500'>*</span></label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className='ml-7 mr-7 mt-3'>
                  <label className="block text-gray-700 text-sm">City/Town <span className='text-red-500'>*</span></label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {notification && <Notification message={notification.message} type={notification.type} />}
      <div className='absolute flex items-center justify-end bottom-0 left-0 bg-white h-24 shadow-inner border w-full'>
        <button onClick={handleUpdate} className="bg-blue-500 text-white mr-5 py-3 px-10 rounded-md">
          Update Details
        </button>
      </div>
    </div>
  );  
};

export default EditProfile;
