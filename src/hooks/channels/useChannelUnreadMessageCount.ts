import type {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  GetCountSucceedResult,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import { useEffect } from "react";
import useResourceState from "../useResourceState";

const useChannelUnreadMessageCount = (
  client: ChatKitty,
  channel: Channel
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: number;
  makeRequest: () => Promise<void>;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<number>();

  const makeRequest = async () => {
    setIsLoading(true);

    const result = await client.getUnreadMessagesCount({
      channel,
    });

    if (result.succeeded) {
      setResource((result as GetCountSucceedResult).count);
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

export default useChannelUnreadMessageCount;
