import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import Popup, { PopupProps } from "./Popup";

export default {
  title: "Components/Popup",
  component: Popup,
} as Meta;

const Template: Story<PopupProps> = (args) => <Popup {...args} />;

export const Default = Template.bind({});
