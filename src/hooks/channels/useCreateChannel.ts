import type {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  ChatKittyUserReference,
  CreatedChannelResult,
  CreateChannelRequest,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import useResourceState from "../useResourceState";

const useCreateChannel = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Channel;
  makeRequest: (params: CreateChannelRequest) => Promise<void>;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Channel>();

  const makeRequest = async ({
    type,
    members,
    name,
  }: {
    type: string;
    members?: ChatKittyUserReference[];
    name?: string;
  }) => {
    setIsLoading(true);

    const result = await client.createChannel({ members, name, type });

    setIsLoading(false);

    if (result.succeeded) {
      setResource((result as CreatedChannelResult).channel);
    }

    if (result.failed) {
      setError((result as ChatKittyFailedResult).error);
    }
  };

  return {
    isLoading,
    error,
    resource,
    makeRequest,
  };
};

export default useCreateChannel;
