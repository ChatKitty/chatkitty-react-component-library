import React, { useEffect } from "react";
import ChatKitty, {
  succeeded,
  GetChannelSucceededResult,
  Channel,
} from "chatkitty";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import { CKChatProps } from "../components/Chat/CKChat";
import { ChatKittyProvider, CKChat, Spinner } from "..";
import { getDemoClient } from "./client";

export default {
  title: "Demos/BasicChat",
} as Meta;

const Template: Story<CKChatProps> = () => {
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
    <div style={{ height: 600, width: 450 }}>
      <ChatKittyProvider client={client} channels={[channel]}>
        <CKChat />
      </ChatKittyProvider>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
