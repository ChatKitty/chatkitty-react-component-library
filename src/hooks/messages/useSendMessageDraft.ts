import ChatKitty, {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  Message,
  SentMessageResult,
  succeeded,
} from "chatkitty";
import useResourceState from "../useResourceState";

const useSendMessageDraft = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Message;
  makeRequest: (channel: Channel, draft: string) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Message>();

  const makeRequest = async (channel: Channel, draft: string) => {
    setIsLoading(true);

    const result = await client.sendMessage({
      channel: channel,
      body: draft,
    });

    if (succeeded<SentMessageResult>(result)) {
      setResource(result.message);
    }

    if (failed<ChatKittyFailedResult>(result)) {
      console.log(result.error);
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

export default useSendMessageDraft;
