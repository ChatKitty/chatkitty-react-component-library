import type {
  ChatKittyError,
  ChatKittyFailedResult,
  GetUserSucceededResult,
  User,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import { useEffect } from "react";
import useResourceState from "../useResourceState";

const useUser = (
  client: ChatKitty,
  param: number
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: User;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<User>();

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result = await client.getUser(param);

      if (result.succeeded) {
        setResource((result as GetUserSucceededResult).user);
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

export default useUser;
