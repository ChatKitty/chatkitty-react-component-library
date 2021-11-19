import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import MessageList, { MessageListProps } from "./MessageList";
import TextMessage from "../TextMessage";
import { MockMessages } from "../../../mocks";

export default {
  title: "Presentational Components/Message/MessageList",
  component: MessageList,
} as Meta;

const Template: Story<MessageListProps> = (args) => <MessageList {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: MockMessages.map((message) => <TextMessage {...message} />),
};
