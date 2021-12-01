import React from "react";
import { css, cx } from "@emotion/css";
import { useChatContext } from "../../Provider/ChatKittyProvider";

export interface ChannelListProps {
  /**
   * title of channel list heading
   */
  title: string;

  /**
   * list items
   */
  children: React.ReactNode;
}

const ChannelList = ({ title, children }: ChannelListProps) => {
  const { theme } = useChatContext();

  return (
    <div
      className={`${cx(
        css`
          ${theme.channelList.container}
        `
      )} ck-channelList-container`}
    >
      <h2
        className={`${cx(
          css`
            ${theme.channelList.heading}
          `
        )} ck-channelList-heading`}
      >
        {title}
      </h2>
      {children}
    </div>
  );
};

export default ChannelList;
