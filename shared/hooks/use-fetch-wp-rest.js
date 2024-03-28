import useSWR from "swr";

const fetcher = async (url, filters, pagination) => {
  const units = filters.units ?? [];
  const interests = filters.interests ?? [];
  const locations = filters.locations ?? [];
  const page = pagination.page
  const perPage = pagination.perPage;
  // const order = 'DESC';
  // const orderBy = ''

  let response;
  const query = "posts?";
  let params = "";

  if (units.length) {
    let unitParams = "";
    unitParams = units.reduce(
      (accumulator, currentValue) => `${accumulator},${currentValue}`,
      unitParams
    );
    // trim leading ',' from our params string and store full parameters string
    params += `&college_unit=${unitParams.substring(1)}`;
  }

  if (interests.length) {
    let interestParams = "";
    interestParams = interests.reduce(
      (accumulator, currentValue) => `${accumulator},${currentValue}`,
      interestParams
    );
    // trim leading ',' from our params string and store full parameters string
    params += `&interest=${interestParams.substring(1)}`;
  }

  if (locations.length) {
    let locationParams = "";
    locationParams = locations.reduce(
      (accumulator, currentValue) => `${accumulator},${currentValue}`,
      locationParams
    );
    // trim leading ',' from our params string and store full parameters string
    params += `&location=${locationParams.substring(1)}`;
  }

  // trim leading '&' from our params string
  params = params.substring(1);

  params += `&per_page=${perPage}`;
  params += `&page=${page}`;
  // params += `&order=${ order }`;
  // params += `&orderby=${ orderBy }`;

  try {
    response = await fetch(`${url}${query}${params}`);
  } catch (e) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      console.log("***** Problem with fetch that results in an exception");
      console.error(e);
    }
    throw new Error("Invalid Response");
  }

  if (response.ok) {
    try {
      return {
        data: await response.json(),
        totalPages: Number(response.headers.get("x-wp-totalpages")),
      };
    } catch (e) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.log("***** Problem with JSON payload", e);
      }
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
 *  @property {string} [storyBasePath]
 *  @property {number} [totalPages]
 */

/**
 * @template T
 * @returns {FetchResponse<T>}
 */
const useFetchWpRest = (url, storyBasePath, filters, pagination) => {
  const { data: response, error } = useSWR([url, filters, pagination], fetcher);

  return {
    payload: {
      data: response?.data.map((story) => ({
        ...story,
        storyLink: `https://${document.location.host}/${storyBasePath}/${story.slug}/`,
      })),
      totalPages: response?.totalPages,
    },
    loading: !error && !response?.data,
    error,
  };
};

export { useFetchWpRest };
