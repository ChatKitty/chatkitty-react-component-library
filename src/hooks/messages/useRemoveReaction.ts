import ChatKitty, {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  Message,
  RemovedReactionResult,
  Reaction,
  succeeded,
} from "chatkitty";
import useResourceState from "../useResourceState";

const useRemoveReaction = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Reaction;
  makeRequest: (message: Message, emoji: string) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Reaction>();

  const makeRequest = async (message: Message, emoji: string) => {
    setIsLoading(true);

    const result = await client.removeReaction({ message, emoji });

    if (succeeded<RemovedReactionResult>(result)) {
      setResource(result.reaction);
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

export default useRemoveReaction;
