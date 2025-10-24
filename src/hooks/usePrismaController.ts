import { useCallback, useState } from "react";

import type {
  ControllerReturnMap,
  ControllerPayloadMap,
  Controller,
} from "types/electron";

type UsePrismaControllerFunc<M extends Controller> = (
  ...args: ControllerPayloadMap[M]
) => Promise<ControllerReturnMap[M]>;

type UsePrismaControllerRet<M extends Controller> = [
  UsePrismaControllerFunc<M>,
  { isLoading: boolean; isError: boolean },
];

function usePrismaController<M extends Controller>(
  controllerName: M,
): UsePrismaControllerRet<M> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCallback = useCallback<UsePrismaControllerFunc<M>>(
    async (...args) => {
      setLoading(true);
      let res: any;
      try {
        res = await electronAPI.db.controller(controllerName, ...args);
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

export default usePrismaController;
