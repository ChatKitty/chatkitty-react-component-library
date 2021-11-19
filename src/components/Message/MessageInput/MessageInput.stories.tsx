import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import MessageInput, { MessageInputProps } from "./MessageInput";

export default {
  title: "Presentational Components/Message/MessageInput",
  component: MessageInput,
} as Meta;

const Template: Story<MessageInputProps> = (args) => (
  <div style={{ width: 400 }}>
    <MessageInput {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
