import React from "react";
import type { Message, TextUserMessage } from "chatkitty";
import { css, cx } from "@emotion/css";
import TextMessage from "../TextMessage";
import fromNow from "./fromNow";
import { useChatContext } from "../../Provider/ChatKittyProvider";

export interface MessageListProps {
  messages: Message[];
  scrollToLatest?: boolean;
}

const MessageList = ({ messages, scrollToLatest = true }: MessageListProps) => {
  const { theme } = useChatContext();

  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollToLatest) {
      scrollRef?.current?.scrollIntoView();
    }
  }, [messages]);

  return (
    <ul
      className={`${cx(
        css`
          ${theme.messageList.container}
        `
      )} ck-messageList`}
    >
      {scrollToLatest && <div ref={scrollRef} />}
      {messages.map((message) => {
        const casted = message as TextUserMessage;
        return (
          <TextMessage
            key={casted.id}
            displayPictureUrl={casted.user.displayPictureUrl}
            displayName={casted.user.displayName}
            createdTime={fromNow(new Date(casted.createdTime))}
            body={casted.body}
          />
        );
      })}
    </ul>
  );
};

export default MessageList;
