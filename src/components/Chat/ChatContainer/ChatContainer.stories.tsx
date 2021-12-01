import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import ChatContainer, { ChatContainerProps } from "./ChatContainer";

export default {
  title: "Components/ChatContainer",
  component: ChatContainer,
} as Meta;

const Template: Story<ChatContainerProps> = (args) => (
  <ChatContainer {...args} />
);

export const Default = Template.bind({});
