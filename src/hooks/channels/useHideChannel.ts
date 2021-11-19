import ChatKitty, {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  DirectChannel,
  failed,
  HideChannelSucceededResult,
  succeeded,
} from "chatkitty";
import useResourceState from "../useResourceState";

const useHideChannel = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Channel;
  makeRequest: (channel: DirectChannel) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Channel>();

  const makeRequest = async (channel: DirectChannel) => {
    setIsLoading(true);

    const result = await client.hideChannel({ channel });

    if (succeeded<HideChannelSucceededResult>(result)) {
      setResource(result.channel);
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

export default useHideChannel;
