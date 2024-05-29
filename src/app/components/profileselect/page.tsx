import Image from 'next/image';
import React, { useState } from 'react';

const ProfileSelect: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const handleProfileSelect = (profile: string) => {
    setSelectedProfile(profile);
  };

  const handleContinue = () => {
    if (selectedProfile) {
      console.log(`Profile selected: ${selectedProfile}`);
      // Add your logic to proceed with the selected profile
    } else {
      console.log('Please select a profile');
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-center font-bold mb-3">Continue as a</h1>
        <p className="text-gray-400 text-center mb-8">We will personalize your experience accordingly</p>
        <div className="flex flex-col items-center mb-8 space-y-8">
          <div className="flex space-x-10">
            <div
              className={`flex flex-col items-center cursor-pointer p-4 border-2 rounded-2xl w-40 h-40 bg-white shadow-2xl ${selectedProfile === 'Student' ? 'border-blue-500' : 'border-gray-300'}`}
              onClick={() => handleProfileSelect('Student')}
            >
              <Image src="/studentnew.png" alt="Student" width={100} height={100} className="mb-2" /> {/* Adjust size as needed */}
              <p>Student</p>
            </div>
            <div
              className={`flex flex-col items-center cursor-pointer p-4 border-2 rounded-2xl w-40 h-40 bg-white shadow-2xl ${selectedProfile === 'Teacher' ? 'border-blue-500' : 'border-gray-300'}`}
              onClick={() => handleProfileSelect('Teacher')}
            >
              <Image src="/teacher.png" alt="Teacher" width={100} height={100} className="mb-2" /> {/* Adjust size as needed */}
              <p>Teacher</p>
            </div>
          </div>
          <div className="flex justify-center">
            <div
              className={`flex flex-col items-center cursor-pointer p-4 border-2 rounded-2xl w-40 h-40 bg-white shadow-2xl ${selectedProfile === 'Owner' ? 'border-blue-500' : 'border-gray-300'}`}
              onClick={() => handleProfileSelect('Owner')}
            >
              <Image src="/owner.png" alt="Owner" width={100} height={100} className="mb-2" /> {/* Adjust size as needed */}
              <p>Owner</p>
            </div>
          </div>
        </div>

        <div className='w-full flex justify-center'>
        <button
          onClick={handleContinue}
          className="w-80 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Continue
        </button>
        </div>
        
    </div>
        
  );
};

export default ProfileSelect;
