import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import ChatKittyProvider from "../../Provider/ChatKittyProvider";
import UserDisplay, { UserDisplayProps } from "./UserDisplay";

export default {
  title: "Components/User/UserDisplay",
  component: UserDisplay,
} as Meta;

const Template: Story<UserDisplayProps> = (args) => (
  <div style={{ width: 450 }}>
    <ChatKittyProvider>
      <UserDisplay {...args} />
    </ChatKittyProvider>
  </div>
);

export const Online = Template.bind({});

Online.args = {
  displayName: "Aaron",
  displayPictureUrl:
    "https://media-exp1.licdn.com/dms/image/C4E03AQFEICiaNOZJ1w/profile-displayphoto-shrink_400_400/0/1632326497576?e=1642636800&v=beta&t=zCj6uU8mtR6K4Xv87FXJ4rGP4UmGB1YDiZl1iowKW68",
  online: true,
};

export const Offline = Template.bind({});

Offline.args = {
  displayName: "Aaron",
  displayPictureUrl:
    "https://media-exp1.licdn.com/dms/image/C4E03AQFEICiaNOZJ1w/profile-displayphoto-shrink_400_400/0/1632326497576?e=1642636800&v=beta&t=zCj6uU8mtR6K4Xv87FXJ4rGP4UmGB1YDiZl1iowKW68",
  online: false,
};
