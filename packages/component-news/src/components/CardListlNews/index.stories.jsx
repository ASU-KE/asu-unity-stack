// @ts-check
import React from "react";

import { CardListlNews } from "./index";

import { createMockParam } from "../../core/utils";

/** @typedef {import("@asu/unity-react-core/src/core/types/feed-types").FeedType } FeedType */

export default {
  title: "News component/Card List News",
  component: CardListlNews,
  parameters: {
    docs: {
      description: {
        component: " ",
      },
    },
    mockData: createMockParam(),
  },
};

const Template = args => <CardListlNews {...args} />;
/**
 * @type {{ args: FeedType, parameters: object}}
 */
export const Default = Template.bind({});
Default.args = {
  header: {
    color: "dark",
    text: "News List",
  },
  ctaButton: {
    url: "https://news.asu.edu",
  },
  dataSource: {
    url: "/api/mocks/feeds-json",
  },
};
Default.parameters = {
  docs: {
    description: {
      story: " ",
    },
  },
};

/**
 * @type {{ args: FeedType, parameters: object}}
 */
export const WithCardButtonProps = Template.bind({});
WithCardButtonProps.args = {
  header: {
    color: "dark",
    text: "News List",
  },
  ctaButton: {
    color: "maroon",
    url: "https://news.asu.edu",
    text: "Click to see more news",
  },
  dataSource: {
    url: "/api/mocks/feeds-json",
  },
  cardButton: {
    color: "gold",
    text: "Read news",
    size: "default", //   "default" | "small" | "medium" | "large"
  },
};
WithCardButtonProps.parameters = {
  docs: {
    description: {
      story: " ",
    },
  },
};

/**
 * @type {{ args: FeedType, parameters: object}}
 */
export const WithFilters = Template.bind({});
WithFilters.args = {
  header: {
    color: "dark",
    text: "News List Filtered",
  },
  ctaButton: {
    color: "maroon",
    url: "https://news.asu.edu",
    text: "Click to see more news",
  },
  dataSource: {
    url: "/api/mocks/feeds-json",
    filters:
      "nursing_and_health_care,School of Mathematical and Natural Sciences,Student",
    // filters: "Nursing and Health Care",
    // filters: "Health,Journalism",
  },
};
WithFilters.parameters = {
  docs: {
    description: {
      story: " ",
    },
  },
};

/**
 * @type {{ args: FeedType, parameters: object}}
 */
export const WithMaxItems = Template.bind({});
WithMaxItems.args = {
  header: {
    color: "dark",
    text: "News List",
  },
  ctaButton: {
    color: "maroon",
    url: "https://news.asu.edu",
    text: "Click to see more news",
  },
  dataSource: {
    url: "/api/mocks/feeds-json",
  },
  maxItems: 2,
};
WithMaxItems.parameters = {
  docs: {
    description: {
      story: " ",
    },
  },
};

/**
 * @type {{ args: FeedType, parameters: object}}
 */
export const WithNoHeader = Template.bind({});
WithNoHeader.args = {
  dataSource: {
    url: "/api/mocks/feeds-json",
  },
};
WithNoHeader.parameters = {
  docs: {
    description: {
      story: " ",
    },
  },
};
