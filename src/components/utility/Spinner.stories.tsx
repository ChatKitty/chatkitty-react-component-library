import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import Spinner from "./Spinner";

export default {
  title: "Components/Spinner",
  component: Spinner,
} as Meta;

const Template: Story = () => (
  <div style={{ width: 400, height: 400 }}>
    <Spinner />
  </div>
);

export const Basic = Template.bind({});
