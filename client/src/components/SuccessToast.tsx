import { Toast, ToastContainer } from 'react-bootstrap';
import { useEffect } from 'react';

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
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <ToastContainer className="toast-container">
      <Toast show={show} onClose={onClose} className="toast-success">
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default SuccessToast;