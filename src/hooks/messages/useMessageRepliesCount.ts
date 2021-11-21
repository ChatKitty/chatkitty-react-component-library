import type {
  ChatKittyError,
  ChatKittyFailedResult,
  GetCountSucceedResult,
  Message,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import useResourceState from "../useResourceState";

const useMessageRepliesCount = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: number;
  makeRequest: (message: Message) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<number>();

  const makeRequest = async (message: Message) => {
    setIsLoading(true);

    const result = await client.getMessageRepliesCount({ message });

    if (result.succeeded) {
      setResource((result as GetCountSucceedResult).count);
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

export default useMessageRepliesCount;
