async function clientORM<T>(sql: string, params: any[] = []) {
  const res = await fetch("/api/query", {
    method: "POST",
    body: JSON.stringify({
      sql,
      params,
    }),
  });

  if (!res.ok) {
    throw { message: "error occured" };
  }

  return res.json() as Promise<T>;
}

export default clientORM;
