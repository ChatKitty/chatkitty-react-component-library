import React, { useEffect } from "react";
import ChatKitty, {
  succeeded,
  GetChannelsSucceededResult,
  Channel,
  Message,
  User,
  TextUserMessage,
} from "chatkitty";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
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
} from "..";
import { getDemoClient } from "./client";

export default {
  title: "Demos/ChannelChat",
} as Meta;

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

const Template: Story = () => {
  const [client, setClient] = React.useState<ChatKitty | undefined>();
  const [loaded, setLoaded] = React.useState(false);
  const [channels, setChannels] = React.useState<Channel[]>([]);

  useEffect(() => {
    const init = async () => {
      const client = await getDemoClient();

      setClient(client);

      const channelRes = await client.getChannels();

      if (succeeded<GetChannelsSucceededResult>(channelRes)) {
        setChannels(channelRes.paginator.items);
        setLoaded(true);
      }
    };

    init();
  }, []);

  if (!loaded) {
    return <Spinner />;
  }

  return (
    <div style={{ height: 600, width: 450 }}>
      <ChatKittyProvider client={client} channels={channels}>
        <Chat />
      </ChatKittyProvider>
    </div>
  );
};

export const Demo = Template.bind({});
Demo.args = {};

Demo.parameters = {
  docs: {
    source: {
      code: `const Chat = () => {
  const { client, channel, channels } = useChatContext();

  if (!client || !channel || !channels) {
    throw new Error('Invalid component context');
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

const Template: Story = () => {
  const [client, setClient] = React.useState<ChatKitty | undefined>();
  const [loaded, setLoaded] = React.useState(false);
  const [channels, setChannels] = React.useState<Channel[]>([]);

  useEffect(() => {
    const init = async () => {
      const client = await getDemoClient();

      setClient(client);

      const channelRes = await client.getChannels();

      if (succeeded<GetChannelsSucceededResult>(channelRes)) {
        setChannels(channelRes.paginator.items);
        setLoaded(true);
      }
    };

    init();
  }, []);

  if (!loaded) {
    return <Spinner />;
  }

  return (
    <div style={{ height: 600, width: 450 }}>
      <ChatKittyProvider client={client} channels={channels}>
        <Chat />
      </ChatKittyProvider>
    </div>
  );
};`,
    },
  },
};
