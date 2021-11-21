import type {
  ChatKittyError,
  ChatKittyFailedResult,
  DeleteUserBlockListItemSucceededResult,
  User,
  UserBlockListItem,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import useResourceState from "../useResourceState";

const useDeleteUserBlockListItem = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: User;
  makeRequest: (item: UserBlockListItem) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<User>();

  const makeRequest = async (item: UserBlockListItem) => {
    setIsLoading(true);

    const result = await client.deleteUserBlockListItem({ item });

    if (result.succeeded) {
      setResource((result as DeleteUserBlockListItemSucceededResult).user);
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

export default useDeleteUserBlockListItem;
