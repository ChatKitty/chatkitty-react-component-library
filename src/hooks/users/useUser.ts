import type {
  ChatKittyError,
  ChatKittyFailedResult,
  GetUserSucceededResult,
  User,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import useResourceState from "../useResourceState";

const useUser = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: User;
  makeRequest: (id: number) => Promise<void>;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<User>();

  const makeRequest = async (id: number) => {
    setIsLoading(true);

    const result = await client.getUser(id);

    if (result.succeeded) {
      setResource((result as GetUserSucceededResult).user);
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

export default useUser;
