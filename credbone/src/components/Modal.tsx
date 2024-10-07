import React, { useState, createContext, useContext, ReactNode } from "react";
import Button from "./button";

// Modal Component
interface ModalProps {
  title: string;
  content: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, content, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <group
      data-top="0"
      data-index="1"
      data-space="10"
      data-direction="column"
      data-align="center"
      data-justify="center"
      data-height="fit"
      data-position="absolute"
      data-name="modal-backdrop"
      // onClick={onClose}
    >
      <group
        data-radius="15"
        data-direction="column"
        data-width="auto"
        data-background="main-background"
        className="modal-container"
        data-wrap="no"
        data-max-height="fit"
        data-contain=""
        data-elevation="1"
        //   onClick={(e: { stopPropagation: () => any }) => e.stopPropagation()}
      >
        <group data-align="center" data-space="10">
          <text data-space="5" data-weight="700">
            {title}
          </text>
          <Button data-position="right" icon="close" onClick={onClose}></Button>
        </group>

        <group data-max-height="fit" data-contain="">
          {content}
        </group>

        <group data-name="modal-toolbar" data-space="20"  data-gap="20">
          <separator data-horizontal=""></separator>

          <group
            data-gap="10"
            data-type="grid"
            data-grid-template="120"
          //  data-space="10"
          >
            <group
              onClick={onClose}
              data-contain=""
              data-space="15"
              data-interactive=""
              data-cursor="pointer"
              data-radius="10"
              // data-length="180"
              data-align="center"
              data-direction="column"
              // data-background="main-lighter"
            >
              <text data-weight="700">Cancel</text>
            </group>

            <group
              onClick={onClose}
              data-contain=""
              data-space="15"
              data-interactive=""
              data-cursor="pointer"
              data-radius="10"
              // data-length="180"
              data-align="center"
              data-direction="column"
              data-background="main"
              data-color="main-text"
            >
              <text data-weight="700">OK</text>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

// Modal Context and Provider Logic
interface ModalContextType {
  openModal: (title: string, content: ReactNode) => void;
  closeModal: (index: number) => void;
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
    { title: string; content: ReactNode; isOpen: boolean }[]
  >([]);

  const openModal = (title: string, content: ReactNode) => {
    setModals((prev) => [...prev, { title, content, isOpen: true }]);
  };

  const closeModal = (index: number) => {
    setModals((prev) =>
      prev.map((modal, i) =>
        i === index ? { ...modal, isOpen: false } : modal
      )
    );
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <div data-name="modal-wrapper" data-max-length="fit">
        {modals.map((modal, index) => (
          <Modal
            key={index}
            title={modal.title}
            content={modal.content}
            isOpen={modal.isOpen}
            onClose={() => closeModal(index)} // Close modal by index
          />
        ))}
      </div>
    </ModalContext.Provider>
  );
};
