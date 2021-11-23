import React from "react";
import { css, cx, keyframes } from "@emotion/css";

const spin = keyframes`
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`;

export default () => {
  return (
    <div
      className={`${cx(
        css`
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        `
      )} ck-spinner-container`}
    >
      <div
        className={`${cx(
          css`
            display: inline-block;
            position: relative;
            width: 80px;
            height: 80px;
          `
        )} ck-spinner`}
      >
        <div
          className={css`
            position: absolute;
            border: 4px solid black;
            opacity: 1;
            border-radius: 50%;
            animation: ${spin} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
          `}
        ></div>
        <div
          className={css`
            position: absolute;
            border: 4px solid black;
            opacity: 1;
            border-radius: 50%;
            animation: ${spin} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
            animation-delay: -0.5s;
          `}
        ></div>
      </div>
    </div>
  );
};
