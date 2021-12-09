import type {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  GetChannelMembersFilter,
  GetUsersSucceededResult,
  User,
} from "chatkitty";
import type ChatKitty from "chatkitty";
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
  makeRequest: () => Promise<void>;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<User[]>();

  const makeRequest = async () => {
    setIsLoading(true);

    const result = await client.getChannelMembers({ channel, filter });

    if (result.succeeded) {
      setResource((result as GetUsersSucceededResult).paginator.items);
    }

    if (result.failed) {
      setError((result as ChatKittyFailedResult).error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    makeRequest();
  }, []);

  return {
    isLoading,
    error,
    resource,
    makeRequest,
  };
};

export default useChannelMembers;
