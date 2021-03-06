export type ChatKittyTheme = {
  chat: {
    container: string;
  };
  chatDrawer: {
    container: string;
    button: string;
  };
  channelList: {
    container: string;
    heading: string;
  };
  channelListItem: {
    image: string;
    body: string;
    container: string;
    title: string;
    description: string;
  };
  channelHeader: {
    container: string;
    action: string;
    content: string;
    title: string;
    description: string;
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
    emojiPicker: string;
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
  emojiInput: {
    container: string;
    iconButton: string;
    popover: string;
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
      justify-content: flex-start;
      overflow: auto;
      box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
    `,
  },

  chatDrawer: {
    container: `
      position: relative;
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
      right: 13px;
      color: lightgray;
      font-size: 30px;
    `,
  },

  channelList: {
    container: `
      padding: 20px;
    `,
    heading: `
      font-size: 1.3rem;
      font-weight: 500;
      margin: 0;
      padding-left: 10px;
      padding-right: 10px;
      margin-bottom: 10px;
    `,
  },

  channelListItem: {
    container: `
      padding: 10px;
      list-style-type: none;
      border-bottom: 1px solid #f2f2f2;
      cursor: pointer;
      display: flex;

      &:hover {
        background-color: #f2f2f2;
      }
    `,
    image: `
      height: 2.5rem;
      width: 2.5rem;
      border-radius: 50%;
      margin-right: 10px;
    `,
    body: `
      display: flex;
      flex-direction: column;
    `,
    title: `
      font-size: 1.2rem;
      font-weight: 400;
      margin: 0;
      padding: 0;
    `,
    description: `
      margin: 0;
      padding: 0;
      margin-top: 12px;
      color: #404040;
    `,
  },

  channelHeader: {
    container: `
      display: flex;
      padding: 8px;
      background-color: #f2f2f2;
      box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
    `,
    action: `
      cursor: pointer;
      border: none;
      background: none;
      color: lightgray;
      font-size: 30px;
      padding: 0;
    `,
    content: `
      padding: 0 10px;
      display: flex;
      flex-direction: column;
    `,
    title: `
      font-size: 1.3rem;
      margin: 0;
      padding: 0;
      font-weight: 500;
    `,
    description: `
      font-size: 1rem;
      margin: 0;
      padding: 0;
      font-weight: 400;
      color: #404040;
    `,
  },

  messageList: {
    container: `
      flex: 1;
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
    `,
  },

  messageInput: {
    container: `
      position: relative;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
    `,
    text: `
      flex: 1;
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
    emojiPicker: `
      cursor: pointer;
      position: absolute;
      height: calc(100% - 10px);
      right: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 10px;
    `,
  },

  textMessage: {
    container: `
      display: flex;
      align-items: flex-start;
      padding: 8px;
      max-width: 100%;
    `,
    image: `
      height: 3rem;
      width: 3rem;
      border-radius: 10px;
      margin-right: 20px;
    `,
    name: `
      font-size: 1.2rem;
      font-weight: 400;
      margin: 0;
    `,
    time: `
      padding-left: 1rem;
      font-size: 0.8rem;
    `,
    body: `
      flex: 1;
    `,
    message: `
      margin-top: 12px;
      word-break: break-word;
      font-weight: 400;
      color: #404040;
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

  emojiInput: {
    container: `
      position: relative;
    `,
    iconButton: `
      cursor: pointer;
      border: none;
      background: none;
      font-size: 1.5rem;
      color: lightgray;
    `,
    popover: `
      position: absolute;
      z-index: 1000;
    `,
  },
};
