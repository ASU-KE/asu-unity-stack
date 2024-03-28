/* eslint-disable react/prop-types */
// import PropTypes from 'prop-types';
import React from "react";
import styled from "styled-components";

// import { feedWpRestDataSourceShape } from '../../../../components-core/src';
import { FeedContext } from "./FeedContext";
import { useFetchWpRest } from "../../core/hooks/use-fetch-wp-rest";
import { Loader } from "../Loader";

const Container = styled.section``;

/**
 * This component is the HOC(high order component) used in component-news packages
 * @param {{
 *  renderHeader: JSX.Element
 *  renderBody: JSX.Element
 *  wpDataSource: import("../../core/types/feed-types").WpRestDataSource
 *  wpDataTransformer?: (data: object) => object
 *  noResultsText: string
 *  maxItems?: number
 * }} props
 * @returns {JSX.Element}
 * @ignore
 */
const KeNewsContainerProvider = ({
  renderHeader,
  renderBody,
  wpDataSource,
  wpDataTransformer = (item) => item,
  noResultsText,
  maxItems,
}) => {
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

  // Work all the data and set the filtered and mapped feeds
  const transformedData =
    wpPayload && wpPayload.data ? wpPayload.data?.map(wpDataTransformer) : [];

  const wpStories = maxItems
    ? transformedData?.slice(0, maxItems)
    : transformedData;

  return (
    // Init the context to be used on its childrens
    <FeedContext.Provider value={{ stories: wpStories }}>
      <Container>
        {renderHeader}
        {wpError ? (
          <span>Error, try again!</span>
        ) : (
          <>
            {wpLoading && !wpStories?.length && (
              <div className="text-center mt-4">
                <Loader />
              </div>
            )}
            {wpStories?.length
              ? renderBody
              : !wpLoading && <p>{noResultsText}</p>}
          </>
        )}
      </Container>
    </FeedContext.Provider>
  );
};

// KeNewsContainerProvider.propTypes = {
// 	wpDataSource: feedWpRestDataSourceShape,
// 	wpDataTransformer: PropTypes.func,
// 	renderHeader: PropTypes.element,
// 	renderBody: PropTypes.element,
// 	maxItems: PropTypes.number,
// 	noResultsText: PropTypes.string,
// };

export { KeNewsContainerProvider };
