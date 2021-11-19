import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import TextMessage, { TextMessageProps } from "./TextMessage";
import { MockMessages } from "../../../mocks";

export default {
  title: "Presentational Components/Message/TextMessage",
  component: TextMessage,
} as Meta;

const Template: Story<TextMessageProps> = (args) => <TextMessage {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...MockMessages[0],
};
