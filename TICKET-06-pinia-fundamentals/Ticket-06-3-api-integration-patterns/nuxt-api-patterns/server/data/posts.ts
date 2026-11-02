import type { Post } from "~/types/api";

export const mockPost: Post[] = [
  {
    id: 1,
    title: "Getting Started with TypeScript",
    body: "TypeScript adds static typing to JavaScript, helping you catch errors early and write more maintainable code.",
  },
  {
    id: 2,
    title: "Mastering Tailwind CSS Layouts",
    body: "Learn how to build complex, responsive user interfaces quickly using utility classes like flexbox and grid.",
  },
  {
    id: 3,
    title: "Understanding React Server Components",
    body: "Explore how Server Components can improve your application's initial load time by shifting rendering to the server.",
  },
  {
    id: 4,
    title: "A Guide to Modern State Management",
    body: "An overview of contemporary state management solutions in frontend development, from native hooks to external libraries.",
  },
  {
    id: 5,
    title: "Optimizing Web Performance",
    body: "Discover practical strategies for reducing bundle sizes, lazy loading components, and improving Core Web Vitals.",
  },
];
