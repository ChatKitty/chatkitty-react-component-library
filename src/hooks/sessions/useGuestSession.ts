import ChatKitty, {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  StartSessionResult,
  succeeded,
} from "chatkitty";
import { useEffect } from "react";
import useResourceState from "../useResourceState";

const demoUsers = [
  "b2a6da08-88bf-4778-b993-7234e6d8a3ff",
  "c6f75947-af48-4893-a78e-0e0b9bd68580",
  "abc4264d-f1b1-41c0-b4cc-1e9daadfc893",
  "2989c53a-d0c5-4222-af8d-fbf7b0c74ec6",
  "8fadc920-f3e6-49ff-9398-1e58b3dc44dd",
];

const useGuestSession = (
  client: ChatKitty,
  username = demoUsers[Math.floor(Math.random() * demoUsers.length)]
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

      const result = await client.startSession({
        username,
      });

      if (succeeded<StartSessionResult>(result)) {
        // succeeded
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
  };
};

export default useGuestSession;
