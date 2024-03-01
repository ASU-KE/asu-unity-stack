import { format, formatISO, parse } from "date-fns";
import { shortenText } from "../utils/shorten-text";

// Transformer data function provided to the high order component
const transformData = ({ node }, index) => ({
  index,
  id: node.nid,
  headerImageUrl: node.image_url,
  headerImageAltText: node.title,
  title: shortenText(node.title, 80),
  excerpt: shortenText(node?.clas_teaser, 140),
  date: format(
    parse(node.post_date, "MM/dd/yyyy-h:mmaa", new Date()),
    "MMM d, yyyy"
  ),
  dateIso: formatISO(parse(node.post_date, "MM/dd/yyyy-h:mmaa", new Date()), {
    format: "basic",
    representation: "date",
  }),
  storyLink: node.path,
  interests: node.interests,
  newsUnits: node.news_units,
  eventTypes: node.event_types,
  author: {
    name: node["contributor-contact-information-name"],
    title: node["contributor-contact-information-title"],
    // affiliation: node[ 'contributor-contact-information-affiliation' ],
    email: node["contributor-contact-information-e-mail"],
    phone: node["contributor-contact-information-phone_number"],
  },
});

export { transformData };
