import React from "react";
import "../pages/css/popup.css";

interface Props {
  onBackdropClick: () => void;
  content: string;
  handleClose: React.MouseEventHandler<HTMLSpanElement>;
  children?: React.ReactNode;
}

const Popup: React.FC<Props> = ({ onBackdropClick, content, handleClose }) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={handleClose}>
          x
        </span>
        {content}
      </div>
    </div>
  );
};

export default Popup;
