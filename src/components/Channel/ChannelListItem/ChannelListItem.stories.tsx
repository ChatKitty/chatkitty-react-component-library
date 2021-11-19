import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import ChannelListItem, { ChannelListItemProps } from "./ChannelListItem";

export default {
  title: "Presentational Components/Channel/ChannelListItem",
  component: ChannelListItem,
} as Meta;

const Template: Story<ChannelListItemProps> = (args) => (
  <ChannelListItem {...args} />
);

export const Default = Template.bind({});
