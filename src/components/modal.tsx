import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  onBackdropClick: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onBackdropClick, children }) => {
  return ReactDOM.createPortal(
    <div onClick={onBackdropClick}>
      <h2>
        <i>I am the popup you created</i>
      </h2>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
