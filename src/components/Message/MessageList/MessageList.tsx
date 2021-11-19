import React from "react";

export interface MessageListProps {
  children: React.ReactNode;
}

const MessageList = ({ children }: MessageListProps) => {
  return <ul className="ck-messageList">{children}</ul>;
};

export default MessageList;
