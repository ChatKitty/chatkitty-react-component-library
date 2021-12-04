import React from "react";
import type { Message, User, TextUserMessage } from "chatkitty";
import ChannelHeader from "../../Channel/ChannelHeader";
import ChannelList from "../../Channel/ChannelList";
import ChannelListItem from "../../Channel/ChannelListItem";
import MessageList from "../../Message/MessageList";
import MessageInput from "../../Message/MessageInput";
import TextMessage from "../../Message/TextMessage";
import {
  useChatContext,
  ChatKittyContext,
} from "../../Provider/ChatKittyProvider";
import { useMessages, useCurrentUser } from "../../../hooks";
import ChatSession from "../../Session/ChatSession";
import Spinner from "../../utility/Spinner";
import UserDisplay from "../../User/UserDisplay";
import ChatContainer from "../ChatContainer";
import ChatDrawer from "../ChatDrawer";
import TypingIndicator from "../../Message/TypingIndicator";

export interface CKChannelChatProps {}

const CKChannelChat = ({}: CKChannelChatProps) => {
  const { client, channel, channels } = useChatContext();

  if (!client || !channel || !channels) {
    throw new Error(`Invalid component context`);
  }

  // drawer state
  const [drawerOpen, setDrawerOpen] = React.useState(true);

  // current user
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
    <ChatKittyContext.Consumer>
      {({ setChannel = () => {} }) => (
        <ChatContainer>
          {drawerOpen ? (
            <ChatDrawer onClose={() => setDrawerOpen(false)}>
              <UserDisplay
                displayName={currentUser.displayName}
                displayPictureUrl={currentUser.displayPictureUrl}
                online={true}
              />
              <ChannelList title="Channels">
                {channels.length > 0 &&
                  channels.map((c) => (
                    <ChannelListItem
                      key={c.id}
                      name={c.name}
                      description={
                        (c.properties as { description: string }).description
                      }
                      channelImage="https://bit.ly/ryan-florence"
                      selected={c.id === channel.id}
                      onClick={() => {
                        setChannel(c);
                        setDrawerOpen(false);
                      }}
                    />
                  ))}
              </ChannelList>
            </ChatDrawer>
          ) : (
            <ChatSession
              onReceivedMessage={onReceivedMessage}
              onTypingStarted={onTypingStarted}
              onTypingStopped={onTypingStopped}
            >
              <ChannelHeader
                name={channel.name}
                description={(channel.properties as any).description}
                onClick={() => setDrawerOpen(true)}
              />
              {messagesLoading ? (
                <Spinner />
              ) : (
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
              )}
              <TypingIndicator typingUsers={typingUsers} />
              <MessageInput />
            </ChatSession>
          )}
        </ChatContainer>
      )}
    </ChatKittyContext.Consumer>
  );
};

export default CKChannelChat;
