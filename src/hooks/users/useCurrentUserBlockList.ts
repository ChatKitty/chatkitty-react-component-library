import ChatKitty, {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetUserBlockListSucceededResult,
  succeeded,
  UserBlockListItem,
} from "chatkitty";
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

      if (succeeded<GetUserBlockListSucceededResult>(result)) {
        setResource(result.paginator.items);
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

export default useCurrentUserBlockList;
