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
import { defaultTheme } from "../themes/default";
import { getDemoClient } from "./client";

export default {
  title: "Demos/CommentChat",
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

  const theme = {
    ...defaultTheme,
    chat: {
      ...defaultTheme.chat,
      container: `
        ${defaultTheme.chat.container}
        flex-direction: column-reverse;
      `,
    },
    channelHeader: {
      ...defaultTheme.channelHeader,
      container: `
        ${defaultTheme.channelHeader.container}
        display: none;
      `,
    },
    messageList: {
      ...defaultTheme.messageList,
      container: `
        ${defaultTheme.messageList.container}
        flex-direction: column;
      `,
    },
  };

  return (
    <div style={{ height: 600, width: 450 }}>
      <ChatKittyProvider client={client} channels={[channel]} theme={theme}>
        <CKChat />
      </ChatKittyProvider>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
