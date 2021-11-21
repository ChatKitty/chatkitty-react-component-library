import React from "react";
import ReactDOM from "react-dom";
import type { Channel } from "chatkitty";
import type ChatKitty from "chatkitty";
import { ChatKittyProvider, ChatWindow } from ".";
import "./themes/default.css";

const init = (id: string, client: ChatKitty, channel: Channel) => {
  ReactDOM.render(
    <ChatKittyProvider client={client} channel={channel}>
      <ChatWindow />
    </ChatKittyProvider>,
    document.getElementById(id)
  );
};

export { init };
