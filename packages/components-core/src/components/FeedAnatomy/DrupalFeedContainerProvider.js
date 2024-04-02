/* eslint-disable react/prop-types */
// import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";
import styled from "styled-components";

// import { feedDrupalDataSourceShape } from '../../../../components-core/src';
import { FeedContext } from "./FeedContext";
import { useFetchDrupalFeed } from "../../../../../shared/hooks/use-fetch-drupal-feed";
import { Loader } from "../Loader";

const Container = styled.section``;

/**
 * This component is the HOC(high order component) used in component-news packages
 * @param {{
 *  renderHeader: JSX.Element
 *  renderBody: JSX.Element
 *  defaultProps: import("../../core/types/feed-types").FeedType
 *  dataSource: import("../../core/types/feed-types").DrupalDataSource
 *  dataTransformer?: (data: object) => object
 *  dataFilter?: (data: object, filters: string) => object
 *  maxItems?: number
 *  noResultsText: string
 * }} props
 * @returns {JSX.Element}
 * @ignore
 */
const DrupalFeedContainerProvider = ({
  defaultProps,
  dataSource,
  dataTransformer = item => item,
  dataFilter = item => item,
  noResultsText = "No events found.",
  renderHeader,
  renderBody,
  maxItems,
}) => {
  const [drupalStories, setDrupalStories] = useState([]);

  const asuDataSource = { ...defaultProps.dataSource, ...dataSource };

  // Fetch Drupal feed.
  const {
    payload: drupalData,
    loading: drupalLoading,
    error: drupalError,
  } = useFetchDrupalFeed(asuDataSource.url);

  useEffect(() => {
    // Work all the data and set the filterd and mapped feeds
    const transformedData = drupalData?.nodes.map(dataTransformer);
    const filteredData = transformedData?.filter((item) =>
      dataFilter(item, asuDataSource?.filters)
    );
    setDrupalStories(
      maxItems ? filteredData?.slice(0, maxItems) : filteredData
    );
  }, [drupalData]);

  return (
    // Init the context to be used on its childrens
    <FeedContext.Provider value={{ stories: drupalStories }}>
      <Container>
        {renderHeader}
        {drupalError ? (
          <span>There was an loading error, please refresh the page or contact support.</span>
        ) : (
          <>
            {drupalLoading && !drupalStories?.length && (
              <div className="text-center mt-4">
                <Loader />
              </div>
            )}
            {drupalStories?.length
              ? renderBody
              : !drupalLoading && (
                  <p className="text-center">{noResultsText}</p>
                )}
          </>
        )}
      </Container>
    </FeedContext.Provider>
  );
};

// DrupalFeedContainerProvider.propTypes = {
// 	defaultProps: PropTypes.object,
// 	dataSource: feedDrupalDataSourceShape,
// 	dataTransformer: PropTypes.func,
// 	dataFilter: PropTypes.func,
// 	renderHeader: PropTypes.element,
// 	renderBody: PropTypes.element,
// 	maxItems: PropTypes.number,
// 	noResultsText: PropTypes.string,
// };

export { DrupalFeedContainerProvider };
