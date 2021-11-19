import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import MessageList, {
  MessageListProps,
} from "../components/Message/MessageList";
import TextMessage from "../components/Message/TextMessage";
import MessageInput from "../components/Message/MessageInput";
import { MockMessages } from "../mocks";

export default {
  title: "Demos/BasicChat",
  component: MessageList,
} as Meta;

const Template: Story<MessageListProps> = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState(MockMessages);

  React.useEffect(() => {
    scrollRef?.current?.scrollIntoView();
  }, [messages]);

  const updateMessages = () => {
    const trimmed = message.trim();

    if (trimmed) {
      setMessages((messages) => [
        ...messages,
        {
          ...MockMessages[0],
          body: trimmed,
        },
      ]);
      setMessage("");
    }
  };

  return (
    <div
      style={{
        border: "1px solid lightgray",
        borderRadius: 5,
        padding: 8,
        height: 600,
        width: 450,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
      }}
    >
      <MessageList>
        {messages.map((message) => (
          <TextMessage {...message} />
        ))}
        <div ref={scrollRef}></div>
      </MessageList>
      <MessageInput
        value={message}
        onChange={(evt) => setMessage(evt.currentTarget.value)}
        onKeyPress={(evt) => {
          if (evt.code === "Enter") {
            if (
              !(evt.shiftKey || window.matchMedia("(max-width: 640px)").matches)
            ) {
              updateMessages();
              evt.preventDefault();
            }
          }
        }}
        submit={updateMessages}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
