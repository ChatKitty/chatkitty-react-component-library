import React from "react";
import type { Message, User, TextUserMessage } from "chatkitty";
import ChannelHeader from "../../Channel/ChannelHeader";
import MessageList from "../../Message/MessageList";
import MessageInput from "../../Message/MessageInput";
import TextMessage from "../../Message/TextMessage";
import { useChatContext } from "../../Provider/ChatKittyProvider";
import { useMessages, useCurrentUser } from "../../../hooks";
import ChatSession from "../../Session/ChatSession";
import Spinner from "../../utility/Spinner";
import ChatContainer from "../ChatContainer";
import TypingIndicator from "../../Message/TypingIndicator";

export interface CKChatProps {}

const CKChat = ({}: CKChatProps) => {
  const { client, channel } = useChatContext();

  if (!client || !channel) {
    throw new Error(`Invalid component context`);
  }

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
    <ChatContainer>
      <ChatSession
        onReceivedMessage={onReceivedMessage}
        onTypingStarted={onTypingStarted}
        onTypingStopped={onTypingStopped}
      >
        <ChannelHeader
          name={channel.name}
          description={(channel.properties as any).description}
        />
        <MessageList>
          {messages.map((message) => {
            const casted = message as TextUserMessage;
            return (
              <TextMessage
                key={casted.id}
                displayPictureUrl={casted.user.displayPictureUrl}
                displayName={casted.user.displayName}
                createdTime={new Date(casted.createdTime)}
                body={casted.body}
              />
            );
          })}
        </MessageList>
        <TypingIndicator typingUsers={typingUsers} />
        <MessageInput />
      </ChatSession>
    </ChatContainer>
  );
};

export default CKChat;
