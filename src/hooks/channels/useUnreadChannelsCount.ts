import ChatKitty, {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetCountSucceedResult,
  GetUnreadChannelsFilter,
  succeeded,
} from "chatkitty";
import { useEffect } from "react";
import useResourceState from "../useResourceState";

const useUnreadChannelsCount = (
  client: ChatKitty,
  filter: GetUnreadChannelsFilter
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: number;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<number>();

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result = await client.getUnreadChannelsCount({ filter });

      if (succeeded<GetCountSucceedResult>(result)) {
        setResource(result.count);
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

export default useUnreadChannelsCount;
