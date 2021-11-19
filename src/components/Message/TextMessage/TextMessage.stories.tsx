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
Default.args = {
  displayPictureUrl:
    "https://media-exp1.licdn.com/dms/image/C4E03AQFEICiaNOZJ1w/profile-displayphoto-shrink_400_400/0/1632326497576?e=1642636800&v=beta&t=zCj6uU8mtR6K4Xv87FXJ4rGP4UmGB1YDiZl1iowKW68",
  displayName: "Aaron",
  createdTime: "1 minute ago",
  body: "Welcome to ChatKitty! How can we help?",
};
