import React from "react";
import { css, cx } from "@emotion/css";
import { useChatContext } from "../../Provider/ChatKittyProvider";

export interface ChannelListItemProps {
  /**
   * channel name
   */
  name: string;

  /**
   * channel description
   */
  description: string;

  /**
   * channel image url
   */
  channelImage?: string;

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
  name,
  description,
  channelImage,
  selected,
  onClick,
}: ChannelListItemProps) => {
  const { theme } = useChatContext();

  return (
    <li
      className={`${cx(
        css`
          ${theme.channelListItem.container}
          ${selected ? "background-color: #f2f2f2;" : ""}
        `
      )} ck-channelListItem-container`}
      onClick={onClick}
    >
      {channelImage && (
        <img
          className={`${cx(
            css`
              ${theme.channelListItem.image}
            `
          )} ck-textMessage-image`}
          src={channelImage}
        />
      )}
      <div
        className={`${cx(
          css`
            ${theme.channelListItem.body}
          `
        )} ck-textMessage-body`}
      >
        <h2
          className={`${cx(
            css`
              ${theme.channelListItem.title}
            `
          )} ck-channelListItem-title`}
        >
          {name}
        </h2>

        <p
          className={`${cx(
            css`
              ${theme.channelListItem.description}
            `
          )} ck-channelListItem-description`}
        >
          {description}
        </p>
      </div>
    </li>
  );
};

export default ChannelListItem;
