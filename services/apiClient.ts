import axios from "axios";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

// Dynamically extract the host IP address from Metro bundler, falling back to localhost
const getApiBaseUrl = () => {
	const hostUri = Constants.expoConfig?.hostUri; // e.g. "192.168.88.82:8081"
	if (hostUri) {
		const ip = hostUri.split(":")[0];
		return `http://${ip}:8000`;
	}
	return Platform.select({
		android: "http://10.0.2.2:8000",
		ios: "http://localhost:8000",
		default: "http://localhost:8000",
	});
};

export const API_BASE_URL = getApiBaseUrl();

console.log(API_BASE_URL);

const apiClient = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

// Request Interceptor: Auto-prepend '/api' to all requests and attach token
apiClient.interceptors.request.use(
	async (config) => {
		if (config.url && !config.url.startsWith("/api")) {
			const separator = config.url.startsWith("/") ? "" : "/";
			config.url = `/api${separator}${config.url}`;
		}

		try {
			const token = await SecureStore.getItemAsync("auth_token");
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		} catch (error) {
			console.error("Failed to retrieve auth token", error);
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export default apiClient;
