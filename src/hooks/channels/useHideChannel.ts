import type {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  DirectChannel,
  HideChannelSucceededResult,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import useResourceState from "../useResourceState";

const useHideChannel = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Channel;
  makeRequest: (channel: DirectChannel) => Promise<void>;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Channel>();

  const makeRequest = async (channel: DirectChannel) => {
    setIsLoading(true);

    const result = await client.hideChannel({ channel });

    if (result.succeeded) {
      setResource((result as HideChannelSucceededResult).channel);
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

export default useHideChannel;
