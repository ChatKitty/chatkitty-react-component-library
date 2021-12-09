import type {
  ChatKittyError,
  ChatKittyFailedResult,
  GetChannelMembersRequest,
  GetUsersSucceededResult,
  User,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import { useEffect } from "react";
import useResourceState from "../useResourceState";

const useChannelMembers = (
  client: ChatKitty,
  params: GetChannelMembersRequest
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

    const result = await client.getChannelMembers(params);

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
