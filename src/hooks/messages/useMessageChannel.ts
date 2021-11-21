import type {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  GetMessageChannelSucceededResult,
  Message,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import useResourceState from "../useResourceState";

const useMessageChannel = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Channel;
  makeRequest: (message: Message) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Channel>();

  const makeRequest = async (message: Message) => {
    setIsLoading(true);

    const result = await client.getMessageChannel({ message });

    if (result.succeeded) {
      setResource((result as GetMessageChannelSucceededResult).channel);
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

export default useMessageChannel;
