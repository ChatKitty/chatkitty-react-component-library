import ChatKitty, {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetReactionsSucceededResult,
  Message,
  Reaction,
  succeeded,
} from "chatkitty";
import useResourceState from "../useResourceState";

const useReactionsForMessage = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Reaction[];
  makeRequest: (message: Message) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Reaction[]>();

  const makeRequest = async (message: Message) => {
    setIsLoading(true);

    const result = await client.getReactions({ message });

    if (succeeded<GetReactionsSucceededResult>(result)) {
      setResource(result.paginator.items);
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

export default useReactionsForMessage;
