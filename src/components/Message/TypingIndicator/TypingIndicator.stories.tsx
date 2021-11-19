import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import TypingIndicator, { TypingIndicatorProps } from "./TypingIndicator";

export default {
  title: "Components/Message/TypingIndicator",
  component: TypingIndicator,
} as Meta;

const Template: Story<TypingIndicatorProps> = (args) => (
  <TypingIndicator {...args} />
);

export const Default = Template.bind({});
