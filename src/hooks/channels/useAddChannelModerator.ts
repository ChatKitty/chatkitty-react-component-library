import type {
  AddedChannelModeratorResult,
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  User,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import useResourceState from "../useResourceState";

const useAddChannelModerator = (
  client: ChatKitty
): {
  resource?: Channel;
  isLoading: boolean;
  error?: ChatKittyError;
  makeRequest: (channel: Channel, user: User) => Promise<void>;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Channel>();

  const makeRequest = async (channel: Channel, user: User) => {
    setIsLoading(true);

    const result = await client.addChannelModerator({ channel, user });

    if (result.succeeded) {
      setResource((result as AddedChannelModeratorResult).channel);
    }

    if (result.failed) {
      setError((result as ChatKittyFailedResult).error);
    }

    setIsLoading(false);
  };

  return {
    resource,
    isLoading,
    error,
    makeRequest,
  };
};

export default useAddChannelModerator;
