export type ClientORMOptions = {
  isSingle: boolean;
  params: any[];
  jsonFields: string[];
};

const defaultOptions: ClientORMOptions = {
  isSingle: false,
  params: [],
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
      jsonFields: options.jsonFields,
    }),
  });

  if (!res.ok) {
    throw { message: "error occured" };
  }

  return res.json() as Promise<T>;
}

export default clientORM;
