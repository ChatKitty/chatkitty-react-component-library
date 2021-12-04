import React from "react";
import { css, cx } from "@emotion/css";
import { useChatContext } from "../../Provider/ChatKittyProvider";
import { MdClose } from "react-icons/md";

export interface ChatDrawerProps {
  /**
   * handle drawer close button click
   */
  onClose: () => void;

  /**
   * drawer content
   */
  children: React.ReactNode;
}

const ChatDrawer = ({ onClose, children }: ChatDrawerProps) => {
  const { theme } = useChatContext();

  if (!theme) {
    throw new Error(`Invalid component context`);
  }

  return (
    <div
      className={`${cx(
        css`
          ${theme.chatDrawer.container}
        `
      )} ck-drawer`}
    >
      <button
        className={`${cx(
          css`
            ${theme.chatDrawer.button}
          `
        )} ck-drawer-button`}
        onClick={onClose}
      >
        <MdClose />
      </button>
      {children}
    </div>
  );
};

export default ChatDrawer;
