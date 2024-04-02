/* eslint-disable react/prop-types */
import { union, sortBy } from "lodash-es";
// import PropTypes from 'prop-types';
import React from "react";
import styled from "styled-components";

// import {
// 	feedDrupalDataSourceShape,
// 	feedWpRestDataSourceShape,
// } from '../../../../components-core/src';
import { FeedContext } from "./FeedContext";
import { useFetchDrupalFeed } from "../../../../../shared/hooks/use-fetch-drupal-feed";
import { useFetchWpRest } from "../../../../../shared/hooks/use-fetch-wp-rest";
import { Loader } from "../Loader";

const Container = styled.section``;
const MergeFeedContext = createContext(null);

/**
 * This component is the HOC(high order component) used in component-news packages
 * @param {{
 *  renderHeader: JSX.Element
 *  renderBody: JSX.Element
 *  defaultProps: import("../../core/types/feed-types").FeedType
 *  drupalDataSource: import("../../core/types/feed-types").DrupalDataSource
 *  drupalDataTransformer?: (data: object) => object
 *  drupalDataFilter?: (data: object, filters: string) => object
 *  wpDataSource: import("../../core/types/feed-types").WpRestDataSource
 *  wpDataTransformer?: (data: object) => object
 *  maxItems?: number
 *  noResultsText: string
 * }} props
 * @returns {JSX.Element}
 * @ignore
 */
const MergedNewsContainerProvider = ({
  renderHeader,
  renderBody,
  defaultProps,
  drupalDataSource,
  drupalDataTransformer = (item) => item,
  drupalDataFilter = (item) => item,
  wpDataSource,
  wpDataTransformer = (item) => item,
  noResultsText,
  maxItems,
}) => {
  const asuDataSource = { ...defaultProps.dataSource, ...drupalDataSource };

  // Fetch Drupal feed.
  const {
    payload: drupalData,
    loading: drupalLoading,
    error: drupalError,
  } = useFetchDrupalFeed(asuDataSource.url);

  // Work all the data and set the filterd and mapped feeds
  const transformedData = drupalData?.nodes.map(drupalDataTransformer);
  const drupalStories = transformedData?.filter((item) =>
    drupalDataFilter(item, asuDataSource?.filters)
  );

  // Fetch KE News via WP-REST.
  const {
    payload: wpPayload,
    loading: wpLoading,
    error: wpError,
  } = useFetchWpRest(
    wpDataSource.url,
    wpDataSource.storyBasePath,
    wpDataSource.filters,
    wpDataSource.pagination
  );

  const wpStories =
    wpPayload && wpPayload.data ? wpPayload.data?.map(wpDataTransformer) : [];

  let finalStories = [];
  if (drupalStories?.length && wpStories?.length) {
    const merged = union(drupalStories, wpStories);
    const sorted = sortBy(merged, ["dateIso"]).reverse();
    finalStories = maxItems ? sorted?.slice(0, maxItems) : sorted;
  } else if (drupalStories?.length) {
    finalStories = maxItems ? drupalStories?.slice(0, maxItems) : drupalStories;
  } else if (wpStories?.length) {
    finalStories = maxItems ? wpStories?.slice(0, maxItems) : wpStories;
  }

  return (
    // Init the context to be used on its childrens
    <FeedContext.Provider value={{ stories: finalStories }}>
      <Container>
        {renderHeader}
        {drupalError || wpError ? (
          <span>Error, try again!</span>
        ) : (
          <>
            {(drupalLoading || wpLoading) && (
              <div className="text-center mt-4">
                <Loader />
              </div>
            )}
            {finalStories?.length && !drupalLoading && !wpLoading
              ? renderBody
              : !drupalLoading &&
                !wpLoading && <p className="text-center">{noResultsText}</p>}
          </>
        )}
      </Container>
    </FeedContext.Provider>
  );
};

// MergedNewsContainerProvider.propTypes = {
// 	defaultProps: PropTypes.object,
// 	drupalDataSource: feedDrupalDataSourceShape,
// 	wpDataSource: feedWpRestDataSourceShape,
// 	renderHeader: PropTypes.element,
// 	renderBody: PropTypes.element,
// 	maxItems: PropTypes.number,
// 	drupalDataTransformer: PropTypes.func,
// 	drupalDataFilter: PropTypes.func,
// 	wpDataTransformer: PropTypes.func,
// 	noResultsText: PropTypes.string,
// };

export { MergedNewsContainerProvider };
