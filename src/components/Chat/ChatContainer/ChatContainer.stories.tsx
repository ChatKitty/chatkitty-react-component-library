import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import ChatKittyProvider from "../../Provider/ChatKittyProvider";
import ChatContainer, { ChatContainerProps } from "./ChatContainer";

export default {
  title: "Components/Chat/ChatContainer",
  component: ChatContainer,
} as Meta;

const Template: Story<ChatContainerProps> = (args) => (
  <ChatKittyProvider>
    <div style={{ height: 600, width: 450, backgroundColor: "white" }}>
      <ChatContainer {...args}>
        <p style={{ textAlign: "center" }}>
          I'm just a container, use me if you'd like!
        </p>
      </ChatContainer>
    </div>
  </ChatKittyProvider>
);

export const Basic = Template.bind({});
