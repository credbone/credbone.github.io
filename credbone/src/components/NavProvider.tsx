import React, { createContext, useState, useContext, useEffect } from "react";

// Define the context type
interface NavContextType {
  isNavOpen: boolean;
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context
const NavContext = createContext<NavContextType | undefined>(undefined);

// Provider component
export const NavProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);



  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.navOpen) {
        setIsNavOpen(true);
      } else {
        setIsNavOpen(false);
      }
    };
  
    if (isNavOpen) {
      // Push a new state only if the current state doesn't already indicate the nav is open
      if (!window.history.state?.navOpen) {
        window.history.pushState({ navOpen: true }, "");
      }
    } else {
      // Go back in history only if the current state indicates the nav was open
      if (window.history.state?.navOpen) {
        window.history.go(-1);
      }
    }
  
    // Add the popstate listener
    window.addEventListener("popstate", handlePopState);
  
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isNavOpen]);
  
  return (
    <NavContext.Provider value={{ isNavOpen, setIsNavOpen }}>
      {children}
    </NavContext.Provider>
  );
};

// Custom hook for consuming the context
export const useNavContext = () => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error("useNavContext must be used within a NavProvider");
  }
  return context;
};
