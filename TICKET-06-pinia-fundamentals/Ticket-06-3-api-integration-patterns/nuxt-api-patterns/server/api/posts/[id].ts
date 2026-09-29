import { mockPost } from "~~/server/data/posts";

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, "id"));
  const post = mockPost.find((p) => p.id === id);
  if (!post)
    throw createError({ statusCode: 404, statusMessage: "Post Not found " });
  return post;
});
