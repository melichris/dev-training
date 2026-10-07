import { FetchError } from "ofetch";
interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}
export async function useApi<T>(
  url: string,
  options?: object,
): Promise<ApiResponse<T>> {
  try {
    const data = await $fetch<T>(url, options);
    return { data, error: null };
  } catch (err) {
    let message = "An unknown error occurred";

    if (err instanceof FetchError) {
      message = err.data?.message || err.statusMessage || err.message;
    } else if (err instanceof Error) {
      message = err.message;
    }

    return {
      data: null,
      error: message,
    };
  }
}
