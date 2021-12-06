import React from "react";
import ChatKitty, {
  succeeded,
  GetChannelSucceededResult,
  Channel,
  User,
} from "chatkitty";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import ChatKittyProvider from "../../Provider/ChatKittyProvider";
import MessageInput from "../MessageInput";
import TypingIndicator from "./TypingIndicator";
import Spinner from "../../utility/Spinner";
import ChatSession from "../../Session/ChatSession";
import { getDemoClient } from "../../../demos/client";

export default {
  title: "Components/Message/TypingIndicator",
  component: TypingIndicator,
} as Meta;

export const Basic: Story = () => {
  const [client, setClient] = React.useState<ChatKitty | undefined>();
  const [channel, setChannel] = React.useState<Channel | undefined>();

  React.useEffect(() => {
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

  const [typingUsers, setTypingUsers] = React.useState<User[]>([]);

  if (!channel) {
    return <Spinner />;
  }

  const onTypingStarted = (user: User) => {
    setTypingUsers((prev) => [...prev, user]);
  };

  const onTypingStopped = (user: User) => {
    setTypingUsers((prev) => prev.filter((u) => u.id !== user.id));
  };

  return (
    <div style={{ width: 450 }}>
      <ChatKittyProvider client={client} channels={[channel]}>
        <ChatSession
          onTypingStarted={onTypingStarted}
          onTypingStopped={onTypingStopped}
        >
          <TypingIndicator typingUsers={typingUsers} />
          <MessageInput />
        </ChatSession>
      </ChatKittyProvider>
    </div>
  );
};

Basic.parameters = {
  docs: {
    source: {
      code: `    <div style={{ width: 450 }}>
  <ChatKittyProvider client={client} channels={[channel]}>
    <ChatSession
      onTypingStarted={onTypingStarted}
      onTypingStopped={onTypingStopped}
    >
      <TypingIndicator typingUsers={typingUsers} />
      <MessageInput />
    </ChatSession>
  </ChatKittyProvider>
</div>`,
    },
  },
};
