import React from "react";
import { css, cx } from "@emotion/css";
import type { Channel } from "chatkitty";
import {
  useChatContext,
  ChatKittyContext,
} from "../../Provider/ChatKittyProvider";

export interface ChannelListItemProps {
  /**
   * ChatKitty Channel
   */
  channel: Channel;

  /**
   * selected state
   */
  selected: boolean;

  /**
   * handle click action on list item
   */
  onClick: () => void;
}

const ChannelListItem = ({
  channel,
  selected,
  onClick,
}: ChannelListItemProps) => {
  const { theme } = useChatContext();

  return (
    <ChatKittyContext.Consumer>
      {({ setChannel = () => {} }) => (
        <li
          className={`${cx(
            css`
              ${theme.channelListItem.container}
              ${selected ? "background-color: #f2f2f2;" : ""}
            `
          )} ck-channelListItem-container`}
          onClick={() => {
            setChannel(channel);
            onClick();
          }}
        >
          <h2
            className={`${cx(
              css`
                ${theme.channelListItem.title}
              `
            )} ck-channelListItem-title`}
          >
            {channel.name}
          </h2>

          <p
            className={`${cx(
              css`
                ${theme.channelListItem.description}
              `
            )} ck-channelListItem-description`}
          >
            {(channel.properties as { description: string }).description}
          </p>
        </li>
      )}
    </ChatKittyContext.Consumer>
  );
};

export default ChannelListItem;
