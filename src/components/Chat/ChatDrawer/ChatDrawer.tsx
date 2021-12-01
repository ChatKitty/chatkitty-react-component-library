import React from "react";
import { css, cx } from "@emotion/css";
import { useChatContext } from "../../Provider/ChatKittyProvider";
import { MdClose } from "react-icons/md";

export interface ChatDrawerProps {
  onClose: () => void;
  children: React.ReactNode;
}

const ChatDrawer = ({ onClose, children }: ChatDrawerProps) => {
  const { theme } = useChatContext();

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
