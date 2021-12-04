import React from "react";
import { css, cx } from "@emotion/css";
import { useChatContext } from "../../Provider/ChatKittyProvider";

export interface ChatContainerProps {
  /**
   * chat content
   */
  children: React.ReactNode;
}

const ChatContainer = ({ children }: ChatContainerProps) => {
  const { theme } = useChatContext();

  if (!theme) {
    throw new Error(`Invalid component context`);
  }

  return (
    <div
      className={`${cx(
        css`
          ${theme.chat.container}
        `
      )} ck-chat`}
    >
      {children}
    </div>
  );
};

export default ChatContainer;
