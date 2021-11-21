import type {
  ChatKittyError,
  ChatKittyFailedResult,
  GetUserBlockListSucceededResult,
  UserBlockListItem,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import { useEffect } from "react";
import useResourceState from "../useResourceState";

const useCurrentUserBlockList = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: UserBlockListItem[];
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<UserBlockListItem[]>();

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result = await client.getUserBlockList();

      if (result.succeeded) {
        setResource(
          (result as GetUserBlockListSucceededResult).paginator.items
        );
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

export default useCurrentUserBlockList;
