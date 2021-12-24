import type {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  ChatKittyPaginator,
  GetMessagesSucceededResult,
  Message,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useResourceState from "../useResourceState";

const useMessages = (
  client: ChatKitty,
  channel: Channel
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Message[];
  paginator?: ChatKittyPaginator<Message>;
  setResource: Dispatch<SetStateAction<Message[] | undefined>>;
  makeRequest: () => void;
} => {
  const [paginator, setPaginator] = useState<ChatKittyPaginator<Message>>();
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Message[]>();

  const makeRequest = async () => {
    setIsLoading(true);

    const result = await client.getMessages({
      channel,
    });

    if (result.succeeded) {
      const casted = result as GetMessagesSucceededResult;
      setPaginator(casted.paginator);
      setResource(casted.paginator.items);
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
    paginator,
    makeRequest,
  };
};

export default useMessages;
