import React, { useEffect, useState } from "react";

interface SnackbarProps {
  id: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

const Snackbar: React.FC<SnackbarProps> = ({
  id,
  message,
  duration = 3000,
  onClose,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const exitDuration = 300; // Duration of the exit animation in ms

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onClose(id);
      }, exitDuration);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [id, duration, exitDuration, onClose]);

  return (
    <group
      className={`snackbar ${isExiting ? "snackbar-exit" : ""}`}
      data-space="15"
      data-radius="10"
      data-background="snackbar"
      data-color="white"
      data-length="auto"
    >
      {message}
    </group>
  );
};

export default Snackbar;
