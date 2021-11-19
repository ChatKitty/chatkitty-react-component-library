import ChatKitty, {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  ChatKittyUserReference,
  CreatedChannelResult,
  failed,
  succeeded,
} from "chatkitty";
import useResourceState from "../useResourceState";

const useCreateChannel = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Channel;
  makeRequest: ({
    type,
    members,
    name,
  }: {
    type: string;
    members?: ChatKittyUserReference[];
    name?: string;
  }) => Promise<Channel | undefined>;
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

    if (succeeded<CreatedChannelResult>(result)) {
      setResource(result.channel);
      return result.channel;
    }

    if (failed<ChatKittyFailedResult>(result)) {
      setError(result.error);
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
