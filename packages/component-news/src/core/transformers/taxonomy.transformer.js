// Transformer data function provided to the high order component
const transformData = (post) => ({
  id: post.id,
  taxonomy: post.taxonomy,
  count: post.count,
  name: post.name,
  slug: post.slug,
  description: post.description,
  parent: post.parent,
});

export { transformData };
