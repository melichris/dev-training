import type { ApiResponse } from "@/types/api";
import { FetchError } from "ofetch";

export async function useApi<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const data = (await $fetch<any>(url)) as T;
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
