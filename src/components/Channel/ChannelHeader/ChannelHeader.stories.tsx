import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import ChatKittyProvider from "../../Provider/ChatKittyProvider";
import { GiReturnArrow } from "react-icons/gi";
import ChannelHeader, { ChannelHeaderProps } from "./ChannelHeader";

export default {
  title: "Components/ChannelHeader",
  component: ChannelHeader,
} as Meta;

const Template: Story<ChannelHeaderProps> = (args) => (
  <ChatKittyProvider>
    <ChannelHeader {...args} />
  </ChatKittyProvider>
);

export const Basic = Template.bind({});

Basic.args = {
  name: "ChatKitty",
  description: "Helping you build a great chat experience.",
};

export const WithBackIcon = Template.bind({});

WithBackIcon.args = {
  name: "ChatKitty",
  description: "Helping you build a great chat experience.",
  onClick: () => {},
};

export const WithCustomBackIcon = Template.bind({});

WithCustomBackIcon.args = {
  name: "ChatKitty",
  description: "Helping you build a great chat experience.",
  onClick: () => {},
  icon: <GiReturnArrow />,
};
