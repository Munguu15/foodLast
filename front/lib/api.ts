const API = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/$/, "");

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("nomnom-token");
};

export const getStoredUser = () => {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem("nomnom-user");
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

export const apiFetch = (path: string, options: RequestInit = {}) => {
  const token = getToken();
  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }
  if (token) headers.set("Authorization", `Bearer ${token}`);

  return fetch(`${API}${path}`, { ...options, headers });
};
