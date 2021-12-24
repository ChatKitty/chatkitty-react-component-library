import type {
  ChatKittyError,
  ChatKittyFailedResult,
  GetUsersSucceededResult,
  User,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import { useEffect } from "react";
import useResourceState from "../useResourceState";

const useUsers = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: User[];
  makeRequest: () => Promise<void>;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<User[]>();

  const makeRequest = async () => {
    setIsLoading(true);

    const result = await client.getUsers();

    if (result.succeeded) {
      setResource((result as GetUsersSucceededResult).paginator.items);
    }

    if (result.failed) {
      setError((result as ChatKittyFailedResult).error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    makeRequest();
  }, []);

  return {
    isLoading,
    error,
    resource,
    makeRequest,
  };
};

export default useUsers;
