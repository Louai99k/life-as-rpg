import urlGenerator from "@src/utils/urlGenerator";

async function clientFetcher<T>(key: string, opt?: RequestInit) {
  const res = await fetch(urlGenerator(key), opt);

  if (!res.ok) {
    throw { message: "error occured" };
  }

  return res.json() as Promise<T>;
}

export default clientFetcher;
