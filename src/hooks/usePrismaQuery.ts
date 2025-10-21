import { useEffect, useState } from "react";

import type { FuncExtractor, Models, QueryOperations } from "types/prisma";

interface State<T> {
  data?: T;
  isLoading: boolean;
  isError: boolean;
}

type UsePrismaQueryRet<T> = State<T> & { refetch: VoidFunction };

function usePrismaQuery<
  M extends Models,
  O extends QueryOperations,
  T extends Awaited<ReturnType<FuncExtractor<M, O>>>,
>(
  model: M,
  operation: O,
  ...args: Parameters<FuncExtractor<M, O>>
): UsePrismaQueryRet<T> {
  const [state, setState] = useState<State<T>>({
    isLoading: true,
    isError: false,
  });

  const fetchData = () => {
    electronAPI.db
      .query(model, operation, ...args)
      .then((res) => {
        setState({
          data: res as T,
          isLoading: false,
          isError: false,
        });
      })
      .catch(() => {
        setState({
          isLoading: false,
          isError: true,
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return {
    ...state,
    refetch,
  };
}

export default usePrismaQuery;
