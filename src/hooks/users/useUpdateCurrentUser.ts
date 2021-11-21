import type {
  ChatKittyError,
  ChatKittyFailedResult,
  CurrentUser,
  UpdateCurrentUserResult,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import useResourceState from "../useResourceState";

const useUpdateCurrentUser = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  makeRequest: (update: (user: CurrentUser) => CurrentUser) => void;
} => {
  const { isLoading, error, setIsLoading, setError } = useResourceState();

  const makeRequest = async (update: (user: CurrentUser) => CurrentUser) => {
    setIsLoading(true);

    const result: UpdateCurrentUserResult = await client.updateCurrentUser(
      update
    );

    if (result.succeeded) {
      // empty response
    }

    if (result.failed) {
      setError((result as ChatKittyFailedResult).error);
    }

    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    makeRequest,
  };
};

export default useUpdateCurrentUser;
