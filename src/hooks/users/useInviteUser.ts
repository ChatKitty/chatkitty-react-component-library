import type {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  InviteUserResult,
  User,
} from "chatkitty";
import type ChatKitty from "chatkitty";
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

    const result: InviteUserResult = await client.inviteUser({
      channel,
      user,
    });

    if (result.succeeded) {
      // empty response
    }

    if (result.failed) {
      setError((result as ChatKittyFailedResult).error);
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
