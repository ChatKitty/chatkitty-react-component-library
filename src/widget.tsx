import React from "react";
import ReactDOM from "react-dom";
import type { Channel } from "chatkitty";
import type ChatKitty from "chatkitty";
import { ChatKittyProvider, CKChat } from ".";

const init = (id: string, client: ChatKitty, channel: Channel) => {
  ReactDOM.render(
    <ChatKittyProvider client={client} channels={[channel]}>
      <CKChat />
    </ChatKittyProvider>,
    document.getElementById(id)
  );
};

export { init };
