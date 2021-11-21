import type {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  GetMessagesSucceededResult,
  Message,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import { Dispatch, SetStateAction, useEffect } from "react";
import useResourceState from "../useResourceState";

const useMessages = (
  client: ChatKitty,
  channel: Channel
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Message[];
  setResource: Dispatch<SetStateAction<Message[] | undefined>>;
  makeRequest: (channel: Channel) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Message[]>();

  const makeRequest = async () => {
    setIsLoading(true);

    const result = await client.getMessages({
      channel,
    });

    if (result.succeeded) {
      setResource((result as GetMessagesSucceededResult).paginator.items);
    }

    if (result.failed) {
      setError((result as ChatKittyFailedResult).error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    makeRequest();
  }, [client, channel]);

  return {
    isLoading,
    error,
    resource,
    setResource,
    makeRequest,
  };
};

export default useMessages;
