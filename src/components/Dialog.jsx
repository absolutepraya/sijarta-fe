import React, { useEffect } from 'react';

export function Dialog({ isOpen, onClose, children }) {
  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Close modal when clicking outside
    >
      <div 
        className="bg-white rounded-lg shadow-lg w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-1"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export function DialogContent({ children }) {
  return <div className="p-6">{children}</div>;
}

export function DialogHeader({ children }) {
  return <div className="p-4 border-b border-gray-300 font-semibold">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="text-xl text-gray-800">{children}</h2>;
}

export default Dialog;