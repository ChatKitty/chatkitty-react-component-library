import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import ChatKittyProvider from "../../Provider/ChatKittyProvider";
import ChannelList, { ChannelListProps } from "./ChannelList";
import ChannelListItem from "../ChannelListItem";
import { MockChannels } from "../../../mocks";

export default {
  title: "Components/ChannelList",
  component: ChannelList,
} as Meta;

const Template: Story<ChannelListProps> = (args) => (
  <ChatKittyProvider>
    <ChannelList {...args}>
      {MockChannels.map((c) => (
        <ChannelListItem {...c} />
      ))}
    </ChannelList>
  </ChatKittyProvider>
);

export const Basic = Template.bind({});

export const WithTitle = Template.bind({});

WithTitle.args = {
  title: "Global Offices",
};
