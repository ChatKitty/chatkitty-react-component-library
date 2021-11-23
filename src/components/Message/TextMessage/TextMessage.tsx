import React from "react";
import { css, cx } from "@emotion/css";
import { useChatContext } from "../../Provider/ChatKittyProvider";

export interface TextMessageProps {
  /**
   * absolute url for display picture
   */
  displayPictureUrl: string;

  /**
   * message sender display name
   */
  displayName: string;

  /**
   * time display for message
   */
  createdTime: string;

  /**
   * main message content
   */
  body: string;
}

const TextMessage = ({
  displayPictureUrl,
  displayName,
  createdTime,
  body,
}: TextMessageProps) => {
  const { theme } = useChatContext();

  return (
    <li
      className={`${cx(
        css`
          ${theme.textMessage.container}
        `
      )} ck-textMessage`}
    >
      <img
        className={`${cx(
          css`
            ${theme.textMessage.image}
          `
        )} ck-textMessage-image`}
        src={displayPictureUrl}
      />
      <div
        className={`${cx(
          css`
            ${theme.textMessage.body}
          `
        )} ck-textMessage-body`}
      >
        <h2
          className={`${cx(
            css`
              ${theme.textMessage.name}
            `
          )} ck-textMessage-name`}
        >
          {displayName}
          <span
            className={`${cx(
              css`
                ${theme.textMessage.time}
              `
            )} ck-textMessage-time`}
          >
            {createdTime}
          </span>
        </h2>
        <div>
          <div
            className={`${cx(
              css`
                ${theme.textMessage.message}
              `
            )} ck-textMessage-message`}
          >
            {body}
          </div>
        </div>
      </div>
    </li>
  );
};

export default TextMessage;
