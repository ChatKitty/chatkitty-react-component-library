import React from "react";
import { Message } from "chatkitty";
import { useChatSession } from "../../../hooks";
import { useChatContext } from "../../Provider/ChatKittyProvider";

export interface ChatSessionProps {
  /**
   * handle messages received in the chat session
   */
  onMessageReceived?: (message: Message) => void;

  children: React.ReactNode;
}

const ChatSession = ({
  onMessageReceived = () => {},
  children,
}: ChatSessionProps) => {
  const { client, channel } = useChatContext();

  const { makeRequest: startChatSession } = useChatSession(client);

  React.useEffect(() => {
    const session = startChatSession(channel, onMessageReceived);

    return session.end;
  }, [channel]);

  return <div className="ck-chat">{children}</div>;
};

export default ChatSession;
