import React from "react";
import ChatKitty, { Channel } from "chatkitty";

export interface ChatKittyProviderProps {
  client: ChatKitty;
  channel: Channel;
  children?: React.ReactNode;
}

export const ChatKittyContext = React.createContext<{
  client: ChatKitty;
  channel?: Channel;
}>({
  client: new ChatKitty({
    host: "api.staging.chatkitty.com",
    apiKey: "",
  }),
});

export const useChatContext = (): { client: ChatKitty; channel: Channel } => {
  const contextValue = React.useContext(ChatKittyContext);

  if (!contextValue) {
    console.warn(
      `The useChatContext hook was called outside of the ChatKittyContext provider.`
    );
  }

  if (!contextValue.channel) {
    throw new Error("missing channel");
  }

  const { client, channel } = contextValue;

  return {
    client,
    channel,
  };
};

const ChatKittyProvider = ({
  client,
  channel,
  children,
}: ChatKittyProviderProps) => {
  return (
    <ChatKittyContext.Provider value={{ client, channel }}>
      {children}
    </ChatKittyContext.Provider>
  );
};

export default ChatKittyProvider;
