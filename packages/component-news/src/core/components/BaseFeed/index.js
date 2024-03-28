// @ts-check
import PropTypes from "prop-types";
import React from "react";

import {
  FeedBody,
  FeedContainerProvider,
  FeedHeader,
  DrupalFeedContainerProvider,
  KeNewsContainerProvider,
  MergedNewsContainerProvider,
}
from "../../../../../components-core/src/components/FeedAnatomy";



// import {
//   feedHeaderShape,
//   feedCtaButtonShape,
//   feedDataSourceShape,
// } from "../../../../../components-core/src/components/FeedAnatomy/feed-prop-types";
import { defaultProps } from "../../constants/default-props";
import { filterDrupalData } from "../../services/data-manager";
import { transformData as transformDrupalData } from "../../transformers/drupal.transformer";
import { transformData as transformWpData } from "../../transformers/wordpress.transformer";

/**
 * @typedef {import("@asu/components-core/src/core/types/feed-types").FeedType} FeedType
 */

/**
 * @param {FeedType & {children: object}} props
 */
const BaseFeed = ({
  children,
  header,
  ctaButton,
  drupalDataSource,
  wpDataSource,
  maxItems,
}) => {
  const filters = drupalDataSource?.filters?.replace(/_/g, " ");
  const formattedDrupalDataSource = drupalDataSource ? { ...drupalDataSource, filters } : null;
  if (drupalDataSource && !wpDataSource) {
  // We provide in the renderBody the view specified before in the parent component, recieved as "children" in this component.
  // We provide in the renderHeader the components-core header, if it is desired to be shown
  // We provide the maxItems prop to limit the items rendered
  // We provide the dataSource to read the url to fetch the data
  // We provide the defaultProps to use some needed default values in case they are not provided
  return (
    <DrupalFeedContainerProvider
      renderHeader={
        header && ctaButton ? (
          <FeedHeader
            header={header}
            ctaButton={ctaButton}
            defaultProps={defaultProps}
          />
        ) : null
      }
      renderBody={<FeedBody>{children}</FeedBody>}
      dataTransformer={transformDrupalData}
      dataFilter={filterDrupalData}
      dataSource={formattedDrupalDataSource}
      defaultProps={defaultProps}
      noFeedText="No news to show."
      maxItems={maxItems}
    />
  );
  }
  if (!drupalDataSource && wpDataSource) {
    return (
      <KeNewsContainerProvider
        renderHeader={
          header && ctaButton ? (
            <FeedHeader
              header={header}
              ctaButton={ctaButton}
              defaultProps={defaultProps}
            />
          ) : null
        }
        renderBody={<FeedBody>{children}</FeedBody>}
        wpDataSource={wpDataSource}
        wpDataTransformer={transformWpData}
        noResultsText="No news to show."
        maxItems={maxItems}
      />
    );
  }
  if (drupalDataSource && wpDataSource) {
    return (
      <MergedNewsContainerProvider
        renderHeader={
          header && ctaButton ? (
            <FeedHeader
              header={header}
              ctaButton={ctaButton}
              defaultProps={defaultProps}
            />
          ) : null
        }
        renderBody={<FeedBody>{children}</FeedBody>}
        defaultProps={defaultProps}
        drupalDataSource={formattedDrupalDataSource}
        drupalDataFilter={filterDrupalData}
        drupalDataTransformer={transformDrupalData}
        wpDataSource={wpDataSource}
        wpDataTransformer={transformWpData}
        noResultsText="No news to show."
        maxItems={maxItems}
      />
    );
  }
  return null;
};
/*
BaseFeed.propTypes = {
  header: feedHeaderShape,
  ctaButton: feedCtaButtonShape,
  dataSource: feedDataSourceShape,
  maxItems: PropTypes.number,
  children: PropTypes.element,
};
*/
export { BaseFeed };
