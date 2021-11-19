import React from "react";
import { useChatContext } from "../../..";

export interface ChannelHeaderProps {}

const ChannelHeader = ({}: ChannelHeaderProps) => {
  const { channel } = useChatContext();

  return (
    <div className="ck-channelHeader">
      <h1 className="ck-channelHeader-title">#{channel.name}</h1>
      <p className="ck-channelHeader-description">
        {(channel.properties as { description: string }).description}
      </p>
    </div>
  );
};

export default ChannelHeader;
