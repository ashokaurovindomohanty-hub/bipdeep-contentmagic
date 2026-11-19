import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useState } from "react";

export function useBackend() {
  const { actor, isFetching } = useActor(createActor);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function call<T>(fn: () => Promise<T>): Promise<T | null> {
    if (!actor) return null;
    setIsLoading(true);
    setError(null);
    try {
      const result = await fn();
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    actor,
    isActorLoading: isFetching,
    isLoading,
    error,
    call,
  };
}
