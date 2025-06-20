// 📁 src/utils/authFetch.ts
export const authFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('accessToken');

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  return fetch(url, config);
};
