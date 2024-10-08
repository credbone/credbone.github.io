import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import Button from "./button";

// Modal Component
interface ModalProps {
  id: string;
  title: string;
  content: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  hasHeader?: boolean; // New prop to control the header
  hasToolbar?: boolean; // New prop to control the toolbar
  dimClose?: boolean;
  isTopmost: boolean;
  customAttributes?: { [key: string]: string };
  spacing?: number;
}

const Modal: React.FC<ModalProps> = ({
  title,
  content,
  isOpen,
  onClose,
  hasHeader = true, // Default true for the header
  hasToolbar = false, // Default true for the toolbar
  dimClose = false,
  isTopmost,
  customAttributes = {}, // Default empty object for custom attributes
  spacing = 20, // Default spacing value
}) => {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (isOpen && isTopmost && event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose, isTopmost]);

  const handleBackdropClick = () => {
    if (dimClose || (!hasHeader && !hasToolbar)) {
      onClose(); // Close if dimClose is true or both header and toolbar are hidden
    }
  };

  if (!isOpen) return null;

  return (
    <group
      data-top="0"
      data-index="1"
      data-space={spacing}
      data-direction="column"
      data-align="center"
      data-justify="center"
      data-height="fit"
      data-position="absolute"
      
     
    >
      <group data-position="absolute"  onClick={handleBackdropClick} data-height="fit" data-name="modal-backdrop"></group>
      <group
     //   data-margin="20"
        data-radius="15"
        data-direction="column"
        data-width="auto"
        data-background="context"
        className="modal-container"
        data-wrap="no"
        data-max-height="fit"
        data-contain=""
        data-elevation="2"
        {...customAttributes}
      //   onClick={dimClose || (!hasHeader && !hasToolbar) ? (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation() : onClose}
      //  onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        {hasHeader && ( // Render the header only if hasHeader is true
          <group data-name="modal-header" data-align="center" data-space="10">
            <text data-space="10" >
              {title}
            </text>
            <Button
            large
              data-position="right"
              icon="close"
              onClick={onClose}
            ></Button>
          </group>
        )}


          {content}


        {hasToolbar && ( // Render the toolbar only if hasToolbar is true
          <group data-name="modal-toolbar" data-space="30" data-gap="20">
            <group data-gap="10" data-type="grid" data-grid-template="120">
              <group
                onClick={onClose}
                data-contain=""
                data-space="15"
                data-interactive=""
                data-cursor="pointer"
                data-radius="5"
                data-align="center"
                data-direction="column"
                data-background="main"
                data-color="main-text"
              >
                <text data-weight="700">OK</text>
              </group>
              <group
                onClick={onClose}
                data-contain=""
                data-space="15"
                data-interactive=""
                data-cursor="pointer"
                data-radius="5"
                data-align="center"
                data-direction="column"
                data-background="context"
              >
                <text data-weight="700">Cancel</text>
              </group>
            </group>
          </group>
        )}
      </group>
    </group>
  );
};

// Modal Context and Provider Logic
interface ModalContextType {
  openModal: (
    id: string, 
    title: string,
    content: ReactNode,
    hasHeader?: boolean,
    hasToolbar?: boolean,
    customAttributes?: { [key: string]: string },
    spacing?: number
    
  ) => void;
  closeModal: (id: string) => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

// Custom hook to use modal context
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

// ModalProvider that provides context
export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modals, setModals] = useState<
    {
      id: string;
      title: string;
      content: ReactNode;
      isOpen: boolean;
      hasHeader?: boolean;
      hasToolbar?: boolean;
      customAttributes?: { [key: string]: string };
      spacing?: number;
    }[]
  >([]);

  const openModal = (
    id: string,  // id parameter
    title: string,
    content: ReactNode,
    hasHeader = true,
    hasToolbar = false,
    customAttributes: { [key: string]: string } = {},
    spacing = 20 
  ) => {
    setModals((prev) => [
      ...prev,
      { id, title, content, isOpen: true, hasHeader, hasToolbar, customAttributes, spacing  },
    ]);
  };

  const closeModal = (id: string) => {
    setModals((prev) =>
      prev.map((modal) =>
        modal.id === id ? { ...modal, isOpen: false } : modal
      )
    );
  };

  const topmostIndex = modals.reduce((highestIndex, modal, index) => {
    return modal.isOpen ? index : highestIndex;
  }, -1);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <div data-name="modal-wrapper" data-max-length="fit">
        {modals.map((modal) => (
          <Modal
            key={modal.id}   // Ensure key is unique
            id={modal.id}    // Pass id prop to Modal
            title={modal.title}
            content={modal.content}
            isOpen={modal.isOpen}
            hasHeader={modal.hasHeader}
            hasToolbar={modal.hasToolbar}
            customAttributes={modal.customAttributes}
            onClose={() => closeModal(modal.id)}  // Close modal by id
            isTopmost={modal.id === modals[topmostIndex]?.id}
            spacing={modal.spacing} // Pass spacing to Modal
          />
        ))}
      </div>
    </ModalContext.Provider>
  );
};
