import {
	View,
	Text,
	Platform,
	TextInput,
	ScrollView,
	TouchableOpacity,
	KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import Icon from "@expo/vector-icons/FontAwesome5";

export default function ForgotPasswordScreen() {
	const router = useRouter();
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			className="flex-1 bg-white dark:bg-slate-900">
			<ScrollView
				contentContainerClassName="px-6 pt-20"
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}>
				<View className="mb-10">
					<Text className="text-[32px] font-semibold text-textDark dark:text-slate-100 mb-2">
						Restore Peace
					</Text>
					<Text className="text-[15px] leading-6 text-center text-textMedium dark:text-slate-400">
						Enter your email address below. We will send a secure link to reset
						your account credentials and get you back to your practice.
					</Text>
				</View>
				<View className="mb-5">
					<Text className="mb-2 text-xs font-semibold tracking-widest uppercase text-textMedium dark:text-slate-400">
						Email Address
					</Text>
					<TextInput
						className="bg-slate-100 dark:bg-slate-800 rounded-[14px] p-4 text-[15px] text-textDark dark:text-slate-100"
						placeholder="name@example.com"
						placeholderTextColor={isDark ? "#64748b" : "#9CA3AF"}
						keyboardType="email-address"
						autoCapitalize="none"
					/>
				</View>
				<TouchableOpacity className="items-center py-4 mt-2 rounded-full bg-primary">
					<Text className="text-base font-semibold text-white">
						Send Reset Link
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					className="flex-row items-center justify-center mt-8"
					onPress={() => router.push("/(auth)/login")}>
					<Icon
						name="arrow-left"
						size={14}
						color={isDark ? "#e2e8f0" : "#111827"}
					/>
					<Text className="ml-2 text-sm font-semibold text-textDark dark:text-slate-100">
						Back to Sign In
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
