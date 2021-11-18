import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import MessageList, { MessageListProps } from "./MessageList";

export default {
  title: "Components/Message/MessageList",
  component: MessageList,
} as Meta;

const Template: Story<MessageListProps> = (args) => <MessageList {...args} />;

export const Default = Template.bind({});
