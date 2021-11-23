import React from "react";
import { css, cx } from "@emotion/css";
import type { Message, User } from "chatkitty";
import { useChatSession } from "../../../hooks";
import { useChatContext } from "../../Provider/ChatKittyProvider";

export interface ChatSessionProps {
  /**
   * handle messages received in the chat session
   */
  onReceivedMessage?: (message: Message) => void;

  /**
   * typing started event
   */
  onTypingStarted?: (user: User) => void;

  /**
   * typing stopped event
   */
  onTypingStopped?: (user: User) => void;

  children: React.ReactNode;
}

const ChatSession = ({
  onReceivedMessage,
  onTypingStarted,
  onTypingStopped,
  children,
}: ChatSessionProps) => {
  const { client, channel, theme } = useChatContext();

  const { makeRequest: startChatSession } = useChatSession(client);

  React.useEffect(() => {
    const session = startChatSession(
      channel,
      onReceivedMessage,
      onTypingStarted,
      onTypingStopped
    );

    return session.end;
  }, [channel]);

  return (
    <div
      className={`${cx(
        css`
          ${theme.chat.container}
        `
      )} ck-chat`}
    >
      {children}
    </div>
  );
};

export default ChatSession;
