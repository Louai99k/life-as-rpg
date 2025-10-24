import { useState } from "react";

function useList<T extends Record<string, any>>(initValue?: T[]) {
  const [list, setList] = useState<T[]>(initValue || []);

  const add = (item: T) => {
    setList((prev) => [...prev, item]);
  };

  const remove = function <K extends keyof T>(key: K, value: T[K]) {
    setList((prev) => {
      return prev.filter((item) => item[key] !== value);
    });
  };

  const editItem = function <K extends keyof T, U extends keyof T>(
    criteria: K,
    criteriaValue: T[K],
    updateField: U,
    updateFieldValue: T[U],
  ) {
    setList((prev) =>
      prev.map((item) => {
        if (item[criteria] === criteriaValue) {
          return {
            ...item,
            [updateField]: updateFieldValue,
          };
        }

        return item;
      }),
    );
  };

  return {
    list,
    add,
    remove,
    editList: setList,
    editItem,
  };
}

export default useList;
