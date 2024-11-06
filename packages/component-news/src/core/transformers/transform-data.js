// @ts-check
import { shortenText } from "../utils/shorten-text";

// Transformer data function provided to the high order component
const transformData = ({ node }, index) => ({
  index,
  id: node.nid,
  imageUrl: node.image_url,
  imageAltText: node.image_alt,
  title: shortenText(node.title, 80),
  content: shortenText(node?.clas_teaser, 140),
  buttonLink: node.path,
  interests: node.interests,
  newsUnits: node.news_units,
  eventTypes: node.event_types,
  alias: node.path, // Used for card link in title, matches component-events data transformer
});

export { transformData };
