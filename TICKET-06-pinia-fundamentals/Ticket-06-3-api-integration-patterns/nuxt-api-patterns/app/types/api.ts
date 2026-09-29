export interface Post {
  id: number;
  title: string;
  body: string;
}
export interface User {
  id: number;
  name: string;
  emmail: string;
}
export type Status = "loading" | "success" | "error";

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}
