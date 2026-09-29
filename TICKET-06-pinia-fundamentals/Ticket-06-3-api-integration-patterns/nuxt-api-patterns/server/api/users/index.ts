import { mockUsers } from "~~/server/data/users";

export default defineEventHandler(() => {
  return mockUsers;
});
