import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import ChatKittySession, { ChatKittySessionProps } from "./ChatKittySession";

export default {
  title: "Presentational Components/Session/ChatKittySession",
  component: ChatKittySession,
} as Meta;

const Template: Story<ChatKittySessionProps> = (args) => (
  <ChatKittySession {...args} />
);

export const Default = Template.bind({});
