import React from "react";
import { css, cx } from "@emotion/css";
import { MdArrowBack } from "react-icons/md";
import { useChatContext } from "../../Provider/ChatKittyProvider";

export interface ChannelHeaderProps {
  /**
   * channel name
   */
  name: string;

  /**
   * channel description
   */
  description: string;

  /**
   * handle click action on back arrow
   */
  onClick?: () => void;

  /**
   * icon override
   */
  icon?: React.ReactNode;
}

const ChannelHeader = ({
  name,
  description,
  onClick,
  icon,
}: ChannelHeaderProps) => {
  const { theme } = useChatContext();

  if (!theme) {
    throw new Error(`Invalid component context`);
  }

  return (
    <div
      className={`${cx(
        css`
          ${theme.channelHeader.container}
        `
      )} ck-channelHeader`}
    >
      {onClick && (
        <button
          className={`${cx(
            css`
              ${theme.channelHeader.action}
            `
          )} ck-channelHeader-action`}
          onClick={onClick}
        >
          {icon ? icon : <MdArrowBack />}
        </button>
      )}
      <div
        className={`${cx(
          css`
            ${theme.channelHeader.content}
          `
        )} ck-channelHeader-content`}
      >
        <h1
          className={`${cx(
            css`
              ${theme.channelHeader.title}
            `
          )} ck-channelHeader-title`}
        >
          {name}
        </h1>
        <p
          className={`${cx(
            css`
              ${theme.channelHeader.description}
            `
          )} ck-channelHeader-description`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default ChannelHeader;
