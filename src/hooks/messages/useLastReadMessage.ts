import type {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  GetLastReadMessageResult,
  Message,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import useResourceState from "../useResourceState";

const useLastReadMessage = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Message;
  makeRequest: (channel: Channel, username: string) => Promise<void>;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Message>();

  const makeRequest = async (channel: Channel, username: string) => {
    setIsLoading(true);

    const result = await client.getLastReadMessage({ channel, username });

    if (result.succeeded) {
      setResource((result as GetLastReadMessageResult).message);
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

export default useLastReadMessage;
