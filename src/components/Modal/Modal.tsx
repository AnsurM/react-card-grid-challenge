import { FC, useEffect, useRef, KeyboardEvent, useState } from "react";
import { MODAL_TITLE_LENGTH } from "../../utils/constants";
import { Gif } from "../../utils/types";
import { CloseIcon } from "../../assets/icons";
import { SkeletonLoader } from "..";

import * as Styled from "./modal.styles";

interface ModalProps {
  gif: Gif;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ gif, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Element &&
        event.target.classList.contains("modal-overlay")
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", (event) =>
      handleEscapeKey(event as unknown as KeyboardEvent<HTMLDivElement>)
    );

    // Focus the close button when the modal opens
    closeButtonRef.current?.focus();

    // Save the previously focused element
    const previouslyFocusedElement = document.activeElement as HTMLElement;

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", (event) =>
        handleEscapeKey(event as unknown as KeyboardEvent<HTMLDivElement>)
      );

      // Restore focus to the previously focused element when the modal closes
      previouslyFocusedElement?.focus();
    };
  }, [onClose]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Tab") {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements) {
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  return (
    <Styled.ModalContainer
      className="open modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Styled.ModalContent ref={modalRef} onKeyDown={handleKeyDown}>
        <Styled.Header>
          <Styled.Title id="modal-title">
            {gif.title.substring(0, MODAL_TITLE_LENGTH)}
            {gif.title.length > MODAL_TITLE_LENGTH ? "..." : ""}
          </Styled.Title>
          <Styled.CloseButton
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close modal"
          >
            <CloseIcon />
          </Styled.CloseButton>
        </Styled.Header>
        <Styled.Divider />
        {!imageLoaded && (
          <Styled.SkeletonContainer>
            <SkeletonLoader />
          </Styled.SkeletonContainer>
        )}
        <Styled.Gif
          data-testid="modal-image"
          className={imageLoaded ? "loaded" : ""}
          src={gif.images.original.url}
          loading="lazy"
          alt={gif.alt_text || `GIF: ${gif.title}`}
          onLoad={() => setImageLoaded(true)}
        />
        <Styled.SROnly id="modal-description">
          This modal displays a GIF image. Use the Escape key or the close
          button to exit.
        </Styled.SROnly>
      </Styled.ModalContent>
    </Styled.ModalContainer>
  );
};
