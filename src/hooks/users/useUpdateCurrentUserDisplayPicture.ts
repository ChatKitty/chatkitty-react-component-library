import type {
  ChatKittyError,
  ChatKittyFailedResult,
  CurrentUser,
  UpdateCurrentUserDisplayPictureRequest,
  UpdatedCurrentUserResult,
} from "chatkitty";
import type ChatKitty from "chatkitty";
import useResourceState from "../useResourceState";

const useUpdateCurrentUserDisplayPicture = (
  client: ChatKitty
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: CurrentUser;
  makeRequest: (
    params: UpdateCurrentUserDisplayPictureRequest
  ) => Promise<void>;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<CurrentUser>();

  const makeRequest = async ({
    file,
    progressListener,
  }: UpdateCurrentUserDisplayPictureRequest) => {
    setIsLoading(true);

    const result = await client.updateCurrentUserDisplayPicture({
      file,
      progressListener,
    });

    if (result.succeeded) {
      setResource((result as UpdatedCurrentUserResult).user);
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

export default useUpdateCurrentUserDisplayPicture;
