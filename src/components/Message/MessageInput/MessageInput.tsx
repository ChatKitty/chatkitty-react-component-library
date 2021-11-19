import React from "react";
import TextArea from "react-autosize-textarea";
import { useChatContext } from "../../Provider/ChatKittyProvider";
import { useUpdateMessageDraft, useSendMessageDraft } from "../../../hooks";

export interface MessageInputProps {}

const MessageInput = ({}: MessageInputProps) => {
  const { client, channel } = useChatContext();

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
    <div className="ck-messageInput">
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
        placeholder="Send a message..."
        className="ck-messageInput-text"
      />
      <button onClick={() => submit(input)} className="ck-messageInput-button">
        +
      </button>
    </div>
  );
};

export default MessageInput;
