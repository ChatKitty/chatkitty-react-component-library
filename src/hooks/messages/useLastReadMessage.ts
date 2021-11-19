import ChatKitty, {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetLastReadMessageResult,
  Message,
  succeeded,
} from "chatkitty";
import useResourceState from "../useResourceState";

const useLastReadMessage = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Message;
  makeRequest: (channel: Channel, username: string) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Message>();

  const makeRequest = async (channel: Channel, username: string) => {
    setIsLoading(true);

    const result = await client.getLastReadMessage({ channel, username });

    if (succeeded<GetLastReadMessageResult>(result)) {
      setResource(result.message);
    }

    if (failed<ChatKittyFailedResult>(result)) {
      setError(result.error);
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
