import React from "react";
import { css, cx } from "@emotion/css";
import TextArea from "react-autosize-textarea";
import { useChatContext } from "../../Provider/ChatKittyProvider";
import EmojiInput from "../EmojiInput";
import { useUpdateMessageDraft, useSendMessageDraft } from "../../../hooks";

export interface MessageInputProps {
  /**
   * optional content before input field
   */
  pre?: React.ReactNode;

  /**
   * input placeholder override
   */
  placeholder?: string;

  /**
   * render function for emoji picker
   */
  renderEmojiPicker?: (callback: (emoji: string) => void) => React.ReactNode;
}

const MessageInput = ({
  pre = null,
  placeholder,
  renderEmojiPicker,
}: MessageInputProps) => {
  const { client, channel, theme } = useChatContext();

  if (!client || !channel || !theme) {
    throw new Error("Invalid component context");
  }

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
      {renderEmojiPicker && (
        <div
          className={`${cx(
            css`
              ${theme.messageInput.emojiPicker}
            `
          )} ck-messageInput-emojiPicker`}
        >
          <EmojiInput
            bottom={"50px"}
            right={"0"}
            renderEmojiPicker={renderEmojiPicker}
            onEmojiSelection={(emoji: string) => {
              setInput((input) => {
                const nextValue = input + emoji;
                updateMessage(channel, nextValue);
                return nextValue;
              });
            }}
          />
        </div>
      )}
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
