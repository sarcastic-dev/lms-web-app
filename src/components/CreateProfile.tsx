"use client";
import React, { useState, useEffect } from 'react';
import CreateInstitute from '../components/createInstitute';
import axiosInstance from '@/lib/axiosInstance';

type Field = 'name' | 'email' | 'phone' | 'password';

interface ProfileCreationProps {
  input: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const CreateProfile: React.FC<ProfileCreationProps> = ({ input }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; phoneNumber?: string; password?: string }>({});
  const [showInstituteCreation, setShowInstituteCreation] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);

  useEffect(() => {
    if (name.trim() && password.trim() && (isEmail ? email.trim() : phoneNumber.trim())) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [name, email, phoneNumber, password, isEmail]);

  const handleFocus = (field: Field) => {
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: Field, value: string) => {
    if (value.trim() === '') {
      setIsFocused((prev) => ({ ...prev, [field]: false }));
    }
  };

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; phoneNumber?: string; password?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const parseName = (name: string) => {
    const nameParts = name.trim().split(' ');
    const parsedName: { firstName: string; middleName?: string; lastName?: string } = { firstName: nameParts[0] };

    if (nameParts.length === 2) {
      parsedName.lastName = nameParts[1];
    } else if (nameParts.length >= 3) {
      parsedName.middleName = nameParts.slice(1, -1).join(' ');
      parsedName.lastName = nameParts[nameParts.length - 1];
    }

    return parsedName;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsCreating(true);
      const parsedName = parseName(name);
      try {
        const response = await axiosInstance.post('/users', {
          ...parsedName,
          email: isEmail ? input : email,
          phone: isEmail ? phoneNumber : input,
          password,
          role: "admin"
        });
        console.log('Form submitted:', response.data);
        setUserId(response.data.id); // Store the user_id

        setTimeout(() => {
          setIsCreating(false);
          setShowInstituteCreation(true);
        }, 2000);
      } catch (error) {
        console.error('Error creating user:', error);
        setErrorMessage('Error creating user. Please try again.');
        setIsCreating(false);
      }
    }
  };

  const handleUserSelect = async (userId: string) => {
    try {
      const response = await axiosInstance.get<User>(`/users/${userId}`);
      setSelectedUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  if (showInstituteCreation && userId) {
    return <CreateInstitute userId={userId} />;
  }

  return (
    <div className="bg-white border p-8 rounded-lg shadow-xl w-2/6 h-5/6 z-10">
      <h1 className="text-2xl text-center text-blue-500 font-bold mb-3">Account Details</h1>
      <p className="text-center text-gray-500 mb-6">Please enter your details</p>
      <form onSubmit={handleSubmit}>
        <div className="p-8">
          <div className="relative mb-4">
            <div className={`absolute left-4 transition-all duration-200 ease-in-out pointer-events-none ${isFocused.name || name ? 'text-xs -top-1 mt-3' : 'top-4 text-gray-400 font-medium'}`}>
              Name<span className="text-red-500"> *</span>
            </div>
            <input
              type="text"
              className={`w-full font-medium p-2 pl-4 mb-4 border-2 border-gray-400 rounded-xl bg-white focus:border-blue-600 focus:border-2 outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'} pt-6`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => handleFocus('name')}
              onBlur={() => handleBlur('name', name)}
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {isEmail ? (
            <>
              <div className="relative mb-4">
                <div className={`absolute left-4 transition-all duration-200 ease-in-out pointer-events-none ${isFocused.email || email ? 'text-xs -top-1 mt-3' : '-top-1 text-xs mt-3 text-gray-400 font-medium'}`}>
                  Email
                </div>
                <input
                  type="email"
                  className="w-full font-medium p-2 pl-4 mb-4 border-2 border-gray-400 rounded-xl bg-white focus:border-blue-600 focus:border-2 outline-none pt-6"
                  value={input}
                  disabled
                />
              </div>
              <div className="relative mb-4">
                <div className={`absolute left-4 transition-all duration-200 ease-in-out pointer-events-none ${isFocused.phone || phoneNumber ? 'text-xs -top-1 mt-3' : 'top-4 text-gray-400 font-medium'}`}>
                  Phone Number
                </div>
                <input
                  type="tel"
                  className="w-full font-medium p-2 pl-4 mb-4 border-2 border-gray-400 rounded-xl bg-white focus:border-blue-600 focus:border-2 outline-none pt-6"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onFocus={() => handleFocus('phone')}
                  onBlur={() => handleBlur('phone', phoneNumber)}
                />
              </div>
            </>
          ) : (
            <>
              <div className="relative mb-4">
                <div className={`absolute left-4 transition-all duration-200 ease-in-out pointer-events-none ${isFocused.phone || phoneNumber ? 'text-xs -top-1 mt-3' : '-top-1 text-xs mt-3 text-gray-400 font-medium'}`}>
                  Phone Number
                </div>
                <input
                  type="tel"
                  className="w-full font-medium p-2 pl-4 mb-4 border-2 border-gray-400 rounded-xl bg-white focus:border-blue-600 focus:border-2 outline-none pt-6"
                  value={input}
                  disabled
                />
              </div>
              <div className="relative mb-4">
                <div className={`absolute left-4 transition-all duration-200 ease-in-out pointer-events-none ${isFocused.email || email ? 'text-xs -top-1 mt-3' : 'top-4 text-gray-400 font-medium'}`}>
                  Email
                </div>
                <input
                  type="email"
                  className="w-full font-medium p-2 pl-4 mb-4 border-2 border-gray-400 rounded-xl bg-white focus:border-blue-600 focus:border-2 outline-none pt-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email', email)}
                />
              </div>
            </>
          )}

          <div className="relative mb-4">
            <div className={`absolute left-4 transition-all duration-200 ease-in-out pointer-events-none ${isFocused.password || password ? 'text-xs -top-1 mt-3' : 'top-4 text-gray-400 font-medium'}`}>
              Password<span className="text-red-500"> *</span>
            </div>
            <input
              type="password"
              className={`w-full p-2 font-medium pl-4 border-2 border-gray-400 rounded-xl bg-white focus:border-blue-600 focus:border-2 outline-none ${errors.password ? 'border-red-500' : 'border-gray-300'} pt-6`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => handleFocus('password')}
              onBlur={() => handleBlur('password', password)}
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
        </div>
        <button
          type="submit"
          className={`w-96 ml-8 py-2 font-semibold text-blue-500 border-2 border-blue-500 rounded-xl ${
            isButtonDisabled || isCreating ? 'bg-white cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          disabled={isButtonDisabled || isCreating}
        >
          {isCreating ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
      {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
      {selectedUser && (
        <div className="mt-8">
          <h2 className="text-xl text-center text-blue-500 font-bold mb-3">Selected User Details</h2>
          <p>Name: {selectedUser.name}</p>
          <p>Email: {selectedUser.email}</p>
          <p>Phone: {selectedUser.phone}</p>
        </div>
      )}
    </div>
  );
};

export default CreateProfile;
