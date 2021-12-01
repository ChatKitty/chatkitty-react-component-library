import React from "react";
import type { Channel } from "chatkitty";
import type ChatKitty from "chatkitty";
import { defaultTheme, ChatKittyTheme } from "../../../themes/default";
import Spinner from "../../utility/Spinner";

export interface ChatKittyProviderProps {
  client: ChatKitty;
  channels: Channel[];
  defaultSelectedChannel?: Channel;
  theme?: ChatKittyTheme;
  children?: React.ReactNode;
}

export const ChatKittyContext = React.createContext<{
  client?: ChatKitty;
  channels?: Channel[];
  channel?: Channel;
  theme?: ChatKittyTheme;
  setChannel?: (channel: Channel) => void;
}>({});

export const useChatContext = (): {
  client: ChatKitty;
  channels: Channel[];
  channel: Channel;
  theme: ChatKittyTheme;
  setChannel?: (channel: Channel) => void;
} => {
  const contextValue = React.useContext(ChatKittyContext);

  if (!contextValue) {
    console.warn(
      `The useChatContext hook was called outside of the ChatKittyContext provider.`
    );
  }

  if (!contextValue.client) {
    throw new Error("no chatkitty client in context");
  }

  if (!contextValue.channels || contextValue.channels.length === 0) {
    throw new Error("must specify at least one channel");
  }

  if (!contextValue.channel) {
    throw new Error("no channel selected");
  }

  if (!contextValue.theme) {
    throw new Error("no theme provided");
  }

  const { client, channels, channel, theme, setChannel } = contextValue;

  return {
    client,
    channels,
    channel,
    theme,
    setChannel,
  };
};

const ChatKittyProvider = ({
  client,
  channels,
  defaultSelectedChannel,
  theme = defaultTheme,
  children,
}: ChatKittyProviderProps) => {
  let defaultChannel;

  if (channels.length === 1) {
    defaultChannel = channels[0];
  }

  if (channels.length > 1) {
    if (defaultSelectedChannel) {
      defaultChannel = defaultSelectedChannel;
    } else {
      // select the first channel by default
      defaultChannel = channels[0];
    }
  }

  const [channel, setChannel] = React.useState(defaultChannel);

  if (!channel) {
    return <Spinner />;
  }

  return (
    <ChatKittyContext.Provider
      value={{
        client,
        channels,
        channel,
        theme,
        setChannel: (channel: Channel) => {
          setChannel(channel);
        },
      }}
    >
      {children}
    </ChatKittyContext.Provider>
  );
};

export default ChatKittyProvider;
