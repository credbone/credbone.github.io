import React, { useEffect } from 'react';


interface SnackbarProps {
  id: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ id, message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [id, duration, onClose]);

  return (
    <group className="snackbar"  data-space="15" data-radius="10" data-background="snackbar" data-color="white" data-length="auto">
      {message}
    </group>
  );
};

export default Snackbar;
