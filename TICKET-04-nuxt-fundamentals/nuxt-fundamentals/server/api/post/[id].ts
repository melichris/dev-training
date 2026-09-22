export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  await sleep(2000);
  const posts = [
    { id: 1, title: "First Post", body: "This is the first post." },
    { id: 2, title: "Second Post", body: "This is the second post." },
    { id: 3, title: "Third Post", body: "This is the third post." },
  ];

  const post = posts.find((p) => p.id === Number(id));

  return post;
});
