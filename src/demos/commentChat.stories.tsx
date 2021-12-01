import React, { useEffect } from "react";
import ChatKitty, {
  succeeded,
  GetChannelSucceededResult,
  Channel,
  StartSessionResult,
} from "chatkitty";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import { CKChatProps } from "../components/Chat/CKChat";
import { ChatKittyProvider, CKChat, Spinner } from "..";
import { defaultTheme } from "../themes/default";

const client = new ChatKitty({
  host: "api.staging.chatkitty.com",
  apiKey: "afaac908-1db3-4b5c-a7ae-c040b9684403",
});

export default {
  title: "Demos/CommentChat",
} as Meta;

const Template: Story<CKChatProps> = () => {
  const [channel, setChannel] = React.useState<Channel | undefined>();

  useEffect(() => {
    const init = async () => {
      const session = await client.startSession({
        username: "b2a6da08-88bf-4778-b993-7234e6d8a3ff",
      });

      if (succeeded<StartSessionResult>(session)) {
        console.log("I started a session!");
      }

      const channelRes = await client.getChannel(55003);

      if (succeeded<GetChannelSucceededResult>(channelRes)) {
        console.log("I fetched a channel!");
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
