import React from "react";
import type { Message, User } from "chatkitty";
import ChannelHeader from "../Channel/ChannelHeader";
import MessageList from "../Message/MessageList";
import MessageInput from "../Message/MessageInput";
import { useChatContext } from "../Provider/ChatKittyProvider";
import { useMessages, useCurrentUser } from "../../hooks";
import ChatSession from "../Session/ChatSession";
import Spinner from "../utility/Spinner";
import "./styles.css";

export interface CKCommentChatProps {}

const CKCommentChat = ({}: CKCommentChatProps) => {
  const { client, channel } = useChatContext();

  // Current User
  const { resource: currentUser } = useCurrentUser(client);

  // Message Handling
  const { resource: messages, setResource: setMessages } = useMessages(
    client,
    channel
  );

  const onReceivedMessage = (message: Message) => {
    setMessages((prev) => [message, ...(prev || [])]);
  };

  // Typing Indicator
  const [typingUsers, setTypingUsers] = React.useState<User[]>([]);

  // Don't load unless we have messages and a current user
  if (!messages || !currentUser) {
    return <Spinner />;
  }

  // Typing Handlers
  const onTypingStarted = (user: User) => {
    setTypingUsers((prev) => {
      // if (
      //   prev.filter((u) => u.id === user.id).length > 0 ||
      //   user.id === currentUser.id
      // ) {
      //   return prev;
      // }
      return [...prev, user];
    });
  };

  const onTypingStopped = (user: User) => {
    setTypingUsers((prev) => prev.filter((u) => u.id !== user.id));
  };

  return (
    <ChatSession
      onReceivedMessage={onReceivedMessage}
      onTypingStarted={onTypingStarted}
      onTypingStopped={onTypingStopped}
    >
      <ChannelHeader />
      <MessageList messages={messages} />
      <MessageInput typingUsers={typingUsers} />
    </ChatSession>
  );
};

export default CKCommentChat;
