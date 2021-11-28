import React from "react";
import type { Channel } from "chatkitty";
import type ChatKitty from "chatkitty";
import { defaultTheme, ChatKittyTheme } from "../../../themes/default";
import Spinner from "../../utility/Spinner";

export interface ChatKittyProviderProps {
  client: ChatKitty;
  channel?: Channel;
  theme?: ChatKittyTheme;
  children?: React.ReactNode;
}

export const ChatKittyContext = React.createContext<{
  client?: ChatKitty;
  channel?: Channel;
  theme?: ChatKittyTheme;
}>({});

export const useChatContext = (): {
  client: ChatKitty;
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
    throw new Error("missing client");
  }

  if (!contextValue.channel) {
    throw new Error("missing channel");
  }

  if (!contextValue.theme) {
    throw new Error("missing theme");
  }

  const { client, channel, theme } = contextValue;

  return {
    client,
    channel,
    theme,
  };
};

const ChatKittyProvider = ({
  client,
  channel,
  theme = defaultTheme,
  children,
}: ChatKittyProviderProps) => {
  if (!channel) {
    // we're in channel list mode, grab those channels doe
  }

  if (!channel) {
    return <Spinner />;
  }

  return (
    <ChatKittyContext.Provider value={{ client, channel, theme }}>
      {children}
    </ChatKittyContext.Provider>
  );
};

export default ChatKittyProvider;
