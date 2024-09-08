import React from 'react';

interface EmptyDataProps {
  message: string;
}

const EmptyData: React.FC<EmptyDataProps> = ({ message }) => {
  return (
    <div className='flex justify-center font-medium items-center h-28 mr-16 ml-14 mt-10 mb-5 border'>
      <p>{message}</p>
    </div>
  );
};

export default EmptyData;
