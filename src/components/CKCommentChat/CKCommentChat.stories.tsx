import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import CKCommentChat, { CKCommentChatProps } from "./CKCommentChat";

export default {
  title: "Components/CKCommentChat",
  component: CKCommentChat,
} as Meta;

const Template: Story<CKCommentChatProps> = (args) => (
  <CKCommentChat {...args} />
);

export const Default = Template.bind({});
Default.args = {};
