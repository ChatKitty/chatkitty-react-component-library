import type {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  Message,
  SentMessageResult,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import useResourceState from "../useResourceState";

const useSendMessageDraft = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Message;
  makeRequest: (channel: Channel, draft: string) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Message>();

  const makeRequest = async (channel: Channel, draft: string) => {
    setIsLoading(true);

    const result = await client.sendMessage({
      channel: channel,
      body: draft,
    });

    if (result.succeeded) {
      setResource((result as SentMessageResult).message);
    }

    if (result.failed) {
      setError((result as ChatKittyFailedResult).error);
    }

    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    resource,
    makeRequest,
  };
};

export default useSendMessageDraft;
