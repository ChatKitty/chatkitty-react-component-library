import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import ChatKittyProvider from "../../Provider/ChatKittyProvider";
import ChatDrawer from "./ChatDrawer";
import ChatContainer from "../ChatContainer";
import ChannelHeader from "../../Channel/ChannelHeader";

export default {
  title: "Components/Chat/ChatDrawer",
  component: ChatDrawer,
} as Meta;

const Template: Story = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(true);

  return (
    <ChatKittyProvider>
      <div style={{ height: 600, width: 450, backgroundColor: "white" }}>
        <ChatContainer>
          {drawerOpen ? (
            <ChatDrawer onClose={() => setDrawerOpen(false)}>
              <p style={{ textAlign: "center" }}>
                Drawer is open. Try closing it?
              </p>
            </ChatDrawer>
          ) : (
            <ChannelHeader
              name="Drawer is closed."
              description="Try opening it again?"
              onClick={() => setDrawerOpen(true)}
            />
          )}
        </ChatContainer>
      </div>
    </ChatKittyProvider>
  );
};

export const Default = Template.bind({});
