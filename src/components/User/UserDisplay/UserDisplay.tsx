import React from "react";
import type { CurrentUser } from "chatkitty";
import { css, cx } from "@emotion/css";
import { useChatContext } from "../../Provider/ChatKittyProvider";

export interface UserDisplayProps {
  user: CurrentUser;
  online?: boolean;
}

const UserDisplay = ({ user, online = undefined }: UserDisplayProps) => {
  const { theme } = useChatContext();

  return (
    <div
      className={`${cx(
        css`
          ${theme.userDisplay.container}
        `
      )} ck-userDisplay`}
    >
      <img
        className={`${cx(
          css`
            ${theme.userDisplay.image}
          `
        )} ck-userDisplay-image`}
        src={user.displayPictureUrl}
      />
      <div
        className={`${cx(
          css`
            ${theme.userDisplay.displayName}
          `
        )} ck-userDisplay-name`}
      >
        {user.displayName}
        {online !== undefined && (
          <span
            className={`${cx(
              css`
                ${online
                  ? theme.userDisplay.onlineIndicator
                  : theme.userDisplay.offlineIndicator}
              `
            )} ck-typingIndicator`}
          />
        )}
      </div>
    </div>
  );
};

export default UserDisplay;
