import type {
  Controller,
  ControllerPayloadMap,
  ControllerReturnMap,
} from "types/electron";

function fetchControllerData<C extends Controller>(
  controller: C,
  ...args: ControllerPayloadMap[C]
): ControllerReturnMap[C] {
  return electronAPI.db.controller(controller, ...args);
}

export default fetchControllerData;
