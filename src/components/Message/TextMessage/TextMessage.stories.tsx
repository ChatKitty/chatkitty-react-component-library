import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import TextMessage, { TextMessageProps } from "./TextMessage";

export default {
  title: "Components/Message/TextMessage",
  component: TextMessage,
} as Meta;

const Template: Story<TextMessageProps> = (args) => <TextMessage {...args} />;

export const Default = Template.bind({});
