import type {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  GetChannelSucceededResult,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import { useEffect } from "react";
import useResourceState from "../useResourceState";

const useChannel = (
  client: ChatKitty,
  id: number
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Channel;
  makeRequest: () => Promise<void>;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Channel>();

  const makeRequest = async () => {
    setIsLoading(true);

    const result = await client.getChannel(id);

    if (result.succeeded) {
      setResource((result as GetChannelSucceededResult).channel);
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

export default useChannel;
