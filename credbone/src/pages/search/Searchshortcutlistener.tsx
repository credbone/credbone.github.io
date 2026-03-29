import { useEffect, useCallback, useRef } from "react";
import { useModal } from "../../components/Modal";
import SearchFloating from "./searchFloating";
import { useLocation } from "react-router-dom";


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

export function SearchShortcutListener() {
  const { openModal, closeModal } = useModal();
  const isOpen = useRef(false);


  const location = useLocation();

useEffect(() => {
  isOpen.current = false;
}, [location]);

 
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen.current) return;
        isOpen.current = true;
        openModal({
          id: "modal-search-global",
          title: "Search",
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
                onClick={() => {
                  isOpen.current = false;
                  closeModal("modal-search-global");
                }}
              ></group>
 
              <group
                data-animation-name="appear-top"
                data-fill-mode="backwards"
                data-animation-duration="2.75"
                data-max-length="500"
                data-space="10"
                data-gap="20"
              >
                <SearchFloating showRandomTagsByDefault={false} />
              </group>
            </group>
          ),
          hasHeader: false,
          hasToolbar: false,
          customAttributes: modalConfig,
          spacing: 0,
        });
      }
    },
    [openModal, closeModal],
  );
 
  // Reset ref when modal closes via Esc (Modal handles Esc internally)
  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Escape") isOpen.current = false;
    };
    document.addEventListener("keyup", onKeyUp);
    return () => document.removeEventListener("keyup", onKeyUp);
  }, []);
 
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
 
  return null;
}