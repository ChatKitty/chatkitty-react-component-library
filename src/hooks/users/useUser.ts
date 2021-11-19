import ChatKitty, {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetUserSucceededResult,
  succeeded,
  User,
} from "chatkitty";
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

      if (succeeded<GetUserSucceededResult>(result)) {
        setResource(result.user);
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

export default useUser;
