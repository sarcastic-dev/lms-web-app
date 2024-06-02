import React from 'react';
import Image from 'next/image';

interface SignInFormProps {
  onClose: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onClose }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign-in logic here
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email or mobile number</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-xl bg-slate-100 mb-2"
              placeholder="Enter your email address or phone number"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-xl bg-slate-100 mb-2"
              placeholder="Enter password"
            />
            <button className="text-blue-500 font-semibold">Forgot password?</button>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
          >
            Sign In
          </button>
          <div className="text-center mt-4">
            <button className="text-blue-500 font-semibold" onClick={onClose}>
              Close
            </button>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-gray-500">--------------- Or Sign in with ---------------</div>
          </div>
          <div className="flex justify-center mt-4 space-x-4">
            <button className="bg-white border border-gray-300 p-2 rounded-full">
              <Image src="/google.png" alt="Google" width={40} height={40} />
            </button>
            <button className="bg-white border border-gray-300 p-2 rounded-full">
              <Image src="/facebook.png" alt="Facebook" width={40} height={40} />
            </button>
            <button className="bg-white border border-gray-300 p-2 rounded-full">
              <Image src="/twitternew.png" alt="Twitter" width={40} height={40} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;