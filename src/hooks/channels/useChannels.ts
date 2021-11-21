import type {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  GetChannelsFilter,
  GetChannelsSucceededResult,
} from "chatkitty";
import type ChatKitty from "chatkitty";
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

      if (result.succeeded) {
        setResource((result as GetChannelsSucceededResult).paginator.items);
      }

      if (result.failed) {
        setError((result as ChatKittyFailedResult).error);
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
