export type ClientORMOptions = {
  isSingle: boolean;
};

const defaultOptions: ClientORMOptions = {
  isSingle: false,
};

async function clientORM<T>(
  sql: string,
  params: any[] = [],
  o: Partial<ClientORMOptions> = {}
) {
  const options = { ...defaultOptions, ...o };
  const res = await fetch("/api/query", {
    method: "POST",
    body: JSON.stringify({
      sql,
      params,
      isSingle: options.isSingle,
    }),
  });

  if (!res.ok) {
    throw { message: "error occured" };
  }

  return res.json() as Promise<T>;
}

export default clientORM;
