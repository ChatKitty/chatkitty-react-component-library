import React from "react";
import type { Channel } from "chatkitty";
import type ChatKitty from "chatkitty";
import { defaultTheme, ChatKittyTheme } from "../../../themes/default";

export interface ChatKittyProviderProps {
  client?: ChatKitty;
  channels?: Channel[];
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
  client?: ChatKitty;
  channels?: Channel[];
  channel?: Channel;
  theme?: ChatKittyTheme;
  setChannel?: (channel: Channel) => void;
} => {
  const contextValue = React.useContext(ChatKittyContext);

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

  if (channels) {
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
  }

  const [channel, setChannel] = React.useState(defaultChannel);

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
