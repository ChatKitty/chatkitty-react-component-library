import React from "react";
import {
  MessageList,
  MessageInput,
  useChatContext,
  useMessages,
  ChatSession,
} from "../..";

export interface ChatWindowProps {}

const ChatWindow = ({}: ChatWindowProps) => {
  const { client, channel } = useChatContext();

  const { resource: messages, setResource: setMessages } = useMessages(
    client,
    channel
  );

  if (!messages) {
    return <p>Loading</p>;
  }

  return (
    <ChatSession
      onMessageReceived={(message) => {
        setMessages((prev) => [message, ...(prev || [])]);
      }}
    >
      <MessageList messages={messages} />
      <MessageInput />
    </ChatSession>
  );
};

export default ChatWindow;
