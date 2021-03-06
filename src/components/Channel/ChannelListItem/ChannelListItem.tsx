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
  imageSrc?: string;

  /**
   * selected state
   */
  selected?: boolean;

  /**
   * click callback
   */
  onClick?: () => void;

  /**
   * append an optional element to the end of the list item
   */
  opt?: React.ReactNode;
}

const ChannelListItem = ({
  name,
  description,
  imageSrc,
  selected,
  onClick = () => {},
  opt,
}: ChannelListItemProps) => {
  const { theme } = useChatContext();

  if (!theme) {
    throw new Error("Invalid component context");
  }

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
      {imageSrc && (
        <img
          className={`${cx(
            css`
              ${theme.channelListItem.image}
            `
          )} ck-textMessage-image`}
          src={imageSrc}
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
      {opt && opt}
    </li>
  );
};

export default ChannelListItem;
