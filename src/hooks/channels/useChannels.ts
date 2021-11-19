import ChatKitty, {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetChannelsFilter,
  GetChannelsSucceededResult,
  succeeded,
} from "chatkitty";
import { useEffect } from "react";
import useResourceState from "../useResourceState";

const useChannels = (
  client: ChatKitty,
  filter?: GetChannelsFilter
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Channel[];
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Channel[]>();

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result = await client.getChannels({ filter });

      if (succeeded<GetChannelsSucceededResult>(result)) {
        setResource(result.paginator.items);
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

export default useChannels;
