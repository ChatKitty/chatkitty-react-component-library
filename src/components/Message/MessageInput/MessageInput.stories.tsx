import React from "react";
import ChatKitty, {
  succeeded,
  GetChannelSucceededResult,
  Channel,
} from "chatkitty";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import { BiBookContent } from "react-icons/bi";
import ChatKittyProvider from "../../Provider/ChatKittyProvider";
import MessageInput, { MessageInputProps } from "./MessageInput";
import Spinner from "../../utility/Spinner";
import { getDemoClient } from "../../../demos/client";

export default {
  title: "Components/Message/MessageInput",
  component: MessageInput,
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

  if (!channel) {
    return <Spinner />;
  }

  return (
    <div style={{ width: 450 }}>
      <ChatKittyProvider client={client} channels={[channel]}>
        <MessageInput />
      </ChatKittyProvider>
    </div>
  );
};

Basic.parameters = {
  docs: {
    source: {
      code: `<div style={{ width: 450 }}>
  <ChatKittyProvider client={client} channels={[channel]}>
    <MessageInput />
  </ChatKittyProvider>
</div>`,
    },
  },
};

export const WithPlaceholder: Story = () => {
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

  if (!channel) {
    return <Spinner />;
  }

  return (
    <div style={{ width: 450 }}>
      <ChatKittyProvider client={client} channels={[channel]}>
        <MessageInput placeholder="Custom placeholder..." />
      </ChatKittyProvider>
    </div>
  );
};

WithPlaceholder.parameters = {
  docs: {
    source: {
      code: `<div style={{ width: 450 }}>
  <ChatKittyProvider client={client} channels={[channel]}>
    <MessageInput placeholder="Custom placeholder..." />
  </ChatKittyProvider>
</div>`,
    },
  },
};

export const WithPreContent: Story = () => {
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

  if (!channel) {
    return <Spinner />;
  }

  return (
    <div style={{ width: 450 }}>
      <ChatKittyProvider client={client} channels={[channel]}>
        <MessageInput
          pre={
            <div style={{ fontSize: 30, padding: 10 }}>
              <BiBookContent />
            </div>
          }
        />
      </ChatKittyProvider>
    </div>
  );
};

WithPreContent.parameters = {
  docs: {
    source: {
      code: `<div style={{ width: 450 }}>
  <ChatKittyProvider client={client} channels={[channel]}>
    <MessageInput
      pre={
        <div style={{ fontSize: 30, padding: 10 }}>
          <BiBookContent />
        </div>
      }
    />
  </ChatKittyProvider>
</div>`,
    },
  },
};
