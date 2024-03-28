import { request } from "graphql-request";
import useSWR from "swr";

const fetchData = (url, query, eventSlug) => {
  const variables = {
    slug: eventSlug,
  };

  // Run GraphQL queries/mutations using a static function
  return request(url, query, variables).then((data) => data);
};

/**
 * @template S
 * @typedef {{
 *    payload: KeGraphqlFetchPayload
 *    loading: boolean
 *    error: object
 * }} FetchResponse
 */

/**
 *  @typedef {Object} KeGraphqlFetchPayload
 *  @property {number} [totalPages]
 *  @property {Object} [data]
 */

/**
 * @template T
 * @returns {FetchResponse<T>}
 */
const useFetchKeEvent = (query, url, eventSlug) => {
  const { data, error } = useSWR([url, query, eventSlug], fetchData);

  return {
    payload: data?.EventBySlug,
    loading: !error && !data,
    error,
  };
};

export { useFetchKeEvent };
