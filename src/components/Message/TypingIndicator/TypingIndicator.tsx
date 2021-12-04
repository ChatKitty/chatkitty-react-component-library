import React from "react";
import { css, cx } from "@emotion/css";
import type { User } from "chatkitty";
import { useChatContext } from "../../Provider/ChatKittyProvider";

export interface TypingIndicatorProps {
  /**
   * list of users to display in typing indicator
   */
  typingUsers: User[];
}

const TypingIndicator = ({ typingUsers }: TypingIndicatorProps) => {
  const { theme } = useChatContext();

  if (!theme) {
    throw new Error(`Invalid component context`);
  }

  if (typingUsers.length === 1) {
    return (
      <p
        className={`${cx(
          css`
            ${theme.typingIndicator.container}
          `
        )} ck-typingIndicator`}
      >{`${typingUsers[0].displayName} is typing...`}</p>
    );
  }

  if (typingUsers.length > 1) {
    return (
      <p
        className={`${cx(
          css`
            ${theme.typingIndicator.container}
          `
        )} ck-typingIndicator`}
      >{`${typingUsers.map((u) => u.displayName).join(", ")} are typing...`}</p>
    );
  }

  return null;
};

export default TypingIndicator;
