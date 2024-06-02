"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import CreateInstitute from '../createinstitute/page';
// import { useRouter } from 'next/navigation';

const ProfileCreation: React.FC = () => {

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState<{ name?: string; username?: string }>({});
  const [showInstituteCreation, setShowInstituteCreation] = useState(false);
  // const router = useRouter();

  const validateForm = () => {
    const newErrors: { name?: string; username?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required.';
    }

    const usernameRegex = /^[a-zA-Z0-9._-]{6,20}$/;
    if (!username.trim()) {
      newErrors.username = 'Username is required.';
    } else if (!usernameRegex.test(username)) {
      newErrors.username = 'Username must be 6-20 characters long and can only include letters, numbers, dots, dashes, and underscores.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Proceed with form submission
      console.log('Form submitted:', { name, username });

       // Transition to the next step (create institute)
      //  router.push("/create-institute")
      setShowInstituteCreation(true);
    }
  };

  if (showInstituteCreation) {
    return <CreateInstitute /> // Render the CreateInstitute component
  };


  return (
      <div>
        <h1 className="text-2xl text-center font-bold mb-3">Account Details</h1>
        <p className="text-center text-gray-500 mb-6">Please enter your details</p>
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Image
              src="/profileIcon.png"  // Replace with the actual path to your avatar image
              alt="Avatar"
              width={200}
              height={200}
              className="w-24 h-24 rounded-full"
            />
            <div className="absolute bottom-3 right-3 bg-white p-1 rounded-full border-2">
              <Image
                src="/editIconNew.png"  // Replace with the actual path to your edit icon
                alt="Edit"
                width={200}
                height={200}
                className="w-3 h-3"
              />
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name<span className="text-red-500"> *</span></label>
            <input
               type="text"
               className={`w-full p-4 border rounded-xl bg-slate-100 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
               placeholder="Enter Your Name"
               value={name}
               onChange={(e) => setName(e.target.value)}
               required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username<span className="text-red-500"> *</span></label>
            <input
               type="text"
               className={`w-full p-4 border rounded-xl bg-slate-100 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
               placeholder="Enter Your Username"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               required
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-10 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Create Account
          </button>
        </form>
      </div>
  );
};

export default ProfileCreation;
