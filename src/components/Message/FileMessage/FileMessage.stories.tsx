import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import FileMessage, { FileMessageProps } from "./FileMessage";

export default {
  title: "Components/Message/FileMessage",
  component: FileMessage,
} as Meta;

const Template: Story<FileMessageProps> = (args) => <FileMessage {...args} />;

export const Default = Template.bind({});
