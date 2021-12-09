import type {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  GetChannelsSucceededResult,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import { useEffect } from "react";
import useResourceState from "../useResourceState";

const useJoinedChannels = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Channel[];
  makeRequest: () => Promise<void>;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Channel[]>();

  const makeRequest = async () => {
    setIsLoading(true);

    const result = await client.getChannels({
      filter: { joined: true },
    });

    if (result.succeeded) {
      const channels = (result as GetChannelsSucceededResult).paginator.items;
      channels.sort();
      setResource(channels);
    }

    if (result.failed) {
      setError((result as ChatKittyFailedResult).error);
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
    makeRequest,
  };
};

export default useJoinedChannels;
