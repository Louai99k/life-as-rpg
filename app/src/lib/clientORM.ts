export type ClientORMOptions = {
  isSingle: boolean;
  params: any[];
};

const defaultOptions: ClientORMOptions = {
  isSingle: false,
  params: [],
};

async function clientORM<T>(sql: string, o: Partial<ClientORMOptions> = {}) {
  const options = { ...defaultOptions, ...o };
  const res = await fetch("/api/query", {
    method: "POST",
    body: JSON.stringify({
      sql,
      params: options.params,
      isSingle: options.isSingle,
    }),
  });

  if (!res.ok) {
    throw { message: "error occured" };
  }

  return res.json() as Promise<T>;
}

export default clientORM;
