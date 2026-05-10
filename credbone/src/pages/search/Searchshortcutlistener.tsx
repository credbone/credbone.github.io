import { useEffect, useCallback, useRef } from "react";
import { useModal } from "../../components/Modal";
// import { useLocation } from "react-router-dom";
import SearchFloating from "./SearchFloating";
import { useLocation } from "react-router-dom";

const SEARCH_MODAL_ID = "modal-search-global";

const modalConfig = {
  "data-radius": "none",
  "data-margin": "0",
  "data-background": "none",
  "data-elevation": "none",
  "data-width": "fit",
  "data-scroll": "",
  "data-min-height": "fit",
  "data-contain": "scroll",
  "data-modal-backdrop": "dark",
};

export type ModalControls = {
  openModal: (config: object) => void;
  closeModal: (id: string) => void;
};

let isSearchOpen = false;



export function openSearchModal({ openModal, closeModal }: ModalControls) {

  
  if (isSearchOpen) return;
  isSearchOpen = true;
  const onClose = () => {
    isSearchOpen = false;
    closeModal(SEARCH_MODAL_ID);
  };
  openModal({
    id: SEARCH_MODAL_ID,
    title: "Search",
    onClose: () => { isSearchOpen = false; },
    content: (
      <group
        data-min-height="fit"
        data-justify="center"
        data-align="start"
        data-space="30"
        data-contain="scroll"
      >
        <group
          data-top="0"
          data-position="absolute"
          data-height="fit"
          onClick={onClose}
        ></group>

        <group
          data-animation-name="appear-top"
          data-fill-mode="backwards"
          data-animation-duration="2.75"
          data-max-length="500"
          data-space="10"
          data-gap="20"
        >
          <SearchFloating showRandomTagsByDefault={false} onClose={onClose} />
        </group>
      </group>
    ),
    hasHeader: false,
    hasToolbar: false,
    customAttributes: modalConfig,
    spacing: 0,
  });
}

export function SearchShortcutListener() {
  const { openModal, closeModal } = useModal();
  // const isOpen = useRef(false);

  const location = useLocation();

 useEffect(() => {
    isSearchOpen = false;
  }, [location]);

const handleKeyDown = useCallback(
  (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      openSearchModal({
        openModal: openModal as ModalControls["openModal"],
        closeModal,
      });
    }
  },
  [openModal, closeModal],
);

  // Reset ref when modal closes via Esc (Modal handles Esc internally)
  // useEffect(() => {
  //   const onKeyUp = (e: KeyboardEvent) => {
  //     if (e.key === "Escape") isOpen.current = false;
  //   };
  //   document.addEventListener("keyup", onKeyUp);
  //   return () => document.removeEventListener("keyup", onKeyUp);
  // }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return null;
}
