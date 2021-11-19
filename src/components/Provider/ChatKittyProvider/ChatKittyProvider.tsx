import React from "react";

export interface ChatKittyProviderProps {
  children?: React.ReactNode;
}

export const ChatKittyContext = React.createContext({});

const ChatKittyProvider = ({ children }: ChatKittyProviderProps) => {
  return (
    <ChatKittyContext.Provider value={{}}>{children}</ChatKittyContext.Provider>
  );
};

export default ChatKittyProvider;
