import type {
  ChatKittyError,
  ChatKittyFailedResult,
  CurrentUser,
  GetCurrentUserSuccessfulResult,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import { Dispatch, SetStateAction, useEffect } from "react";
import useResourceState from "../useResourceState";

const useCurrentUser = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: CurrentUser;
  setResource: Dispatch<SetStateAction<CurrentUser | undefined>>;
  makeRequest: () => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<CurrentUser>();

  const makeRequest = async () => {
    setIsLoading(true);

    const result = await client.getCurrentUser();

    if (result.succeeded) {
      setResource((result as GetCurrentUserSuccessfulResult).user);
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
    setResource,
    makeRequest,
  };
};

export default useCurrentUser;
