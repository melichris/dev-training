import { contactSchema } from "~~/shared/schemas/index";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const result = contactSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      data: result.error.issues,
    });
  }

  return {
    success: true,
    message: "Message received",
  };
});
