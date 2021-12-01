import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import CKChannelChat, { CKChannelChatProps } from "./CKChannelChat";

export default {
  title: "Components/CKChannelChat",
  component: CKChannelChat,
} as Meta;

const Template: Story<CKChannelChatProps> = (args) => (
  <CKChannelChat {...args} />
);

export const Default = Template.bind({});
Default.args = {};
