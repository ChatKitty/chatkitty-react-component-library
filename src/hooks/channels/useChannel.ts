import ChatKitty, {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetChannelSucceededResult,
  succeeded,
} from "chatkitty";
import { useEffect } from "react";
import useResourceState from "../useResourceState";

const useChannel = (
  client: ChatKitty,
  id: number
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Channel;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Channel>();

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result = await client.getChannel(id);

      if (succeeded<GetChannelSucceededResult>(result)) {
        setResource(result.channel);
      }

      if (failed<ChatKittyFailedResult>(result)) {
        setError(result.error);
      }

      setIsLoading(false);
    };

    makeRequest();
  }, []);

  return {
    isLoading,
    error,
    resource,
  };
};

export default useChannel;
