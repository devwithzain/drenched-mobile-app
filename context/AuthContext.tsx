import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import apiClient from "@/services/apiClient";

interface User {
	id: number;
	name: string;
	email: string;
	role: string;
	image?: string | null;
}

interface AuthContextType {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (
		email: string,
		password: string,
	) => Promise<{ success: boolean; message?: string }>;
	register: (
		name: string,
		email: string,
		password: string,
	) => Promise<{ success: boolean; message?: string; errors?: any }>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// Load stored token and user profile on app start
	useEffect(() => {
		const loadStorageData = async () => {
			try {
				const storedToken = await SecureStore.getItemAsync("auth_token");
				if (storedToken) {
					setToken(storedToken);
					// Fetch user profile from backend to verify token validity
					const response = await apiClient.get("/user");
					if (response.data && response.data.success) {
						setUser(response.data.user);
					} else {
						// Clean stale token
						await SecureStore.deleteItemAsync("auth_token");
					}
				}
			} catch (error) {
				console.log("Error loading stored auth data", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadStorageData();
	}, []);

	const login = async (email: string, password: string) => {
		try {
			const response = await apiClient.post("/login", { email, password });
			if (response.data && response.data.success) {
				const { access_token, user: loggedUser } = response.data;
				await SecureStore.setItemAsync("auth_token", access_token);
				setToken(access_token);
				setUser(loggedUser);
				return { success: true };
			}
			return {
				success: false,
				message: response.data.message || "Login failed",
			};
		} catch (error: any) {
			const message =
				error.response?.data?.message ||
				"Invalid credentials or connection error";
			return { success: false, message };
		}
	};

	const register = async (name: string, email: string, password: string) => {
		try {
			const response = await apiClient.post("/register", {
				name,
				email,
				password,
				password_confirmation: password,
			});
			if (response.data && response.data.success) {
				const { access_token, user: loggedUser } = response.data;
				await SecureStore.setItemAsync("auth_token", access_token);
				setToken(access_token);
				setUser(loggedUser);
				return { success: true };
			}
			return {
				success: false,
				message: response.data.message || "Registration failed",
				errors: response.data.errors,
			};
		} catch (error: any) {
			const data = error.response?.data;
			return {
				success: false,
				message: data?.message || "An error occurred during registration",
				errors: data?.errors,
			};
		}
	};

	const logout = async () => {
		try {
			await apiClient.post("/logout");
		} catch (error) {
			console.log("Error logging out from server", error);
		} finally {
			await SecureStore.deleteItemAsync("auth_token");
			setToken(null);
			setUser(null);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				isAuthenticated: !!token,
				isLoading,
				login,
				register,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
