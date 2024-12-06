import React, { createContext, useState, useContext, useEffect, useRef  } from "react";

// Define the context type
interface NavContextType {
  isNavOpen: boolean;
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navRef: React.RefObject<HTMLElement>; // Ref to detect outside clicks
  buttonRef: React.RefObject<HTMLElement>;
  toggleRef: React.RefObject<HTMLElement>;
}

// Create the context
const NavContext = createContext<NavContextType | undefined>(undefined);

// Provider component
export const NavProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
   const buttonRef = useRef<HTMLElement>(null);
   const toggleRef = useRef<HTMLElement>(null);


  // Handle outside click to close the nav
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If the click is inside the nav or button, don't close the nav
      if (
        (navRef.current && navRef.current.contains(event.target as Node)) ||
        (buttonRef.current && buttonRef.current.contains(event.target as Node)) ||
        (toggleRef.current && toggleRef.current.contains(event.target as Node))
      ) {
        return;
      }

      // Otherwise, close the nav if it's open
      setIsNavOpen(false);
    };

    if (isNavOpen) {
      window.addEventListener("click", handleClickOutside); // Listen for outside clicks when nav is open
    }

    // Clean up event listener when the nav is closed or component unmounts
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isNavOpen]);




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
    <NavContext.Provider value={{ isNavOpen, setIsNavOpen, navRef, buttonRef, toggleRef  }}>
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
