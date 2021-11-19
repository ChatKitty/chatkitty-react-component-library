import React from "react";
import ChannelHeader from "../Channel/ChannelHeader";
import MessageList from "../Message/MessageList";
import MessageInput from "../Message/MessageInput";
import { useChatContext } from "../Provider/ChatKittyProvider";
import { useMessages } from "../../hooks";
import ChatSession from "../Session/ChatSession";
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
