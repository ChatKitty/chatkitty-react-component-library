import type {
  ChatKittyError,
  ChatKittyFailedResult,
  GetCountSucceedResult,
  GetUnreadChannelsFilter,
} from "chatkitty";
import type ChatKitty from "chatkitty";
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

      if (result.succeeded) {
        setResource((result as GetCountSucceedResult).count);
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

export default useUnreadChannelsCount;
