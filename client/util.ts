/**
 * Make a get request to the api
 *
 * @param url - URL to fetch from
 * @param options - Options to pass to fetch
 * @returns api response
 */
async function get(url: string, options = {}): Promise<any> {
  const res = await fetch(url, { ...options, method: "GET" });
  return await (res.ok ? res.json() : null);
}

/**
 * Make a post request to the api
 *
 * @param url - URL to fetch from
 * @param options - Options to pass to fetch
 * @returns api response
 */
async function post(url: string, options = {}): Promise<any> {
  const res = await fetch(url, {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
  });
  return await (res.ok ? res.json() : null);
}

/**
 * Make a delete request to the api
 *
 * @param url - URL to fetch from
 * @param options - Options to pass to fetch
 * @returns api response
 */
async function del(url: string, options = {}): Promise<any> {
  const res = await fetch(url, { ...options, method: "DELETE" });
  return await (res.ok ? res.json() : null);
}

export default {
  get,
  post,
  del,
};
