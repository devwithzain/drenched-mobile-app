import {
	View,
	Text,
	Platform,
	TextInput,
	ScrollView,
	TouchableOpacity,
	KeyboardAvoidingView,
	Alert,
	ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import Icon from "@expo/vector-icons/FontAwesome5";
import { useAuth } from "@/context/AuthContext";

export default function LoginScreen() {
	const router = useRouter();
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";
	const { login } = useAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleLogin = async () => {
		if (!email.trim() || !password.trim()) {
			Alert.alert("Error", "Please fill in all fields");
			return;
		}

		setLoading(true);
		const result = await login(email, password);
		setLoading(false);

		if (result.success) {
			router.replace("/(tabs)");
		} else {
			Alert.alert("Login Failed", result.message || "An error occurred");
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			className="flex-1 bg-white dark:bg-slate-900">
			<ScrollView
				contentContainerClassName="px-6 pt-20"
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}>
				<View className="mb-10">
					<Text className="mb-2 text-[32px] font-semibold text-textDark dark:text-slate-100">
						Welcome Back
					</Text>
					<Text className="text-[15px] leading-6 text-textMedium dark:text-slate-400">
						Continue your journey of immersion.
					</Text>
				</View>
				<View className="mb-5">
					<Text className="mb-2 text-xs font-semibold uppercase tracking-[0.5px] text-textMedium dark:text-slate-400">
						Email Address
					</Text>
					<TextInput
						className="bg-slate-100 dark:bg-slate-800 rounded-[14px] p-4 text-[15px] text-textDark dark:text-slate-100"
						placeholder="name@sanctuary.com"
						placeholderTextColor={isDark ? "#64748b" : "#9CA3AF"}
						keyboardType="email-address"
						autoCapitalize="none"
						value={email}
						onChangeText={setEmail}
					/>
				</View>
				<View className="mb-5">
					<View className="mb-2 flex-row items-center justify-between">
						<Text className="text-xs font-semibold uppercase tracking-[0.5px] text-textMedium dark:text-slate-400">
							Password
						</Text>
					</View>
					<TextInput
						className="bg-slate-100 dark:bg-slate-800 rounded-[14px] p-4 text-[15px] text-textDark dark:text-slate-100"
						placeholder="••••••••"
						placeholderTextColor={isDark ? "#64748b" : "#9CA3AF"}
						secureTextEntry
						value={password}
						onChangeText={setPassword}
					/>
					<TouchableOpacity
						onPress={() => router.push("/(auth)/forgot-password")}>
						<Text className="text-[13px] text-textMedium dark:text-slate-400 text-right mt-2">
							Forgot Password?
						</Text>
					</TouchableOpacity>
				</View>
				<TouchableOpacity
					className="mt-2 items-center rounded-full bg-primary py-4 justify-center min-h-[52px]"
					onPress={handleLogin}
					disabled={loading}
					activeOpacity={0.8}>
					{loading ? (
						<ActivityIndicator color="#fff" />
					) : (
						<Text className="text-base font-semibold text-white">Sign In</Text>
					)}
				</TouchableOpacity>
				<View className="my-6 flex-row items-center">
					<View className="h-px flex-1 bg-border dark:bg-slate-700" />
					<Text className="mx-4 text-[13px] text-textLight dark:text-slate-500">
						OR
					</Text>
					<View className="h-px flex-1 bg-border dark:bg-slate-700" />
				</View>
				<View className="mb-6 flex-row justify-center gap-5">
					<TouchableOpacity className="h-[50px] w-[50px] items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
						<Icon
							name="facebook-f"
							size={20}
							color={isDark ? "#e2e8f0" : "#111827"}
						/>
					</TouchableOpacity>
					<TouchableOpacity className="h-[50px] w-[50px] items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
						<Icon
							name="google"
							size={20}
							color={isDark ? "#e2e8f0" : "#111827"}
						/>
					</TouchableOpacity>
				</View>
				<View className="mt-6 flex-row justify-center">
					<Text className="text-sm text-textMedium dark:text-slate-400">
						New to Drenched?{" "}
					</Text>
					<TouchableOpacity
						onPress={() => router.push("/(auth)/create-account")}>
						<Text className="text-sm font-semibold text-textDark dark:text-slate-100">
							Create Account
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
