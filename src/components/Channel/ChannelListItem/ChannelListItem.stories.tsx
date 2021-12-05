import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import ChatKittyProvider from "../../Provider/ChatKittyProvider";
import ChannelListItem, { ChannelListItemProps } from "./ChannelListItem";

export default {
  title: "Components/Channel/ChannelListItem",
  component: ChannelListItem,
} as Meta;

const Template: Story<ChannelListItemProps> = (args) => (
  <ChatKittyProvider>
    <ChannelListItem {...args} />
  </ChatKittyProvider>
);

export const Basic = Template.bind({});

Basic.args = {
  name: "ChatKitty",
  description: "Helping you build a great chat experience.",
};

export const WithImage = Template.bind({});

WithImage.args = {
  name: "ChatKitty",
  description: "Helping you build a great chat experience.",
  imageSrc:
    "https://media-exp1.licdn.com/dms/image/C4E03AQFEICiaNOZJ1w/profile-displayphoto-shrink_400_400/0/1632326497576?e=1642636800&v=beta&t=zCj6uU8mtR6K4Xv87FXJ4rGP4UmGB1YDiZl1iowKW68",
};

export const Selected = Template.bind({});

Selected.args = {
  name: "ChatKitty",
  description: "Helping you build a great chat experience.",
  selected: true,
  imageSrc:
    "https://media-exp1.licdn.com/dms/image/C4E03AQFEICiaNOZJ1w/profile-displayphoto-shrink_400_400/0/1632326497576?e=1642636800&v=beta&t=zCj6uU8mtR6K4Xv87FXJ4rGP4UmGB1YDiZl1iowKW68",
};
