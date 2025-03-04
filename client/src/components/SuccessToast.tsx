import { Toast, ToastContainer } from 'react-bootstrap';
import { useState, useEffect } from 'react';

interface SuccessToastProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

const SuccessToast: React.FC<SuccessToastProps> = ({ show, message, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={show} onClose={onClose} bg="success">
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default SuccessToast;