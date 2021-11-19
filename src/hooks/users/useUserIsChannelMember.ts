import ChatKitty, {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetUserIsChannelMemberSucceededResult,
  succeeded,
  User,
} from "chatkitty";
import useResourceState from "../useResourceState";

const useUserIsChannelMember = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: boolean;
  makeRequest: (channel: Channel, user: User) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<boolean>();

  const makeRequest = async (channel: Channel, user: User) => {
    setIsLoading(true);

    const result = await client.getUserIsChannelMember({
      channel,
      user,
    });

    if (succeeded<GetUserIsChannelMemberSucceededResult>(result)) {
      setResource(result.isMember);
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

export default useUserIsChannelMember;
