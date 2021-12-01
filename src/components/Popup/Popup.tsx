import React from "react";
import { css, cx } from "@emotion/css";
import { MdChatBubble } from "react-icons/md";

export interface PopupProps {
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const Popup = ({ icon, children }: PopupProps) => {
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
          <MdChatBubble
            style={{ fontSize: 40, transform: "translateY(3px)" }}
          />
        </button>
      )}
    </div>
  );
};

export default Popup;
