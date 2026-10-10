import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
});

let getToken: (() => Promise<string | undefined>) | null = null;

export function setAuthTokenProvider(fn: () => Promise<string | undefined>) {
  getToken = fn;
}

apiClient.interceptors.request.use(async (config) => {
	const token = await getToken?.();
	if (token) config.headers.Authorization = `Bearer ${token}`
	return config;
})