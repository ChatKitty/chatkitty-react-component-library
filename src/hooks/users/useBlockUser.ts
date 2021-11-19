import ChatKitty, {
  BlockUserSucceededResult,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  succeeded,
  User,
} from "chatkitty";
import useResourceState from "../useResourceState";

const useBlockUser = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: User;
  makeRequest: (user: User) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<User>();

  const makeRequest = async (user: User) => {
    setIsLoading(true);

    const result = await client.blockUser({
      user,
    });

    if (succeeded<BlockUserSucceededResult>(result)) {
      setResource(result.user);
    }

    if (failed<ChatKittyFailedResult>(result)) {
      setError(result.error);
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

export default useBlockUser;
