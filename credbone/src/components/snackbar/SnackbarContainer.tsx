import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import Snackbar from './Snackbar';


interface SnackbarMessage {
  id: string;
  message: string;
  duration?: number;
}

interface SnackbarContextProps {
  addSnackbar: (message: string, duration?: number) => void;
}

interface SnackbarContainerProps {
  children: ReactNode;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);

export const useSnackbar = (): SnackbarContextProps => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

const SnackbarContainer: React.FC<SnackbarContainerProps> = ({ children }) => {
  const [snackbars, setSnackbars] = useState<SnackbarMessage[]>([]);

  const addSnackbar = useCallback((message: string, duration: number = 3000) => {
    const id = new Date().getTime().toString();
    setSnackbars((prev) => [...prev, { id, message, duration }]);
  }, []);

  const removeSnackbar = useCallback((id: string) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
  }, []);

  return (
    <SnackbarContext.Provider value={{ addSnackbar }}>
      {children}
      <group className="snackbar-container" data-gap="10" data-align="center">
        {snackbars.map((snackbar) => (
          <Snackbar
            key={snackbar.id}
            id={snackbar.id}
            message={snackbar.message}
            duration={snackbar.duration}
            onClose={removeSnackbar}
          />
        ))}
      </group>
    </SnackbarContext.Provider>
  );
};

export default SnackbarContainer;
