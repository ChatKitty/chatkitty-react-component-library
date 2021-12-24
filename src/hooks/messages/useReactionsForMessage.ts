import type {
  ChatKittyError,
  ChatKittyFailedResult,
  GetReactionsSucceededResult,
  Message,
  Reaction,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import useResourceState from "../useResourceState";

const useReactionsForMessage = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Reaction[];
  makeRequest: (message: Message) => Promise<void>;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Reaction[]>();

  const makeRequest = async (message: Message) => {
    setIsLoading(true);

    const result = await client.getReactions({ message });

    if (result.succeeded) {
      setResource((result as GetReactionsSucceededResult).paginator.items);
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

export default useReactionsForMessage;
