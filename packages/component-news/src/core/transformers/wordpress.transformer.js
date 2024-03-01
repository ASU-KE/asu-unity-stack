import { format, formatISO, parseISO } from "date-fns";
import { shortenText } from "../utils/shorten-text";

// Transformer data function provided to the high order component
const transformData = (post) => ({
  id: post.id,
  headerImageUrl: post.uds_story_hero?.background_image?.sizes?.medium,
  heroImageUrl: post.uds_story_hero?.background_image?.url,
  featuredImageUrl:
    post.uds_featured_image?.source_url,
  featuredImageAltText: post.uds_featured_image?.alt_text,
  title: shortenText(post.title.rendered, 80),
  slug: post.slug,
  content: post.content.rendered,
  excerpt: post.excerpt.rendered,
  date: format(parseISO(post.date), "MMM d, yyyy"),
  dateIso: formatISO(parseISO(post.date), {
    format: "basic",
    representation: "date",
  }),
  storyLink: post.storyLink,
  interests: post.interest,
  newsUnits: post.college_unit,
  author: {
    name: post.uds_news_author?.name,
    title: post.uds_news_author?.title,
    // affiliation: post.uds_news_author?.affiliation,
    email: post.uds_news_author?.email,
    phone: post.uds_news_author?.phone,
  },
});

export { transformData };
