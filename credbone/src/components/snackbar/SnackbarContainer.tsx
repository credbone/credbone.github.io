import React, { createContext, useState, useContext, useCallback, useMemo, useRef, ReactNode } from 'react';
import Snackbar from './Snackbar';

interface SnackbarMessage {
  id: string;
  message: ReactNode;
  duration?: number;
  source?: string; // Optional source identifier
}

interface SnackbarContextProps {
  addSnackbar: (message: ReactNode, duration?: number, source?: string, clearPrevious?: boolean) => void;
}

interface SnackbarStackContextProps {
  snackbars: SnackbarMessage[];
  removeSnackbar: (id: string) => void;
}

interface SnackbarProviderProps {
  children: ReactNode;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);
// The list has its own context, so a change re-renders only the stack and not every useSnackbar() consumer
const SnackbarStackContext = createContext<SnackbarStackContextProps | undefined>(undefined);

export const useSnackbar = (): SnackbarContextProps => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

// Holds the messages sent from inside it. Needs one SnackbarStack somewhere inside to show them
export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [snackbars, setSnackbars] = useState<SnackbarMessage[]>([]);
  const nextId = useRef(0);

  const addSnackbar = useCallback((message: ReactNode, duration: number = 3000, source?: string, clearPrevious: boolean = false) => {
    const id = String(nextId.current++);
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

  const contextValue = useMemo(() => ({ addSnackbar }), [addSnackbar]);
  const stackValue = useMemo(() => ({ snackbars, removeSnackbar }), [snackbars, removeSnackbar]);

  return (
    <SnackbarContext.Provider value={contextValue}>
      <SnackbarStackContext.Provider value={stackValue}>
        {children}
      </SnackbarStackContext.Provider>
    </SnackbarContext.Provider>
  );
};

// Shows the nearest provider's messages. Takes no height: they grow upward from where it's placed
export const SnackbarStack: React.FC = () => {
  const context = useContext(SnackbarStackContext);
  if (!context) {
    throw new Error('SnackbarStack must be used within a SnackbarProvider');
  }
  const { snackbars, removeSnackbar } = context;

  return (
    // Announces newly added snackbars only, not removals or text changing inside one
    <div className="snackbar-container" aria-live="polite" aria-atomic="false" aria-relevant="additions">
      <group data-gap="10" data-align="center" data-contain="" data-direction="column" data-space="20" data-position="absolute">
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
    </div>
  );
};

// Provider with the stack after its children, at the bottom
const SnackbarContainer: React.FC<SnackbarProviderProps> = ({ children }) => (
  <SnackbarProvider>
    {children}
    <SnackbarStack />
  </SnackbarProvider>
);

export default SnackbarContainer;
