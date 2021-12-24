import React from "react";
import { EmojiData, Picker as EmojiPicker } from "emoji-mart";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import ChatKittyProvider from "../../Provider/ChatKittyProvider";
import EmojiInput from "./EmojiInput";
import { SiHappycow } from "react-icons/si";
import "emoji-mart/css/emoji-mart.css";

export default {
  title: "Components/EmojiInput",
  component: EmojiInput,
} as Meta;

export const Basic: Story = () => (
  <div style={{ paddingTop: 400 }}>
    <ChatKittyProvider>
      <EmojiInput
        bottom={"44px"}
        right={"0"}
        renderEmojiPicker={(callback) => (
          <EmojiPicker
            native
            onSelect={(emoji: EmojiData) => {
              if ("native" in emoji) {
                callback(emoji.native);
              }
            }}
          />
        )}
      />
    </ChatKittyProvider>
  </div>
);

export const CustomPosition: Story = () => (
  <div style={{ paddingBottom: 400 }}>
    <ChatKittyProvider>
      <EmojiInput
        top={"44px"}
        left={"0"}
        renderEmojiPicker={(callback) => (
          <EmojiPicker
            native
            onSelect={(emoji: EmojiData) => {
              if ("native" in emoji) {
                callback(emoji.native);
              }
            }}
          />
        )}
      />
    </ChatKittyProvider>
  </div>
);

export const CustomIcon: Story = () => (
  <div style={{ paddingBottom: 400 }}>
    <ChatKittyProvider>
      <EmojiInput
        top={"44px"}
        left={"0"}
        icon={<SiHappycow />}
        renderEmojiPicker={(callback) => (
          <EmojiPicker
            native
            onSelect={(emoji: EmojiData) => {
              if ("native" in emoji) {
                callback(emoji.native);
              }
            }}
          />
        )}
      />
    </ChatKittyProvider>
  </div>
);
