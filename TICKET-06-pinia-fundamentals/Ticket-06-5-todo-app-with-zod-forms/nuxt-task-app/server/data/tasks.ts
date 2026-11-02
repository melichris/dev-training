export interface Task {
  id: number;
  title: string;
  description?: string;
}

export const mockTasks: Task[] = [
  {
    id: 1,
    title: "Learn Pinia",
    description: "Study store composition and persistence",
  },
  {
    id: 2,
    title: "Build API layer",
    description: "Typed $fetch wrapper with generics",
  },
  {
    id: 3,
    title: "Master Zod",
    description: "Schema validation on client and server",
  },
];
