import React, { useEffect } from "react";
import ChatKitty, {
  succeeded,
  GetChannelsSucceededResult,
  Channel,
  StartSessionResult,
} from "chatkitty";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import { CKChatProps } from "../components/CKChat";
import { ChatKittyProvider, CKChannelChat, Spinner, Popup } from "..";
import { defaultTheme } from "../themes/default";

const client = new ChatKitty({
  host: "api.staging.chatkitty.com",
  apiKey: "afaac908-1db3-4b5c-a7ae-c040b9684403",
});

export default {
  title: "Demos/PopupChannelChat",
} as Meta;

const Template: Story<CKChatProps> = () => {
  const [loaded, setLoaded] = React.useState(false);
  const [channels, setChannels] = React.useState<Channel[]>([]);

  useEffect(() => {
    const init = async () => {
      const session = await client.startSession({
        username: "b2a6da08-88bf-4778-b993-7234e6d8a3ff",
      });

      if (succeeded<StartSessionResult>(session)) {
        console.log("I started a session!");
      }

      const channelRes = await client.getChannels();

      if (succeeded<GetChannelsSucceededResult>(channelRes)) {
        console.log("I fetched a list of channels!");
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
    <Popup>
      <div
        style={{
          height: 600,
          width: 450,
          marginRight: 20,
          border: "1px solid #f2f2f2",
          borderRadius: 10,
          backgroundColor: "white",
        }}
      >
        <ChatKittyProvider
          client={client}
          channels={channels}
          theme={defaultTheme}
        >
          <CKChannelChat />
        </ChatKittyProvider>
      </div>
    </Popup>
  );
};

export const Default = Template.bind({});
Default.args = {};
