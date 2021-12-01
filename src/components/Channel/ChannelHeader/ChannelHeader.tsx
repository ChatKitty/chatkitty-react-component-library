import React from "react";
import { css, cx } from "@emotion/css";
import { MdArrowBack } from "react-icons/md";
import { useChatContext } from "../../Provider/ChatKittyProvider";

export interface ChannelHeaderProps {
  action?: () => void;
}

const ChannelHeader = ({ action }: ChannelHeaderProps) => {
  const { channel, theme } = useChatContext();

  return (
    <div
      className={`${cx(
        css`
          ${theme.channelHeader.container}
        `
      )} ck-channelHeader`}
    >
      {action && (
        <button
          className={`${cx(
            css`
              ${theme.channelHeader.action}
            `
          )} ck-channelHeader-action`}
          onClick={action}
        >
          <MdArrowBack />
        </button>
      )}
      <h1
        className={`${cx(
          css`
            ${theme.channelHeader.title}
          `
        )} ck-channelHeader-title`}
      >
        #{channel.name}
      </h1>
      <p
        className={`${cx(
          css`
            ${theme.channelHeader.description}
          `
        )} ck-channelHeader-description`}
      >
        {(channel.properties as { description: string }).description}
      </p>
    </div>
  );
};

export default ChannelHeader;
