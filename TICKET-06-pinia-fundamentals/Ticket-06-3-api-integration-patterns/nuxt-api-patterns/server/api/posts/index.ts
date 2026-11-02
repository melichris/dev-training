import { mockPost } from "~~/server/data/posts";

export default defineEventHandler(() => {
  return mockPost;
});
