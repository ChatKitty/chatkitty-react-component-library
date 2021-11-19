import React from "react";
import { Message, TextUserMessage } from "chatkitty";
import moment from "moment";
import TextMessage from "../TextMessage";

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
      <div ref={scrollRef}></div>
      {messages.map((message) => {
        const casted = message as TextUserMessage;
        return (
          <TextMessage
            key={casted.id}
            displayPictureUrl={casted.user.displayPictureUrl}
            displayName={casted.user.displayName}
            createdTime={moment(casted.createdTime).fromNow()}
            body={casted.body}
          />
        );
      })}
    </ul>
  );
};

export default MessageList;
