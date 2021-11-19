import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import ChannelHeader, { ChannelHeaderProps } from "./ChannelHeader";

export default {
  title: "Components/Channel/ChannelHeader",
  component: ChannelHeader,
} as Meta;

const Template: Story<ChannelHeaderProps> = (args) => (
  <ChannelHeader {...args} />
);

export const Default = Template.bind({});
