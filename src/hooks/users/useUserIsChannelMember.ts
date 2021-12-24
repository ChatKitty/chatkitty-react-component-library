import type {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  GetUserIsChannelMemberSucceededResult,
  User,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import useResourceState from "../useResourceState";

const useUserIsChannelMember = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: boolean;
  makeRequest: (channel: Channel, user: User) => Promise<void>;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<boolean>();

  const makeRequest = async (channel: Channel, user: User) => {
    setIsLoading(true);

    const result = await client.getUserIsChannelMember({
      channel,
      user,
    });

    if (result.succeeded) {
      setResource((result as GetUserIsChannelMemberSucceededResult).isMember);
    }

    if (result.failed) {
      setError((result as ChatKittyFailedResult).error);
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

export default useUserIsChannelMember;
