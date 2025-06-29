// @ts-check
import { Card, feedCardButtonShape, FeedContext } from "@asu/unity-react-core";
import React, { useContext, useEffect } from "react";

import trackReactComponent from "../../../../../shared/services/componentDatalayer";
import { BaseFeed } from "../../core/components/BaseFeed";
import { defaultProps } from "../../core/constants/default-props";
import { parseInterests } from "../../core/utils";
import { NewsWrapper } from "./index.styles";

/**
 *
 * @param {Object} feed
 * @param {import("../../core/types/news-types").CardButton} cardButton
 */
const gridRow = (feed, cardButton) => (
  <div
    className="col col-12 col-md-6 col-lg-4 cards-items-container"
    key={feed.id}
  >
    <Card
      type="default"
      eventFormat="inline"
      eventLocation={feed.location}
      clickable={!!feed.buttonLink}
      title={feed.title}
      body={`<p class="card-text text-dark">${feed.content}</p>`}
      image={feed.imageUrl}
      imageAltText={feed.imageAltText}
      linkLabel={feed.eventButtonText}
      linkUrl={feed.eventButtonUrl || feed.buttonLink}
      buttons={[
        {
          ariaLabel: cardButton.text,
          color: cardButton.color,
          label: cardButton.text,
          size: cardButton.size,
          href: feed.buttonLink,
        },
      ]}
      tags={parseInterests(feed?.interests)}
    />
  </div>
);

/**
 * @param {import("../../core/types/news-types").TemplateProps} props
 */
// eslint-disable-next-line react/prop-types
const GridTemplate = ({ cardButton }) => {
  const { feeds } = useContext(FeedContext); // Reading the "feeds" object from the context

  return (
    <NewsWrapper className="row row-spaced" data-testid="grid-view-container">
      {feeds?.map((feed, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={index}>{gridRow(feed, cardButton)}</React.Fragment>
      ))}
    </NewsWrapper>
  );
};
// eslint-enable-next-line react/prop-types

/**
 * @typedef {import("../../core/types/news-types").FeedType} FeedType
 */

/**
 * @param {FeedType} props
 */
const CardGridNews = ({ cardButton, ...props }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      trackReactComponent({
        packageName: "component-news",
        component: "CardGridNews",
        type: "NA",
        configuration: {
          cardButton,
          ...props,
        },
      });
    }
  }, []);

  return (
    // Calling the high order component that fetch the data
    <BaseFeed {...props}>
      <GridTemplate
        cardButton={{ ...defaultProps.cardButton, ...cardButton }}
      />
    </BaseFeed>
  );
};

CardGridNews.propTypes = {
  ...BaseFeed.propTypes,
  cardButton: feedCardButtonShape,
};

export { CardGridNews };
