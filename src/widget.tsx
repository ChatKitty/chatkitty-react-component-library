import React from "react";
import ReactDOM from "react-dom";
import type { Channel, Message, User, TextUserMessage } from "chatkitty";
import type ChatKitty from "chatkitty";
import {
  useChatContext,
  useCurrentUser,
  useMessages,
  ChatKittyProvider,
  Spinner,
  ChatContainer,
  ChatSession,
  ChannelHeader,
  MessageList,
  TextMessage,
  TypingIndicator,
  MessageInput,
  ChatDrawer,
  ChannelList,
  ChannelListItem,
  ChatKittyContext,
  UserDisplay,
} from ".";

const Chat = () => {
  const { client, channel, channels } = useChatContext();

  if (!client || !channel || !channels) {
    throw new Error("Invalid component context");
  }

  const [drawerOpen, setDrawerOpen] = React.useState(true);

  const { resource: currentUser } = useCurrentUser(client);

  const {
    resource: messages,
    setResource: setMessages,
    isLoading: messagesLoading,
  } = useMessages(client, channel);

  const onReceivedMessage = (message: Message) => {
    setMessages((prev) => [message, ...(prev || [])]);
  };

  const [typingUsers, setTypingUsers] = React.useState<User[]>([]);

  const onTypingStarted = (user: User) => {
    setTypingUsers((prev) => [...prev, user]);
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
                      imageSrc="https://bit.ly/ryan-florence"
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

const init = (id: string, client: ChatKitty, channel: Channel) => {
  ReactDOM.render(
    <ChatKittyProvider client={client} channels={[channel]}>
      <Chat />
    </ChatKittyProvider>,
    document.getElementById(id)
  );
};

export { init };
