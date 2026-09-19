const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Something went wrong" }));
    throw new Error(error.message || `Request failed with status ${res.status}`);
  }

  return res.json();
}