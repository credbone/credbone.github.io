import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import Snackbar from './Snackbar';

interface SnackbarMessage {
  id: string;
  message: any;
  duration?: number;
  source?: string; // Optional source identifier
}

interface SnackbarContextProps {
  addSnackbar: (message: any, duration?: number, source?: string, clearPrevious?: boolean) => void;
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

  const addSnackbar = useCallback((message: string, duration: number = 3000, source?: string, clearPrevious: boolean = false) => {
    const id = new Date().getTime().toString();
    setSnackbars((prev) => {
      let newSnackbars = [...prev];
      if (clearPrevious && source) {
        newSnackbars = newSnackbars.filter(snackbar => snackbar.source !== source);
      }
      return [...newSnackbars, { id, message, duration, source }];
    });
  }, []);

  const removeSnackbar = useCallback((id: string) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
  }, []);

  return (
    <SnackbarContext.Provider value={{ addSnackbar }}>
      {children}
      <div className="snackbar-container" data-gap="10" data-align="center" data-contain="">
        {snackbars.map((snackbar) => (
          <Snackbar
            key={snackbar.id}
            id={snackbar.id}
            message={snackbar.message}
            duration={snackbar.duration}
            onClose={removeSnackbar}
          />
        ))}
      </div>
    </SnackbarContext.Provider>
  );
};

export default SnackbarContainer;
