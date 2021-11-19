import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import ChatWindow, { ChatWindowProps } from "./ChatWindow";

export default {
  title: "Components/ChatWindow",
  component: ChatWindow,
} as Meta;

const Template: Story<ChatWindowProps> = (args) => <ChatWindow {...args} />;

export const Default = Template.bind({});
Default.args = {};
