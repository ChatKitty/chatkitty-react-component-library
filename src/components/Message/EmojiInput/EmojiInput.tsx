import React from "react";
import { css, cx } from "@emotion/css";
import { useChatContext } from "../../Provider/ChatKittyProvider";
import { useClickOutside } from "./useClickOutside";
import { GrEmoji } from "react-icons/gr";

export interface EmojiInputProps {
  /**
   * render function for emoji picker
   */
  renderEmojiPicker: (callback: (emoji: string) => void) => React.ReactNode;

  /**
   * callback for emoji selection
   */
  onEmojiSelection?: (emoji: string) => void;

  /**
   * optional icon override
   */
  icon?: React.ReactNode;

  /**
   * Top position
   */
  top?: string;

  /**
   * Bottom position
   * */
  bottom?: string;

  /**
   * Left position
   */
  left?: string;

  /**
   * Right position of the Dropdown
   */
  right?: string;
}

const EmojiInput = ({
  renderEmojiPicker,
  onEmojiSelection,
  icon,
  ...positions
}: EmojiInputProps) => {
  const { theme } = useChatContext();

  const [showInput, setShowInput] = React.useState(false);
  const anchor = React.useRef<HTMLDivElement>(null);

  const callback = React.useCallback(
    (emoji: string) => {
      onEmojiSelection && onEmojiSelection(emoji);
      setShowInput(false);
    },
    [setShowInput]
  );

  useClickOutside([anchor], () => setShowInput(false));

  if (!theme) {
    throw new Error("Invalid component context");
  }

  return (
    <div
      ref={anchor}
      className={`${cx(
        css`
          ${theme.emojiInput.container}
        `
      )} ck-emojiInput`}
    >
      <button
        className={`${cx(
          css`
            ${theme.emojiInput.iconButton}
          `
        )} ck-emojiInput-iconButton`}
        onClick={() => setShowInput(true)}
      >
        {icon ? icon : <GrEmoji />}
      </button>

      <div
        className={`${cx(
          css`
            ${theme.emojiInput.popover}
            top: ${positions.top || "auto"};
            bottom: ${positions.bottom || "auto"};
            left: ${positions.left || "auto"};
            right: ${positions.right || "auto"};
          `
        )} ck-emojiInput-popover`}
      >
        {showInput && renderEmojiPicker(callback)}
      </div>
    </div>
  );
};

export default EmojiInput;
