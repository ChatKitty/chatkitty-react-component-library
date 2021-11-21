import React from "react";
import type { Message, TextUserMessage } from "chatkitty";
import TextMessage from "../TextMessage";
import fromNow from "./fromNow";

export interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef?.current?.scrollIntoView();
  }, [messages]);

  return (
    <ul className="ck-messageList ck-scroll">
      <div ref={scrollRef} />
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
