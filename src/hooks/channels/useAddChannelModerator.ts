import ChatKitty, {
  AddedChannelModeratorResult,
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  succeeded,
  User,
} from "chatkitty";
import useResourceState from "../useResourceState";

const useAddChannelModerator = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Channel;
  makeRequest: (channel: Channel, user: User) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Channel>();

  const makeRequest = async (channel: Channel, user: User) => {
    setIsLoading(true);

    const result = await client.addChannelModerator({ channel, user });

    if (succeeded<AddedChannelModeratorResult>(result)) {
      setResource(result.channel);
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

export default useAddChannelModerator;
