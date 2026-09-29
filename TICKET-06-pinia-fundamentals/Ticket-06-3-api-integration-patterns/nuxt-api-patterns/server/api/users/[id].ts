import { mockUsers } from "~~/server/data/users";

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, "id"));
  const user = mockUsers.find((u) => u.id === id);
  if (!user)
    throw createError({ statusCode: 404, statusMessage: "User not found" });
  return user;
});
