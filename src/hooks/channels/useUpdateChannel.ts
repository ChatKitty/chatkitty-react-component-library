import ChatKitty, {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  succeeded,
  UpdatedChannelResult,
} from "chatkitty";
import useResourceState from "../useResourceState";

const useUpdateChannel = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Channel;
  makeRequest: (channel: Channel) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Channel>();

  const makeRequest = async (channel: Channel) => {
    setIsLoading(true);

    const result = await client.updateChannel({ channel });

    if (succeeded<UpdatedChannelResult>(result)) {
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

export default useUpdateChannel;
