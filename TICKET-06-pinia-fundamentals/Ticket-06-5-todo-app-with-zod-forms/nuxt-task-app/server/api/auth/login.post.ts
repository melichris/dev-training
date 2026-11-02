import { loginSchema } from "~~/shared/schemas/index";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const result = loginSchema.safeParse(body);

  if (!result.success) {
    throw createError({ statusCode: 400, data: result.error.issues });
  }

  return {
    token: "mock-token",
    username: result.data.username,
  };
});
