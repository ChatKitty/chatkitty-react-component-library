import React from "react";
import TextArea from "react-autosize-textarea";

export interface MessageInputProps {
  /**
   * optional controlled value for input
   */
  value?: string;

  /**
   * keypress event handler
   */
  onKeyPress?: React.KeyboardEventHandler<HTMLTextAreaElement>;

  /**
   * change event handler
   */
  onChange?: React.FormEventHandler<HTMLTextAreaElement>;

  /**
   * submit action handler
   */
  submit: () => void;
}

const MessageInput = ({
  value,
  onKeyPress,
  onChange,
  submit,
}: MessageInputProps) => {
  return (
    <div className="ck-messageInput">
      <TextArea
        value={value}
        onKeyPress={onKeyPress}
        onChange={onChange}
        placeholder="Send a message..."
        className="ck-messageInput-text"
      />
      <button onClick={submit} className="ck-messageInput-button">
        +
      </button>
    </div>
  );
};

export default MessageInput;
