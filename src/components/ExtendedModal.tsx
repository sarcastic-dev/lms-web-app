import React from 'react';
import ExpandedCard from '../components/Card';

const ExpandedModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-opacity-75">
      <div className='absolute top-1 left-5'>
      <button className="absolute top-0 right-2 text-gray-600" onClick={onClose}>
          &times;
        </button>
        <ExpandedCard />
      </div>  
    </div>
  );
};

export default ExpandedModal;
