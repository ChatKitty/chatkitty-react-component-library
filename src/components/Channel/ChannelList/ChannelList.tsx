import React from "react";
import { css, cx } from "@emotion/css";
import ChannelListItem from "../ChannelListItem";
import { useChatContext } from "../../Provider/ChatKittyProvider";

export interface ChannelListProps {
  title: string;
  onClick: () => void;
}

const ChannelList = ({ title, onClick }: ChannelListProps) => {
  const { channels, channel, theme } = useChatContext();

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
      {channels.length > 0 &&
        channels.map((c) => (
          <ChannelListItem
            key={c.id}
            channel={c}
            selected={c.id === channel.id}
            onClick={onClick}
          />
        ))}
    </div>
  );
};

export default ChannelList;
