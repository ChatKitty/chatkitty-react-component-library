import ChatKitty, {
  ChatKittyError,
  ChatKittyFailedResult,
  CurrentUser,
  failed,
  succeeded,
  UpdateCurrentUserResult,
} from "chatkitty";
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

    const result = await client.updateCurrentUser(update);

    if (succeeded<UpdateCurrentUserResult>(result)) {
      // empty response
    }

    if (failed<ChatKittyFailedResult>(result)) {
      setError(result.error);
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
