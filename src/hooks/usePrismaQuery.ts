import { useEffect, useState } from "react";

import type { FuncExtractor, Models, QueryOperations } from "types/prisma";

interface State<T> {
  data?: T;
  loading: boolean;
  error: boolean;
}

function usePrismaQuery<
  M extends Models,
  O extends QueryOperations,
  T extends Awaited<ReturnType<FuncExtractor<M, O>>>,
>(model: M, operation: O, ...args: Parameters<FuncExtractor<M, O>>): State<T> {
  const [state, setState] = useState<State<T>>({
    loading: true,
    error: false,
  });

  useEffect(() => {
    electronAPI.db
      .query(model, operation, ...args)
      .then((res) => {
        setState({
          data: res as T,
          loading: false,
          error: false,
        });
      })
      .catch(() => {
        setState({
          loading: false,
          error: true,
        });
      });
  }, []);

  return state;
}

export default usePrismaQuery;
