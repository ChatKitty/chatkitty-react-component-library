import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import CKChat, { CKChatProps } from "./CKChat";

export default {
  title: "Components/CKChat",
  component: CKChat,
} as Meta;

const Template: Story<CKChatProps> = (args) => <CKChat {...args} />;

export const Default = Template.bind({});
Default.args = {};
