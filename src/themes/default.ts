export type ChatKittyTheme = {
  chat: {
    container: string;
  };
  chatDrawer: {
    container: string;
    button: string;
  };
  channelHeader: {
    container: string;
    title: string;
    description: string;
    action: string;
  };
  messageList: {
    container: string;
  };
  typingIndicator: {
    container: string;
  };
  messageInput: {
    container: string;
    text: string;
    button: string;
  };
  textMessage: {
    container: string;
    image: string;
    name: string;
    time: string;
    body: string;
    message: string;
  };
  userDisplay: {
    container: string;
    image: string;
    displayName: string;
    onlineIndicator: string;
    offlineIndicator: string;
  };
};

const utility = {
  scroll: `
    scrollbar-width: thin;
    scrollbar-color: transparent;
    
    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background-color: lightgray;
      border-radius: 15px;
      border: 3px solid rgba(0, 0, 0, 0);
    }
  `,
};

export const defaultTheme: ChatKittyTheme = {
  chat: {
    container: `
      border-radius: 10px;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      overflow: auto;
      box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
    `,
  },
  chatDrawer: {
    container: `
      display: flex;
      flex-direction: column;
      overflow: auto;
      width: 100%;
      height: 100%;
    `,
    button: `
      cursor: pointer;
      border: none;
      background: none;
      position: absolute;
      top: 13px;
      right: 25px;
      color: lightgray;
      font-size: 30px;
    `,
  },
  channelHeader: {
    container: `
      font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
      padding: 8px 20px;
      background-color: #f2f2f2;
      box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
    `,
    title: `
      font-size: 1.2rem;
      margin: 0;
      padding: 0;
    `,
    description: `
      font-size: 1rem;
      margin: 0;
      padding: 0;
    `,
    action: `
      cursor: pointer;
      border: none;
      background: none;
      position: absolute;
      top: 13px;
      right: 25px;
      color: lightgray;
      font-size: 30px;
    `,
  },

  messageList: {
    container: `
      display: flex;
      flex-direction: column-reverse;
      padding: 8px;
      padding-right: 12px;
      overflow-y: auto;
      margin: 0;

      ${utility.scroll}
    `,
  },

  typingIndicator: {
    container: `
      margin: 0;
      padding: 8px 12px;
      box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
      font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    `,
  },

  messageInput: {
    container: `
      position: relative;
      display: flex;
      width: 100%;
    `,
    text: `
      flex: 1;
      font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
      padding: 16px;
      padding-right: 40px;
      border: none;
      border-top: 3px solid #f2f2f2;
      resize: none;
      font-size: 1em;
    `,
    button: `
      cursor: pointer;
      position: absolute;
      right: 0;
      height: 100%;
      width: 40px;
      background-color: transparent;
      font-size: 2rem;
      color: lightgray;
      border: none;
    `,
  },

  textMessage: {
    container: `
      display: flex;
      align-items: flex-start;
      font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
      padding: 8px;
      max-width: 100%;
    `,
    image: `
      height: 3rem;
      width: 3rem;
      border-radius: 10px;
      margin-right: 20px;
      margin-top: 14px;
    `,
    name: `
      font-size: 1.2rem;
      font-weight: 600;
      margin: 0;
    `,
    time: `
      padding-left: 1rem;
      font-size: 0.8rem;
      font-weight: 100;
    `,
    body: `
      flex: 1;
    `,
    message: `
      margin-top: 12px;
      word-break: break-word;
    `,
  },

  userDisplay: {
    container: `
      display: flex;
      align-items: center;
      box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
    `,
    image: `
      height: 2.5rem;
      width: 2.5rem;
      border-radius: 50%;
      padding: 10px;
    `,
    displayName: `
      display: flex;
      align-items: center;
      font-size: 1.4rem;
      padding: 10px;
      font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    `,
    onlineIndicator: `
      display: inline-block;
      background-color: rgba(16,185,129,1);
      border-radius: 50%;
      width: 0.5rem;
      height: 0.5rem;
      margin-left: 0.5rem;
    `,
    offlineIndicator: `
      display: inline-block;
      background-color: lightgray;
      border-radius: 50%;
      width: 0.5rem;
      height: 0.5rem;
      margin-left: 0.5rem;
    `,
  },
};
