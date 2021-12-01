import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import ChatDrawer, { ChatDrawerProps } from "./ChatDrawer";

export default {
  title: "Components/ChatDrawer",
  component: ChatDrawer,
} as Meta;

const Template: Story<ChatDrawerProps> = (args) => <ChatDrawer {...args} />;

export const Default = Template.bind({});
