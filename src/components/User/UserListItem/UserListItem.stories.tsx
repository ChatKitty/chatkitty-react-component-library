import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import UserListItem, { UserListItemProps } from "./UserListItem";

export default {
  title: "Components/User/UserListItem",
  component: UserListItem,
} as Meta;

const Template: Story<UserListItemProps> = (args) => <UserListItem {...args} />;

export const Default = Template.bind({});
