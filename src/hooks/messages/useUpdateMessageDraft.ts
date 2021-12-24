import type { Channel } from "chatkitty";
import type ChatKitty from "chatkitty";
import useResourceState from "../useResourceState";

const useUpdateMessageDraft = (
  client: ChatKitty
): {
  isLoading: boolean;
  makeRequest: (channel: Channel, draft: string) => Promise<void>;
} => {
  const { isLoading, setIsLoading } = useResourceState();

  const makeRequest = async (channel: Channel, draft: string) => {
    setIsLoading(true);

    await client.sendKeystrokes({ channel, keys: draft });

    // TODO: this API doesn't have response or error types.

    setIsLoading(false);
  };

  return {
    isLoading,
    makeRequest,
  };
};

export default useUpdateMessageDraft;
