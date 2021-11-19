import ChatKitty, {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetChannelMembersFilter,
  GetUsersSucceededResult,
  succeeded,
  User,
} from "chatkitty";
import { useEffect } from "react";
import useResourceState from "../useResourceState";

const useChannelMembers = (
  client: ChatKitty,
  {
    channel,
    filter,
  }: {
    channel: Channel;
    filter?: GetChannelMembersFilter;
  }
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: User[];
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<User[]>();

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result = await client.getChannelMembers({ channel, filter });

      if (succeeded<GetUsersSucceededResult>(result)) {
        setResource(result.paginator.items);
      }

      if (failed<ChatKittyFailedResult>(result)) {
        setError(result.error);
      }

      setIsLoading(false);
    };

    makeRequest();
  }, []);

  return {
    isLoading,
    error,
    resource,
  };
};

export default useChannelMembers;
