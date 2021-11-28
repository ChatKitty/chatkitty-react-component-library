import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import UserDisplay, { UserDisplayProps } from "./UserDisplay";

export default {
  title: "Components/User/UserDisplay",
  component: UserDisplay,
} as Meta;

const Template: Story<UserDisplayProps> = (args) => <UserDisplay {...args} />;

export const Default = Template.bind({});
