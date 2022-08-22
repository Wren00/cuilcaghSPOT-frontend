import React, { MouseEventHandler, ReactNode } from "react";
import Modal from "./modal";

export interface BaseModalWrapperProps {
  isModalVisible: boolean;
  onBackdropClick: () => void;
  header: string;
  message?: string;
  content?: ReactNode;
}

type Props = BaseModalWrapperProps;

const BaseModalWrapper: React.FC<Props> = ({
  content,
  isModalVisible,
  onBackdropClick,
  header,
  message,
}) => {
  if (!isModalVisible) {
    return null;
  }

  return (
    <Modal onBackdropClick={onBackdropClick}>
      <div>
        <button onClick={onBackdropClick}>Close</button>
        <h1>{header}</h1>
        {message && <h3>{message}</h3>}
        {content}
      </div>
    </Modal>
  );
};

export default BaseModalWrapper;
