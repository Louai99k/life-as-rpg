import urlGenerator from "@src/utils/urlGenerator";

async function clientFetcher<T>(key: string, opt?: RequestInit) {
  const res = await fetch(urlGenerator(key), opt);

  if (!res.ok) {
    throw { message: "error occured" };
  }

  const promise = new Promise((r) => setTimeout(r, 5000));

  await promise;

  return res.json() as Promise<T>;
}

export default clientFetcher;
