import useSWR from "swr";
import { transformData } from "../../packages/component-news/src/core/transformers/wordpress.transformer";
const fetcher = async (url, storySlug) => {
  let response;
  const query = `posts?slug=${storySlug}`;

  try {
    response = await fetch(url + query);
  } catch (e) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      console.log("***** Problem with fetch that results in an exception");
      console.error(e);
    }
    throw new Error("Invalid Response");
  }

  if (response.ok) {
    // console.error( response );

    try {
      return {
        data: await response.json(),
      };
    } catch (e) {
      // console.error( e );

      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.log("***** Problem with JSON payload", e);
      }
      console.error("***** Problem with JSON payload", e);
      throw "Result OK but JSON borked";
    }
  } else {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      console.log("****** Result ! OK", response.status, response.statusText);
    }
    throw response.statusText;
  }
};

/**
 * @template S
 * @typedef {{
 *    payload: WpFetchPayload
 *    loading: boolean,
 *    error: object
 * }} FetchResponse
 */

/**
 *  @typedef {Object} WpFetchPayload
 *  @property {Object} [data]
 *  @property {number} [totalPages]
 */

/**
 * @template T
 * @returns {FetchResponse<T>}
 */
const useFetchWpRestStory = (url, storySlug) => {
  const { data: response, error } = useSWR([url, storySlug], fetcher);

  return {
    payload: {
      data: response?.data?.map(transformData),
    },
    loading: !error && !response?.data,
    error,
  };
};

export { useFetchWpRestStory };
