import type {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  GetChannelUnreadSucceededResult,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import { useEffect } from "react";
import useResourceState from "../useResourceState";

const useChannelUnread = (
  client: ChatKitty,
  channel: Channel
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: boolean;
  makeRequest: () => Promise<void>;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<boolean>();

  const makeRequest = async () => {
    setIsLoading(true);

    const result = await client.getChannelUnread({
      channel,
    });

    if (result.succeeded) {
      setResource((result as GetChannelUnreadSucceededResult).unread);
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

export default useChannelUnread;
