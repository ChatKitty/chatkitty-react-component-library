import type {
  ChatKittyError,
  ChatKittyFailedResult,
  ChatSession,
  StartChatSessionRequest,
  StartedChatSessionResult,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import useResourceState from "../useResourceState";

const useChatSession = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: ChatSession;
  makeRequest: (params: StartChatSessionRequest) => ChatSession;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<ChatSession>();

  const makeRequest = ({
    channel,
    onReceivedMessage,
    onTypingStarted,
    onTypingStopped,
  }: StartChatSessionRequest) => {
    setIsLoading(true);

    const result = client.startChatSession({
      channel,
      onReceivedMessage,
      onTypingStarted,
      onTypingStopped,
    });

    setIsLoading(false);

    if (result.succeeded) {
      setResource((result as StartedChatSessionResult).session);
    }

    if (result.failed) {
      setError((result as unknown as ChatKittyFailedResult).error);
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
