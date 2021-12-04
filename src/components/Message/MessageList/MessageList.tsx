import React from "react";
import { css, cx } from "@emotion/css";
import { useChatContext } from "../../Provider/ChatKittyProvider";

export interface MessageListProps {
  /**
   * message list
   */
  children: React.ReactNode;

  /**
   * toggle scrolling to latest message on render, defaults to true
   */
  scrollToLatest?: boolean;
}

const MessageList = ({ children, scrollToLatest = true }: MessageListProps) => {
  const { theme } = useChatContext();

  if (!theme) {
    throw new Error(`Invalid component context`);
  }

  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollToLatest) {
      scrollRef?.current?.scrollIntoView();
    }
  }, [children]);

  return (
    <ul
      className={`${cx(
        css`
          ${theme.messageList.container}
        `
      )} ck-messageList`}
    >
      {scrollToLatest && <div ref={scrollRef} />}
      {children}
    </ul>
  );
};

export default MessageList;
