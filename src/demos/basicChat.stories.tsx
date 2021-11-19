import React, { useEffect } from "react";
import ChatKitty, {
  succeeded,
  GetChannelSucceededResult,
  Channel,
  StartSessionResult,
} from "chatkitty";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import { ChatWindowProps } from "../components/ChatWindow";
import { ChatKittyProvider, ChatWindow, Spinner } from "..";

const client = new ChatKitty({
  host: "api.staging.chatkitty.com",
  apiKey: "afaac908-1db3-4b5c-a7ae-c040b9684403",
});

export default {
  title: "Demos/BasicChat",
} as Meta;

const Template: Story<ChatWindowProps> = () => {
  const [channel, setChannel] = React.useState<Channel | undefined>();

  useEffect(() => {
    const init = async () => {
      const session = await client.startSession({
        username: "b2a6da08-88bf-4778-b993-7234e6d8a3ff",
      });

      if (succeeded<StartSessionResult>(session)) {
        console.log("session started!");
      }

      const channelRes = await client.getChannel(55003);

      if (succeeded<GetChannelSucceededResult>(channelRes)) {
        console.log("channel fetched!");
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
      <ChatKittyProvider client={client} channel={channel}>
        <ChatWindow />
      </ChatKittyProvider>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
