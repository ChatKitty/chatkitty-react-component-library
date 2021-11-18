import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import ChatSession, { ChatSessionProps } from "./ChatSession";

export default {
  title: "Components/Session/ChatSession",
  component: ChatSession,
} as Meta;

const Template: Story<ChatSessionProps> = (args) => <ChatSession {...args} />;

export const Default = Template.bind({});
