import ChatKitty, {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  InviteUserResult,
  succeeded,
  User,
} from "chatkitty";
import useResourceState from "../useResourceState";

const useInviteUser = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  makeRequest: (channel: Channel, user: User) => void;
} => {
  const { isLoading, error, setIsLoading, setError } = useResourceState();

  const makeRequest = async (channel: Channel, user: User) => {
    setIsLoading(true);

    const result = await client.inviteUser({
      channel,
      user,
    });

    if (succeeded<InviteUserResult>(result)) {
      // empty response
    }

    if (failed<ChatKittyFailedResult>(result)) {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    makeRequest,
  };
};

export default useInviteUser;
