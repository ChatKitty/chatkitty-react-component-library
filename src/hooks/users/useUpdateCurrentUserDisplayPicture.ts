import ChatKitty, {
  ChatKittyError,
  ChatKittyFailedResult,
  ChatKittyUploadProgressListener,
  CreateChatKittyFileProperties,
  CurrentUser,
  failed,
  succeeded,
  UpdatedCurrentUserResult,
} from "chatkitty";
import useResourceState from "../useResourceState";

const useUpdateCurrentUserDisplayPicture = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: CurrentUser;
  makeRequest: (
    file: CreateChatKittyFileProperties,
    progressListener: ChatKittyUploadProgressListener
  ) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<CurrentUser>();

  const makeRequest = async (
    file: CreateChatKittyFileProperties,
    progressListener: ChatKittyUploadProgressListener
  ) => {
    setIsLoading(true);

    const result = await client.updateCurrentUserDisplayPicture({
      file,
      progressListener,
    });

    if (succeeded<UpdatedCurrentUserResult>(result)) {
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

export default useUpdateCurrentUserDisplayPicture;
