import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import Button from "./button";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";

// Modal Component
interface ModalProps {
  id: string;
  title: string;
  content: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  hasHeader?: boolean;
  hasToolbar?: boolean;
  dimClose?: boolean;
  isTopmost: boolean;
  customAttributes?: { [key: string]: string };
  dimAttributes?: { [key: string]: string };
  spacing?: number;
}

const Modal: React.FC<ModalProps> = ({
  title,
  content,
  isOpen,
  onClose,
  hasHeader = true,
  hasToolbar = false,
  dimClose = false,
  isTopmost,
  customAttributes = {},
  dimAttributes = {},
  spacing = 20,
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
      <group data-position="absolute" onClick={handleBackdropClick} data-height="fit" data-background="modal-backdrop" {...dimAttributes}></group>
      <group
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
      >
        {hasHeader && (
          <>
            <group data-name="modal-header" data-align="center" data-space="10">
              <text data-space="10">{title}</text>
              <Button large data-position="right" icon={<X size={20}/>} onClick={onClose}></Button>
            </group>
            <group>
              <separator data-horizontal=""></separator>
            </group>
          </>
        )}
        {content}
        {hasToolbar && (
          <>
            <group>
              <separator data-horizontal=""></separator>
            </group>
            <group data-name="modal-toolbar" data-space="30" data-gap="20" data-background="light-gray">
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
              </group>
            </group>
          </>
        )}
      </group>
    </group>
  );
};

// Modal Context and Provider Logic
interface ModalContextType {
  openModal: (options: {
    id: string;
    title: string;
    content: ReactNode;
    hasHeader?: boolean;
    hasToolbar?: boolean;
    customAttributes?: { [key: string]: string };
    dimAttributes?: { [key: string]: string };
    spacing?: number;
  }) => void;
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
export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState<
    {
      id: string;
      title: string;
      content: ReactNode;
      isOpen: boolean;
      hasHeader?: boolean;
      hasToolbar?: boolean;
      customAttributes?: { [key: string]: string };
      dimAttributes?: { [key: string]: string };
      spacing?: number;
    }[]
  >([]);

  const openModal = ({
    id,
    title,
    content,
    hasHeader = true,
    hasToolbar = false,
    customAttributes = {},
    dimAttributes = {},
    spacing = 20,
  }: {
    id: string;
    title: string;
    content: ReactNode;
    hasHeader?: boolean;
    hasToolbar?: boolean;
    customAttributes?: { [key: string]: string };
    dimAttributes?: { [key: string]: string };
    spacing?: number;
  }) => {
    setModals((prev) => [
      ...prev,
      { id, title, content, isOpen: true, hasHeader, hasToolbar, customAttributes, dimAttributes, spacing },
    ]);
  };

  const closeModal = (id: string) => {
    setModals((prev) =>
      prev.map((modal) =>
        modal.id === id ? { ...modal, isOpen: false } : modal
      ).filter((modal) => modal.isOpen) // Optionally filter out closed modals
    );
  };

  const location = useLocation(); // Get current location
  const prevLocationRef = useRef(location); // Store previous location

  useEffect(() => {
    if (prevLocationRef.current !== location) {
      // Clear all modals when location changes
      setModals([]); // Reset modals to an empty array to clear them
      prevLocationRef.current = location; // Update the previous location
    }
  }, [location]); // Only depend on location changes

  const topmostIndex = modals.reduce((highestIndex, modal, index) => {
    return modal.isOpen ? index : highestIndex;
  }, -1);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <div data-name="modal-wrapper" data-max-length="fit">
        {modals.map((modal) => (
          <Modal
            key={modal.id}
            id={modal.id}
            title={modal.title}
            content={modal.content}
            isOpen={modal.isOpen}
            hasHeader={modal.hasHeader}
            hasToolbar={modal.hasToolbar}
            customAttributes={modal.customAttributes}
            dimAttributes={modal.dimAttributes}
            onClose={() => closeModal(modal.id)}
            isTopmost={modal.id === modals[topmostIndex]?.id}
            spacing={modal.spacing}
          />
        ))}
      </div>
    </ModalContext.Provider>
  );
};
