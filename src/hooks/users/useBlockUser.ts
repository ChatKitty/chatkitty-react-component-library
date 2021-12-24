import type {
  BlockUserSucceededResult,
  ChatKittyError,
  ChatKittyFailedResult,
  User,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import useResourceState from "../useResourceState";

const useBlockUser = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: User;
  makeRequest: (user: User) => Promise<void>;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<User>();

  const makeRequest = async (user: User) => {
    setIsLoading(true);

    const result = await client.blockUser({
      user,
    });

    if (result.succeeded) {
      setResource((result as BlockUserSucceededResult).user);
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

export default useBlockUser;
