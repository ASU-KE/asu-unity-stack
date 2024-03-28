import { request } from "graphql-request";
import useSWR from "swr";

const fetchData = (
  url,
  query,
  filter,
  pagination = {
    page: 1,
    perPage: 9,
  },
  sort = {
    table: "event",
    field: "startAt",
    order: "DESC",
  }
) => {
  const variables = {
    pagination,
    sort,
    filter,
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
 *  @property {Object} [data]
 *  @property {number} [next]
 *  @property {number} [previous]
 *  @property {number} [pageCount]
 */

/**
 * @template T
 * @returns {FetchResponse<T>}
 */
const useFetchKeGraphql = (query, url, filter, pagination, sort) => {
  const { data, error } = useSWR(
    [url, query, filter, pagination, sort],
    fetchData
  );

  return {
    payload: data,
    loading: !error && !data,
    error,
  };
};

export { useFetchKeGraphql };
