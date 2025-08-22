// Modal.js
import React, { useEffect } from 'react';
import './Modal.css'; // Import the CSS file

const Modal = ({ isOpen, onClose, title, children, showCloseButton = true }) => {
  
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Don't render if modal is not open
  if (!isOpen) return null;

  // Handle backdrop click (click outside modal to close)
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-component-overlay" onClick={handleBackdropClick}>
      <div className="modal-component-content">
        <div className="modal-component-header">
          {title && <h2 className="modal-component-title">{title}</h2>}
          {showCloseButton && (
            <button 
              className="modal-component-close" 
              onClick={onClose} 
              aria-label="Close modal"
            >
              ×
            </button>
          )}
        </div>

        <div className="modal-component-body">
          {children}
        </div>
        
      </div>
    </div>
  );
};

export default Modal;