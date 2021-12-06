import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import MessageList, { MessageListProps } from "./MessageList";
import ChatKittyProvider from "../../Provider/ChatKittyProvider";
import TextMessage from "../TextMessage";
import { MockMessages } from "../../../mocks";

export default {
  title: "Components/MessageList",
  component: MessageList,
} as Meta;

const Template: Story<MessageListProps> = (args) => (
  <ChatKittyProvider>
    <MessageList {...args} />
  </ChatKittyProvider>
);

export const Basic = Template.bind({});

Basic.args = {
  children: MockMessages.map((message) => <TextMessage {...message} />),
};
