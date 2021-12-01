import React from "react";
import type { Message, User } from "chatkitty";
import ChannelHeader from "../../Channel/ChannelHeader";
import ChannelList from "../../Channel/ChannelList";
import MessageList from "../../Message/MessageList";
import MessageInput from "../../Message/MessageInput";
import { useChatContext } from "../../Provider/ChatKittyProvider";
import { useMessages, useCurrentUser } from "../../../hooks";
import ChatSession from "../../Session/ChatSession";
import Spinner from "../../utility/Spinner";
import UserDisplay from "../../User/UserDisplay";
import ChatContainer from "../ChatContainer";
import ChatDrawer from "../ChatDrawer";

export interface CKChannelChatProps {}

const CKChannelChat = ({}: CKChannelChatProps) => {
  const [drawerOpen, setDrawerOpen] = React.useState(true);

  const { client, channel } = useChatContext();

  // Current User
  const { resource: currentUser } = useCurrentUser(client);

  // Message Handling
  const {
    resource: messages,
    setResource: setMessages,
    isLoading: messagesLoading,
  } = useMessages(client, channel);

  const onReceivedMessage = (message: Message) => {
    setMessages((prev) => [message, ...(prev || [])]);
  };

  // Typing Indicator
  const [typingUsers, setTypingUsers] = React.useState<User[]>([]);

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

  if (!messages || !currentUser) {
    return <Spinner />;
  }

  return (
    <ChatContainer>
      {drawerOpen ? (
        <ChatDrawer onClose={() => setDrawerOpen(false)}>
          <UserDisplay user={currentUser} online={true} />
          <ChannelList title="Channels" onClick={() => setDrawerOpen(false)} />
        </ChatDrawer>
      ) : (
        <ChatSession
          onReceivedMessage={onReceivedMessage}
          onTypingStarted={onTypingStarted}
          onTypingStopped={onTypingStopped}
        >
          <ChannelHeader action={() => setDrawerOpen(true)} />
          {messagesLoading ? <Spinner /> : <MessageList messages={messages} />}
          <MessageInput typingUsers={typingUsers} />
        </ChatSession>
      )}
    </ChatContainer>
  );
};

export default CKChannelChat;
