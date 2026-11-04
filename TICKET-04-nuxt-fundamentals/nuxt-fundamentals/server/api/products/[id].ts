import { products } from '../../utils/products'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");

  if (!id || !/^\d+$/.test(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid product id",
    });
  }

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
    });
  }

  return product;
});
