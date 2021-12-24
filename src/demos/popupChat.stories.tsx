import React, { useEffect } from "react";
import ChatKitty, {
  succeeded,
  GetChannelSucceededResult,
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
  Popup,
} from "..";
import { getDemoClient } from "./client";

export default {
  title: "Demos/PopupChat",
} as Meta;

const Chat = () => {
  const { client, channel } = useChatContext();

  if (!client || !channel) {
    throw new Error("Invalid component context");
  }

  const { resource: currentUser } = useCurrentUser(client);

  const { resource: messages, setResource: setMessages } = useMessages(
    client,
    channel
  );

  const [typingUsers, setTypingUsers] = React.useState<User[]>([]);

  if (!messages || !currentUser) {
    return <Spinner />;
  }

  const onTypingStarted = (user: User) => {
    setTypingUsers((prev) => [...prev, user]);
  };

  const onTypingStopped = (user: User) => {
    setTypingUsers((prev) => prev.filter((u) => u.id !== user.id));
  };

  const onReceivedMessage = (message: Message) => {
    setMessages((prev) => [message, ...(prev || [])]);
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

const Template: Story = () => {
  const [client, setClient] = React.useState<ChatKitty | undefined>();
  const [channel, setChannel] = React.useState<Channel | undefined>();

  useEffect(() => {
    const init = async () => {
      const client = await getDemoClient();

      setClient(client);

      const channelRes = await client.getChannel(55003);

      if (succeeded<GetChannelSucceededResult>(channelRes)) {
        setChannel(channelRes.channel);
      }
    };

    init();
  }, []);

  if (!channel) {
    return <Spinner />;
  }

  return (
    <Popup>
      <div
        style={{
          height: 500,
          width: 450,
          marginRight: 20,
          border: "1px solid #f2f2f2",
          borderRadius: 10,
          backgroundColor: "white",
        }}
      >
        <ChatKittyProvider client={client} channels={[channel]}>
          <Chat />
        </ChatKittyProvider>
      </div>
    </Popup>
  );
};

export const Demo = Template.bind({});
Demo.args = {};

Demo.parameters = {
  docs: {
    source: {
      code: `const Chat = () => {
  const { client, channel } = useChatContext();

  if (!client || !channel) {
    throw new Error("Invalid component context");
  }

  const { resource: currentUser } = useCurrentUser(client);

  const { resource: messages, setResource: setMessages } = useMessages(
    client,
    channel
  );

  const [typingUsers, setTypingUsers] = React.useState<User[]>([]);

  if (!messages || !currentUser) {
    return <Spinner />;
  }

  const onTypingStarted = (user: User) => {
    setTypingUsers((prev) => [...prev, user]);
  };

  const onTypingStopped = (user: User) => {
    setTypingUsers((prev) => prev.filter((u) => u.id !== user.id));
  };

  const onReceivedMessage = (message: Message) => {
    setMessages((prev) => [message, ...(prev || [])]);
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

const Template: Story = () => {
  const [client, setClient] = React.useState<ChatKitty | undefined>();
  const [channel, setChannel] = React.useState<Channel | undefined>();

  useEffect(() => {
    const init = async () => {
      const client = await getDemoClient();

      setClient(client);

      const channelRes = await client.getChannel(55003);

      if (succeeded<GetChannelSucceededResult>(channelRes)) {
        setChannel(channelRes.channel);
      }
    };

    init();
  }, []);

  if (!channel) {
    return <Spinner />;
  }

  return (
    <Popup>
      <div
        style={{
          height: 500,
          width: 450,
          marginRight: 20,
          border: "1px solid #f2f2f2",
          borderRadius: 10,
          backgroundColor: "white",
        }}
      >
        <ChatKittyProvider client={client} channels={[channel]}>
          <Chat />
        </ChatKittyProvider>
      </div>
    </Popup>
  );
};`,
    },
  },
};
