import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import ChatKittyProvider, { ChatKittyProviderProps } from "./ChatKittyProvider";

export default {
  title: "Components/Provider/ChatKittyProvider",
  component: ChatKittyProvider,
} as Meta;

const Template: Story<ChatKittyProviderProps> = (args) => (
  <ChatKittyProvider {...args} />
);

export const Default = Template.bind({});
