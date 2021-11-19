import ChatKitty, {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetCountSucceedResult,
  Message,
  succeeded,
} from "chatkitty";
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

    if (succeeded<GetCountSucceedResult>(result)) {
      setResource(result.count);
    }

    if (failed<ChatKittyFailedResult>(result)) {
      setError(result.error);
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
