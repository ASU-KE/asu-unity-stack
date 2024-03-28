// @ts-check
import { Card, FeedContext } from "../../../../components-core/src";
import React, { useContext, useEffect } from "react";
import classNames from "classnames";

import trackReactComponent from "../../../../../shared/services/componentDatalayer";
import { feedCardButtonShape } from "../../../../components-core/src/components/FeedAnatomy/feed-prop-types";
import { BaseFeed } from "../../core/components/BaseFeed";
import { defaultProps } from "../../core/constants/default-props";
import { parseInterests } from "../../core/utils";
import { NewsWrapper } from "./index.styles";

/**
 *
 * @param {Object} feed //feed aka story
 * @param {import("../../core/types/news-types").CardButton} cardButton
 * @param {Boolean} enableStoryAuthor
 * @param {Boolean} enableStoryDate
 * @param {String} numberColumns
 */
const feedBody = (feed, enableStoryAuthor, enableStoryDate) => {
  if (enableStoryDate) {
    return enableStoryAuthor && feed.author?.name
      ? `<p><b>${feed.date} - ${feed.author.name}</b></p><p class="card-text text-dark">${feed.excerpt}</p>`
      : `<p><b>${feed.date}</b></p><p class="card-text text-dark">${feed.excerpt}</p>`;
  }

  return `<p class="card-text text-dark">${feed.excerpt}</p>`;
};
const gridRow = (
  feed,
  enableCardTags,
  enableStoryAuthor,
  enableStoryDate,
  numberColumns
) => {
  const cardClasses = classNames(
    "col",
    "col-12",
    "col-md-6",
    "cards-items-container",
    {
      "col-lg-6": numberColumns === "2",
      "col-lg-4": numberColumns === "3",
    }
  );
  return (
    <div className={cardClasses} key={feed.id}>
      <Card
        type="default" //story?
        eventFormat="inline"
        eventLocation={feed.location}
        clickable={false}
        cardLink={false}
        clickHref={false}
        title={feed.title}
        // body={`<p class="card-text text-dark">${feed.content}</p>`}
        body={storyBody(feed, enableStoryAuthor, enableStoryDate)}
        image={feed.featuredImageUrl ? feed.featuredImageUrl : feed.headerImageUrl}
        imageAltText={feed.title}
        linkLabel={"Read"}
        linkUrl={feed.storyLink}
        buttons={[
          {
            ariaLabel: cardButton.text,
            color: cardButton.color,
            label: cardButton.text,
            size: cardButton.size,
            href: feed.buttonLink,
          },
        ]}
        tags={enableCardTags ? parseInterests(feed?.interests) : null}
      />
    </div>
  );
};

/**
 * @param {import("../../core/types/news-types").TemplateProps} props
 */
// eslint-disable-next-line react/prop-types
const GridTemplate = ({
  enableCardTags,
  enableStoryAuthor,
  enableStoryDate,
  numberColumns,
}) => {
  const { feeds } = useContext(FeedContext); // Reading the "feeds" object from the context

  return (
    <NewsWrapper className="row row-spaced" data-testid="grid-view-container">
      {feeds?.map((feed, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={index}>
          {gridRow(
            feed,
            enableCardTags,
            enableStoryAuthor,
            enableStoryDate,
            numberColumns
          )}
        </React.Fragment>
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
const CardGridNews = ({
  enableCardTags,
  enableStoryAuthor,
  enableStoryDate,
  numberColumns,
  ...props
}) => {
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
        enableCardTags={enableCardTags}
        enableStoryAuthor={enableStoryAuthor}
        enableStoryDate={enableStoryDate}
        numberColumns={numberColumns}
      />
    </BaseFeed>
  );
};

CardGridNews.propTypes = {
  ...BaseFeed.propTypes,
  cardButton: feedCardButtonShape,
};

export { CardGridNews };
