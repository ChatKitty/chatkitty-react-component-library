import React from "react";
import { css, cx } from "@emotion/css";
import { useChatContext } from "../../Provider/ChatKittyProvider";

export interface UserDisplayProps {
  /**
   * display name
   */
  displayName: string;

  /**
   * display image url
   */
  displayPictureUrl: string;

  /**
   * user online status
   */
  online?: boolean;
}

const UserDisplay = ({
  displayName,
  displayPictureUrl,
  online = undefined,
}: UserDisplayProps) => {
  const { theme } = useChatContext();

  if (!theme) {
    throw new Error(`Invalid component context`);
  }

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
        src={displayPictureUrl}
      />
      <div
        className={`${cx(
          css`
            ${theme.userDisplay.displayName}
          `
        )} ck-userDisplay-name`}
      >
        {displayName}
        {online !== undefined && (
          <span
            className={`${cx(
              css`
                ${online
                  ? theme.userDisplay.onlineIndicator
                  : theme.userDisplay.offlineIndicator}
              `
            )} ck-userDisplay: indicator`}
          />
        )}
      </div>
    </div>
  );
};

export default UserDisplay;
