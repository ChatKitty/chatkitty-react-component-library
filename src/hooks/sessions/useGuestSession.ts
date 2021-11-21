import type {
  ChatKittyError,
  ChatKittyFailedResult,
  StartSessionResult,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import { useEffect } from "react";
import useResourceState from "../useResourceState";

const useGuestSession = (
  client: ChatKitty,
  username: string
): {
  isLoading: boolean;
  error?: ChatKittyError;
} => {
  const { isLoading, error, setIsLoading, setError } = useResourceState({
    defaultIsLoading: true,
  });

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result: StartSessionResult = await client.startSession({
        username,
      });

      if (result.succeeded) {
        // succeeded
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
  };
};

export default useGuestSession;
