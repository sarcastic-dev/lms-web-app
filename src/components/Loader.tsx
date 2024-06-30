import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen space-x-1 bg-blue-500">
      <div className="flex flex-col items-center justify-center w-10 h-28 bg-white rounded-lg animate-fingerTap">
        <div className='absolute top-3'>
          <div className='border-b-4 w-6 border-blue-500 mb-1'></div>
          <div className='border-b-4 w-6 border-blue-500'></div>
        </div>
        <div className='absolute bottom-1 bg-blue-500 h-8 w-8 rounded-bl-sm rounded-br-sm rounded-tl-md rounded-tr-md'></div>
      </div>

      <div className="flex flex-col items-center justify-center w-10 h-32 bg-white rounded-lg animate-fingerTap2">
        <div className='absolute top-3'>
          <div className='border-b-4 w-6 border-blue-500 mb-1'></div>
          <div className='border-b-4 w-6 border-blue-500'></div>
        </div>
        <div className='absolute bottom-1 bg-blue-500 h-8 w-8 rounded-bl-sm rounded-br-sm rounded-tl-md rounded-tr-md'></div>
     </div>

      <div className="flex flex-col items-center justify-center w-10 h-36 bg-white rounded-lg animate-fingerTap3">
        <div className='absolute top-3'>
          <div className='border-b-4 w-6 border-blue-500 mb-1'></div>
          <div className='border-b-4 w-6 border-blue-500'></div>
        </div>
        <div className='absolute bottom-1 bg-blue-500 h-8 w-8 rounded-bl-sm rounded-br-sm rounded-tl-md rounded-tr-md'></div>
      </div>

      <div className="flex flex-col items-center justify-center w-10 h-32 bg-white rounded-lg animate-fingerTap4">
        <div className='absolute top-3'>
          <div className='border-b-4 w-6 border-blue-500 mb-1'></div>
          <div className='border-b-4 w-6 border-blue-500'></div>
        </div>
        <div className='absolute bottom-1 bg-blue-500 h-8 w-8 rounded-bl-sm rounded-br-sm rounded-tl-md rounded-tr-md'></div>
      </div>

      <div className="flex flex-col items-center justify-center w-12 h-10 bg-white rounded-br-3xl rounded-tr-sm skew-y-12 animate-fingerTap5">
        {/* <div className='absolute top-3'>
          <div className='border-b-4 w-6 border-blue-500 mb-1'></div>
          <div className='border-b-4 w-6 border-blue-500'></div>
        </div>
        <div className='absolute bottom-1 bg-blue-500 h-8 w-8 rounded-bl-sm rounded-br-sm rounded-tl-md rounded-tr-md'></div> */}
      </div>
      <div className='absolute bottom-60'>
        <p className='text-white text-xl font-semibold animate-bounce'>Waiting.....</p>
      </div>
    </div>
  );
};

export default Loader;
