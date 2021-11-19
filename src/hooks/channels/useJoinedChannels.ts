import ChatKitty, {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetChannelsSucceededResult,
  succeeded,
} from "chatkitty";
import { useEffect } from "react";
import useResourceState from "../useResourceState";

const useJoinedChannels = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Channel[];
  setResource: React.Dispatch<React.SetStateAction<Channel[] | undefined>>;
  makeRequest: () => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Channel[]>();

  const makeRequest = async () => {
    setIsLoading(true);

    const result = await client.getChannels({
      filter: { joined: true },
    });

    if (succeeded<GetChannelsSucceededResult>(result)) {
      const channels = result.paginator.items;
      channels.sort();
      setResource(channels);
    }

    if (failed<ChatKittyFailedResult>(result)) {
      setError(result.error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    makeRequest();
  }, []);

  return {
    isLoading,
    error,
    resource,
    setResource,
    makeRequest,
  };
};

export default useJoinedChannels;
