import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import UserList, { UserListProps } from "./UserList";

export default {
  title: "Components/User/UserList",
  component: UserList,
} as Meta;

const Template: Story<UserListProps> = (args) => <UserList {...args} />;

export const Default = Template.bind({});
