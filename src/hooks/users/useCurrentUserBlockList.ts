import type {
  ChatKittyError,
  ChatKittyFailedResult,
  GetUserBlockListSucceededResult,
  UserBlockListItem,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import useResourceState from "../useResourceState";

const useCurrentUserBlockList = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: UserBlockListItem[];
  makeRequest: () => Promise<void>;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<UserBlockListItem[]>();

  const makeRequest = async () => {
    setIsLoading(true);

    const result = await client.getUserBlockList();

    if (result.succeeded) {
      setResource((result as GetUserBlockListSucceededResult).paginator.items);
    }

    if (result.failed) {
      setError((result as ChatKittyFailedResult).error);
    }

    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    resource,
    makeRequest,
  };
};

export default useCurrentUserBlockList;
