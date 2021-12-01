import React from "react";
import { css, cx } from "@emotion/css";
import TextArea from "react-autosize-textarea";
import { useChatContext } from "../../Provider/ChatKittyProvider";
import { useUpdateMessageDraft, useSendMessageDraft } from "../../../hooks";

export interface MessageInputProps {
  /**
   * optional content before input field
   */
  pre?: React.ReactNode;

  /**
   * optional override of input placeholder
   */
  placeholder?: string;
}

const MessageInput = ({ pre = null, placeholder }: MessageInputProps) => {
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

  return (
    <div
      className={`${cx(
        css`
          ${theme.messageInput.container}
        `
      )} ck-messageInput`}
    >
      {pre}
      <TextArea
        value={input}
        onKeyPress={(evt) => {
          if (evt.code === "Enter") {
            if (
              !(evt.shiftKey || window.matchMedia("(max-width: 640px)").matches)
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
        placeholder={placeholder || "Send a message..."}
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
  );
};

export default MessageInput;
