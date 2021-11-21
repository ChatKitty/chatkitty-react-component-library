import type { ChatKittyError } from "chatkitty";
import { useState } from "react";

const useResourceState = <T>({
  defaultIsLoading = false,
}: {
  defaultIsLoading?: boolean;
} = {}): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: T;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: (error: ChatKittyError) => void;
  setResource: React.Dispatch<React.SetStateAction<T | undefined>>;
} => {
  const [isLoading, setIsLoading] = useState(defaultIsLoading);
  const [error, setError] = useState<ChatKittyError>();
  const [resource, setResource] = useState<T>();

  return {
    isLoading,
    error,
    resource,
    setIsLoading,
    setError,
    setResource,
  };
};

export default useResourceState;
