import React from "react";
import { css, cx } from "@emotion/css";
import { useChatContext } from "../Provider/ChatKittyProvider";
import { MdChatBubble } from "react-icons/md";

export interface PopupProps {
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const Popup = ({ icon, children }: PopupProps) => {
  const { theme } = useChatContext();

  const [popupOpen, setPopupOpen] = React.useState(false);

  return (
    <div
      className={`${cx(
        css`
          ${theme.popup.container}
        `
      )} ck-popup`}
    >
      {popupOpen && children}
      {icon ? (
        icon
      ) : (
        <button
          className={`${cx(
            css`
              ${theme.popup.button}
            `
          )} ck-popup-button`}
          onClick={() => setPopupOpen(!popupOpen)}
        >
          <MdChatBubble
            style={{ fontSize: 40, transform: "translateY(3px)" }}
          />
        </button>
      )}
    </div>
  );
};

export default Popup;
