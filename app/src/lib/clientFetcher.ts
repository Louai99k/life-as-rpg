async function clientFetcher<T>(key: string, opt?: RequestInit) {
  const res = await fetch(`/api/${key}`, opt);

  if (!res.ok) {
    throw { message: "error occured" };
  }

  return res.json() as Promise<T>;
}

export default clientFetcher;
