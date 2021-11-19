import React from "react";
import {
  MessageList,
  MessageInput,
  useChatContext,
  useMessages,
  ChatSession,
  ChannelHeader,
} from "../..";
import Spinner from "../utility/Spinner";

export interface ChatWindowProps {}

const ChatWindow = ({}: ChatWindowProps) => {
  const { client, channel } = useChatContext();

  const { resource: messages, setResource: setMessages } = useMessages(
    client,
    channel
  );

  if (!messages) {
    return <Spinner />;
  }

  return (
    <ChatSession
      onMessageReceived={(message) => {
        setMessages((prev) => [message, ...(prev || [])]);
      }}
    >
      <ChannelHeader />
      <MessageList messages={messages} />
      <MessageInput />
    </ChatSession>
  );
};

export default ChatWindow;
