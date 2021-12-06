import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import TextMessage, { TextMessageProps } from "./TextMessage";
import ChatKittyProvider from "../../Provider/ChatKittyProvider";
import { MockMessages } from "../../../mocks";

export default {
  title: "Components/TextMessage",
  component: TextMessage,
} as Meta;

const Template: Story<TextMessageProps> = (args) => (
  <ChatKittyProvider>
    <TextMessage {...args} />
  </ChatKittyProvider>
);

export const Basic = Template.bind({});
Basic.args = {
  ...MockMessages[0],
};
