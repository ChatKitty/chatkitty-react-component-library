import type {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  GetChannelsSucceededResult,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import { useEffect } from "react";
import useResourceState from "../useResourceState";

const useJoinableChannels = (
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
      filter: { joined: false },
    });

    if (result.succeeded) {
      setResource((result as GetChannelsSucceededResult).paginator.items);
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

export default useJoinableChannels;
