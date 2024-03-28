import useSWR from "swr";

const fetcher = async (url) => {
  let result;

  try {
    result = await fetch(url);
  } catch (e) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      console.log("***** Problem with fetch that results in an exception");
      console.error(e);
    }
    throw new Error("Invalid Response");
  }

  if (result.ok) {
    try {
      return await result.json();
    } catch (e) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.log("***** Problem with JSON payload", e);
      }
      throw "Result OK but JSON borked";
    }
  } else {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      console.log("****** Result ! OK", result.status, result.statusText);
    }
    throw result.statusText;
  }
};

/**
 * @template S
 * @typedef {{
 *    payload: DrupalFetchPayload
 *    loading: boolean,
 *    error: object
 * }} FetchResponse
 */

/**
 *  @typedef {Object} DrupalFetchPayload
 *  @property {Object} [nodes]
 */

/**
 * @template T
 * @returns {FetchResponse<T>}
 */
const useFetchDrupalFeed = (url) => {
  const { data, error } = useSWR(url, fetcher);

  return {
    payload: data,
    loading: !error && !data,
    error,
  };
};

export { useFetchDrupalFeed };
