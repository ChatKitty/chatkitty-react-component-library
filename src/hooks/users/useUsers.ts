import ChatKitty, {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetUsersSucceededResult,
  succeeded,
  User,
} from "chatkitty";
import { useEffect } from "react";
import useResourceState from "../useResourceState";

const useUsers = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: User[];
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<User[]>();

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result = await client.getUsers();

      if (succeeded<GetUsersSucceededResult>(result)) {
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

export default useUsers;
