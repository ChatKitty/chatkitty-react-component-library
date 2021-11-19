import ChatKitty, {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  ChatSession,
  failed,
  Message,
  StartedChatSessionResult,
  succeeded,
} from "chatkitty";
import useResourceState from "../useResourceState";

const useChatSession = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: ChatSession;
  makeRequest: (
    channel: Channel,
    onReceivedMessage: (message: Message) => void
  ) => ChatSession;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<ChatSession>();

  const makeRequest = (
    channel: Channel,
    onReceivedMessage: (message: Message) => void
  ) => {
    setIsLoading(true);

    const result = client.startChatSession({ channel, onReceivedMessage });

    setIsLoading(false);

    if (succeeded<StartedChatSessionResult>(result)) {
      setResource(result.session);
    }

    if (failed<ChatKittyFailedResult>(result)) {
      setError(result.error);
    }

    return result.session;
  };

  return {
    isLoading,
    error,
    resource,
    makeRequest,
  };
};

export default useChatSession;
