"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateInstitute: React.FC = () => {
  const [instituteName, setInstituteName] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<{ instituteName?: string; address?: string }>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { instituteName?: string; address?: string } = {};

    if (!instituteName.trim()) {
      newErrors.instituteName = 'Institute name is required.';
    }

    if (!address.trim()) {
      newErrors.address = 'Address is required.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Proceed with form submission
      console.log('Institute created:', { instituteName, address });
      // Handle institute creation logic here

      router.push('/dashboard');
    }
  };

  return (
      <div>
        <h1 className="text-2xl text-center font-bold mb-3">Enter details to create your institute</h1>
        <p className="text-center text-gray-500 mb-6">Tell us about you and your institute</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Select City</label>
            <select className="w-full p-2 border rounded-xl bg-slate-100">
              <option>Firozabad</option>
              <option>New Delhi</option>
              <option>Gurugram</option>
              <option>Bangalore</option>
              {/* Add other options here */}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Enter your institute type</label>
            <select className="w-full p-2 border rounded-xl bg-slate-100">
              <option>School</option>
              <option>College</option>
              <option>Tuition</option>
              <option>Others</option>
              {/* Add other options here */}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Enter your institute name</label>
            <input
              type="text"
              className={`w-full p-2 border rounded-xl bg-slate-100 ${errors.instituteName ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter Institute Name"
              value={instituteName}
              onChange={(e) => setInstituteName(e.target.value)}
              required
            />
            {errors.instituteName && <p className="text-red-500 text-sm mt-1">{errors.instituteName}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Mobile Number</label>
            <input
              type="text"
              className={`w-full p-2 border rounded-xl bg-slate-100 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Mobile Number"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-10 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Create Institute
          </button>
        </form>
      </div>
  );
};

export default CreateInstitute;
