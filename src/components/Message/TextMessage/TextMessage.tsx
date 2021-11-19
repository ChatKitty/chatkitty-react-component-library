import React from "react";

export interface TextMessageProps {
  /**
   * absolute url for display picture
   */
  displayPictureUrl: string;

  /**
   * message sender display name
   */
  displayName: string;

  /**
   * time display for message
   */
  createdTime: string;

  /**
   * main message content
   */
  body: string;
}

const TextMessage = ({
  displayPictureUrl,
  displayName,
  createdTime,
  body,
}: TextMessageProps) => {
  return (
    <li className="ck-textMessage">
      <img className="ck-textMessage-image" src={displayPictureUrl} />
      <div>
        <h2 className="ck-textMessage-name">
          {displayName}
          <span className="ck-textMessage-time">{createdTime}</span>
        </h2>
        <div>
          <div className="ck-textMessage-body">{body}</div>
        </div>
      </div>
    </li>
  );
};

export default TextMessage;
