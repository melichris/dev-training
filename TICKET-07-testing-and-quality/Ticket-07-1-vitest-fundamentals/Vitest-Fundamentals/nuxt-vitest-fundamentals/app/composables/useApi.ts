export const useApi = () => {
  const $fetch = async <T>(
    url: string,
  ): Promise<{ data: T | null; error: string | null }> => {
    try {
      const data = await globalThis.$fetch<T>(url);
      return { data, error: null };
    } catch {
      return { data: null, error: "Request failed" };
    }
  };
  return { $fetch };
};
