import type ChatKitty from "chatkitty";
import useResourceState from "../useResourceState";

const useEndSession = (
  client: ChatKitty
): {
  isLoading: boolean;
  makeRequest: () => Promise<void>;
} => {
  const { isLoading, setIsLoading } = useResourceState();

  const makeRequest = async () => {
    setIsLoading(true);

    await client.endSession();

    setIsLoading(false);
  };

  return {
    isLoading,
    makeRequest,
  };
};

export default useEndSession;
