export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");

  const products = [
    {
      id: 1,
      title: "First Product",
      description: "This is the first product.",
      price: 19.99,
      thumbnail: "/images/product1.jpg",
    },
    {
      id: 2,
      title: "Second Product",
      description: "This is the second product.",
      price: 29.99,
      thumbnail: "/images/product2.jpg",
    },
    {
      id: 3,
      title: "Third Product",
      description: "This is the third product.",
      price: 39.99,
      thumbnail: "/images/product3.jpg",
    },
  ];

  const product = products.find((p) => p.id === Number(id));

  return product;
});
