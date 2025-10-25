import { useCallback, useState } from "react";
import { useSWRConfig } from "swr";

import type { FuncExtractor, Models, MutationOperations } from "types/prisma";

type UsePrismaMutationFunc<M extends Models, O extends MutationOperations> = (
  ...args: Parameters<FuncExtractor<M, O>>
) => Promise<ReturnType<FuncExtractor<M, O>> | undefined>;

type UsePrismaMutationRet<M extends Models, O extends MutationOperations> = [
  UsePrismaMutationFunc<M, O>,
  { isLoading: boolean; isError: boolean },
];

function usePrismaMutation<M extends Models, O extends MutationOperations>(
  model: M,
  operation: O,
): UsePrismaMutationRet<M, O> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { mutate } = useSWRConfig();

  const handleCallback = useCallback<UsePrismaMutationFunc<M, O>>(
    async (...args) => {
      setLoading(true);
      let res: ReturnType<FuncExtractor<M, O>> | undefined;
      try {
        res = await electronAPI.db.mutation(model, operation, ...args);
        mutate((key) => typeof key === "string" && key.startsWith(model));
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }

      return res;
    },
    [],
  );

  return [handleCallback, { isLoading: loading, isError: error }];
}

export default usePrismaMutation;
