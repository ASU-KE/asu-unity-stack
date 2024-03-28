// @ts-check
import PropTypes from "prop-types";

const feedHeaderShape = PropTypes.shape({
  color: PropTypes.oneOf(["white", "dark"]),
  text: PropTypes.string,
});

const feedCtaButtonShape = PropTypes.shape({
  color: PropTypes.oneOf(["gold", "maroon", "gray", "dark"]),
  text: PropTypes.string,
});

const feedCardButtonShape = PropTypes.shape({
  color: PropTypes.oneOf(["gold", "maroon", "gray", "dark"]),
  text: PropTypes.string,
  size: PropTypes.string,
});

const feedDrupalDataSourceShape = PropTypes.shape({
  url: PropTypes.string,
  filters: PropTypes.string,
});

const feedWpRestFiltersShape = PropTypes.shape({
  units: PropTypes.string,
  interests: PropTypes.string,
  locations: PropTypes.string,
});

const feedKeGraphqlFiltersShape = PropTypes.shape({
  categories: PropTypes.string,
  tags: PropTypes.string,
  statusId: PropTypes.number,
});

const feedPaginationShape = PropTypes.shape({
  page: PropTypes.number,
  perPage: PropTypes.number,
  order: PropTypes.string,
  orderBy: PropTypes.string,
});

const feedWpRestDataSourceShape = PropTypes.shape({
  url: PropTypes.string,
  filters: feedWpRestFiltersShape,
  pagination: feedPaginationShape,
});

const feedKeGraphqlDataSourceShape = PropTypes.shape({
  url: PropTypes.string,
  filters: feedKeGraphqlFiltersShape,
  pagination: feedPaginationShape,
});

const feedComponentShape = PropTypes.shape({
  header: feedHeaderShape,
  ctaButton: feedCtaButtonShape,
  dataSource: feedDrupalDataSourceShape,
  maxItems: PropTypes.number,
});

export {
  feedComponentShape,
  feedHeaderShape,
  feedCtaButtonShape,
  feedWpRestFiltersShape,
  feedKeGraphqlFiltersShape,
  feedPaginationShape,
  feedDrupalDataSourceShape,
  feedWpRestDataSourceShape,
  feedKeGraphqlDataSourceShape,
  feedCardButtonShape,
};
