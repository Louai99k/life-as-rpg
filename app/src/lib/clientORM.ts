export type ClientORMOptions = {
  isSingle: boolean;
  params: any[];
  jsonFields: string[];
  booleanFields: string[];
};

const defaultOptions: ClientORMOptions = {
  isSingle: false,
  params: [],
  booleanFields: [],
  jsonFields: [],
};

async function clientORM<T>(sql: string, o: Partial<ClientORMOptions> = {}) {
  const options = { ...defaultOptions, ...o };
  const res = await fetch("/api/query", {
    method: "POST",
    body: JSON.stringify({
      sql,
      params: options.params,
      isSingle: options.isSingle,
      booleanFields: options.booleanFields,
      jsonFields: options.jsonFields,
    }),
  });

  if (!res.ok) {
    throw { message: "error occured" };
  }

  return res.json() as Promise<T>;
}

export default clientORM;
