import { posts, type Post } from "../../utils/posts";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id || Number.isNaN(Number(id))) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid post id",
    });
  }

  const post = posts.find((item: Post) => item.id === Number(id));

  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: "Post not found",
    });
  }

  return post;
});
