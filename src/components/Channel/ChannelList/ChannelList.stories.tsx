import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import ChannelList, { ChannelListProps } from "./ChannelList";

export default {
  title: "Presentational Components/Channel/ChannelList",
  component: ChannelList,
} as Meta;

const Template: Story<ChannelListProps> = (args) => <ChannelList {...args} />;

export const Default = Template.bind({});
