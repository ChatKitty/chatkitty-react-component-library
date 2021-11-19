import ChatKitty, {
  ChatKittyError,
  ChatKittyFailedResult,
  DeleteUserBlockListItemSucceededResult,
  failed,
  succeeded,
  User,
  UserBlockListItem,
} from "chatkitty";
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

    if (succeeded<DeleteUserBlockListItemSucceededResult>(result)) {
      setResource(result.user);
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

export default useDeleteUserBlockListItem;
