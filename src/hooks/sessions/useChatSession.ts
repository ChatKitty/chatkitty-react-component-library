import type {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  ChatSession,
  Message,
  StartedChatSessionResult,
  User,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import useResourceState from "../useResourceState";

const useChatSession = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: ChatSession;
  makeRequest: (
    channel: Channel,
    onReceivedMessage?: (message: Message) => void,
    onTypingStarted?: (user: User) => void,
    onTypingStopped?: (user: User) => void
  ) => ChatSession;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<ChatSession>();

  const makeRequest = (
    channel: Channel,
    onReceivedMessage?: (message: Message) => void,
    onTypingStarted?: (user: User) => void,
    onTypingStopped?: (user: User) => void
  ) => {
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
