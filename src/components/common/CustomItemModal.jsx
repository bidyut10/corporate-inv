import React from 'react'
import {X} from 'lucide-react'

const CustomItemModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-md font-semibold text-neutral-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-neutral-600 p-2 hover:bg-neutral-100 rounded cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default CustomItemModal