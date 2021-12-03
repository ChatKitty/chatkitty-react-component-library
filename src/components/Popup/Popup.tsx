import React from "react";
import { css, cx, keyframes } from "@emotion/css";
import { MdChatBubble, MdMarkChatUnread } from "react-icons/md";

const blink = keyframes`
  0% { color: white; }
  49% { color: white; }
  60% { color: transparent; }
  99% { color: transparent; }
  100% { color: white; }
`;

export interface PopupProps {
  hasUnread?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const Popup = ({ hasUnread, icon, children }: PopupProps) => {
  const [popupOpen, setPopupOpen] = React.useState(false);

  return (
    <div
      className={`${cx(
        css`
          position: fixed;
          bottom: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          z-index: 1000;
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
              cursor: pointer;
              border: none;
              background-color: #f5ce11;
              color: white;
              padding: 10px;
              border-radius: 50%;
              margin: 20px;
              width: 60px;
              height: 60px;
            `
          )} ck-popup-button`}
          onClick={() => setPopupOpen(!popupOpen)}
        >
          {hasUnread ? (
            <MdMarkChatUnread
              className={css`
                font-size: 40px;
                transform: translateY(3px);
                animation: ${blink} 1.2s infinite;
              `}
            />
          ) : (
            <MdChatBubble
              className={css`
                font-size: 40px;
                transform: translateY(3px);
              `}
            />
          )}
        </button>
      )}
    </div>
  );
};

export default Popup;
