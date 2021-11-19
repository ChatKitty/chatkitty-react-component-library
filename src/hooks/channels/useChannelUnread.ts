import ChatKitty, {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetChannelUnreadSucceededResult,
  succeeded,
} from "chatkitty";
import { useEffect } from "react";
import useResourceState from "../useResourceState";

const useChannelUnread = (
  client: ChatKitty,
  channel: Channel
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: boolean;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<boolean>();

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result = await client.getChannelUnread({
        channel,
      });

      if (succeeded<GetChannelUnreadSucceededResult>(result)) {
        setResource(result.unread);
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

export default useChannelUnread;
