import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Button from "./button";
import { useLocation } from "react-router-dom";
import { ArrowDownLeft, ArrowUpRight, X } from "lucide-react";
import Tooltip from "./tooltip";
import Ripple from "./Ripple";

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
  fullscreen?: boolean;
  fullscreenbutton?: boolean;
  draggable?: boolean;
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
  fullscreen = false,
  fullscreenbutton = false,
  draggable = true,
  isTopmost,
  customAttributes = {},
  dimAttributes = {},
  spacing = 20,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(fullscreen); // Local fullscreen state

  const layerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const controlsRef = useRef<HTMLElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 }); // Panel offset from its centered position
  const dragRef = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const canDrag = draggable && hasHeader && !isFullscreen;

  // Uses `translate`, not `transform`, so it doesn't fight the entrance animations
  const applyOffset = useCallback((offset: { x: number; y: number }) => {
    offsetRef.current = offset;
    if (panelRef.current) {
      panelRef.current.style.translate =
        offset.x || offset.y ? `${offset.x}px ${offset.y}px` : "";
    }
  }, []);

  // Keeps the panel inside the layer's padded box; an axis that doesn't fit goes back to center
  const clampOffset = useCallback((x: number, y: number) => {
    const layer = layerRef.current;
    const panel = panelRef.current;
    if (!layer || !panel) return { x, y };

    const layerRect = layer.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const padding = getComputedStyle(layer);

    const left = layerRect.left + parseFloat(padding.paddingLeft);
    const right = layerRect.right - parseFloat(padding.paddingRight);
    const top = layerRect.top + parseFloat(padding.paddingTop);
    const bottom = layerRect.bottom - parseFloat(padding.paddingBottom);

    const baseLeft = panelRect.left - offsetRef.current.x;
    const baseTop = panelRect.top - offsetRef.current.y;

    const minX = left - baseLeft;
    const maxX = right - (baseLeft + panelRect.width);
    const minY = top - baseTop;
    const maxY = bottom - (baseTop + panelRect.height);

    return {
      x: minX > maxX ? 0 : Math.min(Math.max(x, minX), maxX),
      y: minY > maxY ? 0 : Math.min(Math.max(y, minY), maxY),
    };
  }, []);

  // Without the maximize button there's no way to restore, so drop back to the initial size
  useEffect(() => {
    if (!fullscreenbutton) setIsFullscreen(fullscreen);
  }, [fullscreenbutton, fullscreen]);

  // Once drag turns off (option changed, maximized), recenter: there's no way to move it back
  useEffect(() => {
    if (!canDrag) applyOffset({ x: 0, y: 0 });
  }, [canDrag, applyOffset]);

  // Re-clamp when the layer or panel resizes, so a moved panel never ends up clipped
  useEffect(() => {
    const layer = layerRef.current;
    const panel = panelRef.current;
    if (!canDrag || !layer || !panel) return;

    const observer = new ResizeObserver(() => {
      const { x, y } = offsetRef.current;
      if (!x && !y) return;
      const next = clampOffset(x, y);
      if (next.x !== x || next.y !== y) applyOffset(next);
    });

    observer.observe(layer);
    observer.observe(panel);
    return () => observer.disconnect();
  }, [canDrag, isOpen, clampOffset, applyOffset]);

  const handleHeaderPointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (!canDrag || !event.isPrimary || event.button !== 0) return;
    // The header controls (maximize, close) are never a drag handle
    if (controlsRef.current?.contains(event.target as Node)) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      originX: offsetRef.current.x,
      originY: offsetRef.current.y,
    };
  };

  const handleHeaderPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    applyOffset(
      clampOffset(
        drag.originX + event.clientX - drag.startX,
        drag.originY + event.clientY - drag.startY
      )
    );
  };

  const handleHeaderPointerUp = (event: React.PointerEvent<HTMLElement>) => {
    if (!dragRef.current) return;
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const toggleFullscreen = () => {
    applyOffset({ x: 0, y: 0 }); // Maximized panels aren't draggable, so start centered
    setIsFullscreen((prev) => !prev); // Toggle the fullscreen state
  };

  // Double-clicking the header toggles maximize, like a window title bar
  const handleHeaderDoubleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!fullscreenbutton) return;
    if (controlsRef.current?.contains(event.target as Node)) return;
    toggleFullscreen();
  };

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
      ref={layerRef}
      data-top="0"
      data-index="1"
      data-space={spacing}
      data-direction="column"
      data-align="center"
      data-justify="center"
      data-height="fit"
      data-position="absolute"
    >
      <group
        data-position="absolute"
        onClick={handleBackdropClick}
        data-height="fit"
        data-background="modal-backdrop"
        {...dimAttributes}
      ></group>
      <group
        ref={panelRef}
        data-radius="20"
        data-direction="column"
        data-width={isFullscreen ? "fit" : "auto"}
        data-height={isFullscreen ? "fit" : ""}
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
            <group
              data-name="modal-header"
              data-align="center"
              data-space="10"
              data-wrap="no"
              data-contain=""
              data-shrink="no"
              data-touch-action={canDrag ? "none" : undefined}
              data-user-select={canDrag ? "none" : undefined}
              onPointerDown={handleHeaderPointerDown}
              onPointerMove={handleHeaderPointerMove}
              onPointerUp={handleHeaderPointerUp}
              onPointerCancel={handleHeaderPointerUp}
              onDoubleClick={handleHeaderDoubleClick}
            >
              <text data-space="10" data-ellipsis="">
                {title}
              </text>

              <group
                ref={controlsRef}
                data-position="right"
                data-width="auto"
              //  data-gap="5"
                data-align="center"
              >
                {fullscreenbutton && (
                  <>
                    <Tooltip
                      placement={isFullscreen ? "left" : "auto"}
                      content={isFullscreen ? "Minimize" : "Maximize"}
                    ><group data-width="auto" data-name="autoseparation">
                      <Button
                        large
                        icon={
                          isFullscreen ? (
                            <ArrowDownLeft size={20} />
                          ) : (
                            <ArrowUpRight size={20} />
                          )
                        }
                        onClick={toggleFullscreen}
                      ></Button>
                      </group>
                    </Tooltip>
                    
                  </>
                )}
                <group data-width="auto" data-align="center" data-name="autoseparation">
                {fullscreenbutton && (  <separator data-vertical="" data-height="20"></separator>  )}
                <Button large icon={<X size={20} />} onClick={onClose}></Button>
                </group>
              
              </group>
            </group>
            <group>
              <separator data-horizontal=""></separator>
            </group>
          </>
        )}
        {content}
        {hasToolbar && (
          <>

            <group
              data-name="modal-toolbar"
             // data-space="30"
              data-gap="20"
              data-background="light-gray"
            >

            <group data-position="absolute" data-left="0" data-top="0">
              <separator data-horizontal=""></separator>
            </group>

              <group  data-wrap="no">
                <Ripple>
                    <group
                  onClick={onClose}
                   data-ink-color="neutral"
                   data-over-color="neutral"
                  data-contain=""
                  data-space="20"
                  data-height="60"
                  data-interactive=""
                  data-cursor="pointer"
                 data-justify="center"
                  data-align="center"
                  data-direction="column"
                 // data-background="main"
               //   data-color="main-text"
                >
                  <text data-weight="700">Cancel</text>
                </group>
                </Ripple>
              

<Ripple>
    <group
      data-ink-color="main-deep"
                  onClick={onClose}
                  data-contain=""
                  data-space="20"
                   data-height="60"
                    data-justify="center"
                  data-interactive=""
                  data-cursor="pointer"
                 
                  data-align="center"
                  data-direction="column"
                  data-background="main"
                  data-color="main-text"
                >
                  <text data-weight="700">OK</text>
                </group>
</Ripple>
              

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
    fullscreen?: boolean;
    fullscreenbutton?: boolean;
    draggable?: boolean;
    customAttributes?: { [key: string]: string };
    dimAttributes?: { [key: string]: string };
    spacing?: number;
  }) => void;
  closeModal: (id: string) => void;
  // Change options of an open modal (e.g. from controls inside its content)
  updateModal: (
    id: string,
    options: Partial<Omit<Parameters<ModalContextType["openModal"]>[0], "id">>
  ) => void;
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
      fullscreen?: boolean;
      fullscreenbutton?: boolean;
      draggable?: boolean;
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
    fullscreen = false,
    fullscreenbutton = false,
    draggable = true,
    customAttributes = {},
    dimAttributes = {},
    spacing = 20,
  }: {
    id: string;
    title: string;
    content: ReactNode;
    hasHeader?: boolean;
    hasToolbar?: boolean;
    fullscreen?: boolean;
    fullscreenbutton?: boolean;
    draggable?: boolean;
    customAttributes?: { [key: string]: string };
    dimAttributes?: { [key: string]: string };
    spacing?: number;
  }) => {
    setModals((prev) => [
      ...prev,
      {
        id,
        title,
        content,
        isOpen: true,
        hasHeader,
        hasToolbar,
        fullscreen,
        fullscreenbutton,
        draggable,
        customAttributes,
        dimAttributes,
        spacing,
      },
    ]);
  };

  const closeModal = (id: string) => {
    setModals(
      (prev) =>
        prev
          .map((modal) =>
            modal.id === id ? { ...modal, isOpen: false } : modal
          )
          .filter((modal) => modal.isOpen) // Optionally filter out closed modals
    );
  };

  const updateModal: ModalContextType["updateModal"] = (id, options) => {
    setModals((prev) =>
      prev.map((modal) => (modal.id === id ? { ...modal, ...options } : modal))
    );
  };

  const location = useLocation(); // Get current location
  const prevLocationRef = useRef(location); // Store previous location

  // useEffect(() => {
  //   if (prevLocationRef.current !== location) {
  //     // Clear all modals when location changes
  //     setModals([]); // Reset modals to an empty array to clear them
  //     prevLocationRef.current = location; // Update the previous location
  //   }
  // }, [location]); // Only depend on location changes



  useEffect(() => {
  if (prevLocationRef.current !== location) {
    if (prevLocationRef.current.pathname !== location.pathname) {
      setModals([]);
    }
    prevLocationRef.current = location;
  }
}, [location]);

  const topmostIndex = modals.reduce((highestIndex, modal, index) => {
    return modal.isOpen ? index : highestIndex;
  }, -1);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, updateModal }}>
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
            fullscreen={modal.fullscreen}
            fullscreenbutton={modal.fullscreenbutton}
            draggable={modal.draggable}
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
