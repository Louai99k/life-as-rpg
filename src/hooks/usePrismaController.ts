import { useCallback, useState } from "react";
import { useSWRConfig } from "swr";

import type {
  ControllerReturnMap,
  ControllerPayloadMap,
  Controller,
} from "types/electron";
import type { Models } from "types/prisma";

type UsePrismaControllerFunc<C extends Controller> = (
  ...args: ControllerPayloadMap[C]
) => Promise<ControllerReturnMap[C]>;

type UsePrismaControllerRet<C extends Controller> = [
  UsePrismaControllerFunc<C>,
  { isLoading: boolean; isError: boolean },
];

function usePrismaController<C extends Controller, M extends Models>(
  controllerName: C,
  modelToMutate?: M | (string & {}) | M[] | (string & {})[],
): UsePrismaControllerRet<C> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { mutate } = useSWRConfig();

  const handleCallback = useCallback<UsePrismaControllerFunc<C>>(
    async (...args) => {
      setLoading(true);
      let res: any;
      try {
        res = await electronAPI.db.controller(controllerName, ...args);
        if (Array.isArray(modelToMutate)) {
          for (const model of modelToMutate) {
            mutate(model);
          }
        } else {
          mutate(modelToMutate);
        }
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
