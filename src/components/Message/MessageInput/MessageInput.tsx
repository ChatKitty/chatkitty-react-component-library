import React from "react";
import { css, cx } from "@emotion/css";
import type { User } from "chatkitty";
import TextArea from "react-autosize-textarea";
import { useChatContext } from "../../Provider/ChatKittyProvider";
import { useUpdateMessageDraft, useSendMessageDraft } from "../../../hooks";

export interface MessageInputProps {
  typingUsers: User[];
}

const MessageInput = ({ typingUsers }: MessageInputProps) => {
  const { client, channel, theme } = useChatContext();

  const { makeRequest: updateMessage } = useUpdateMessageDraft(client);
  const { makeRequest: sendMessage } = useSendMessageDraft(client);

  const [input, setInput] = React.useState("");

  const submit = (input: string) => {
    const trimmed = input.trim();
    if (trimmed) {
      sendMessage(channel, trimmed);
      setInput("");
    }
  };

  const TypingIndicator = () => {
    if (typingUsers.length === 1) {
      return (
        <p
          className={`${cx(
            css`
              ${theme.typingIndicator.container}
            `
          )} ck-typingIndicator`}
        >{`${typingUsers[0].displayName} is typing...`}</p>
      );
    }

    if (typingUsers.length > 1) {
      return (
        <p
          className={`${cx(
            css`
              ${theme.typingIndicator.container}
            `
          )} ck-typingIndicator`}
        >{`${typingUsers
          .map((u) => u.displayName)
          .join(", ")} are typing...`}</p>
      );
    }

    return null;
  };

  return (
    <>
      <TypingIndicator />
      <div
        className={`${cx(
          css`
            ${theme.messageInput.container}
          `
        )} ck-messageInput`}
      >
        <TextArea
          value={input}
          onKeyPress={(evt) => {
            if (evt.code === "Enter") {
              if (
                !(
                  evt.shiftKey ||
                  window.matchMedia("(max-width: 640px)").matches
                )
              ) {
                submit(input);
                evt.preventDefault();
              }
            }
          }}
          onChange={(evt) => {
            const { value } = evt.currentTarget;
            updateMessage(channel, value);
            setInput(value);
          }}
          placeholder="Send a message..."
          className={`${cx(
            css`
              ${theme.messageInput.text}
            `
          )} ck-messageInput-text`}
        />
        <button
          onClick={() => submit(input)}
          className={`${cx(
            css`
              ${theme.messageInput.button}
            `
          )} ck-messageInput-button`}
        >
          +
        </button>
      </div>
    </>
  );
};

export default MessageInput;
