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
}>({});

export const useChatContext = (): {
  client: ChatKitty;
  channels: Channel[];
  channel: Channel;
  theme: ChatKittyTheme;
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

  const { client, channels, channel, theme } = contextValue;

  return {
    client,
    channels,
    channel,
    theme,
  };
};

const ChatKittyProvider = ({
  client,
  channels,
  defaultSelectedChannel,
  theme = defaultTheme,
  children,
}: ChatKittyProviderProps) => {
  let channel;

  if (channels.length === 1) {
    channel = channels[0];
  }

  if (channels.length > 1) {
    if (defaultSelectedChannel) {
      channel = defaultSelectedChannel;
    } else {
      // select the first channel by default
      channel = channels[0];
    }
  }

  if (!channel) {
    return <Spinner />;
  }

  return (
    <ChatKittyContext.Provider value={{ client, channels, channel, theme }}>
      {children}
    </ChatKittyContext.Provider>
  );
};

export default ChatKittyProvider;
