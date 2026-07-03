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
import Colors from "@/constants/colors";
import { useColorScheme } from "nativewind";
import Icon from "@expo/vector-icons/FontAwesome5";

export default function CreateAccountScreen() {
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
					<Text className="text-[32px] text-textDark dark:text-slate-100 mb-2 font-semibold">
						Begin your journey
					</Text>
					<Text className="text-textMedium dark:text-slate-400 text-[15px] leading-[22px]">
						Create an account to save your progress and meditations.
					</Text>
				</View>
				<View className="mb-5">
					<Text className="text-[12px] font-semibold text-textMedium dark:text-slate-400 mb-2 uppercase tracking-[0.5px]">
						Full Name
					</Text>
					<TextInput
						className="bg-slate-100 dark:bg-slate-800 rounded-[14px] p-4 text-[15px] text-textDark dark:text-slate-100"
						placeholder="Evelyn Thorne"
						placeholderTextColor={isDark ? "#64748b" : Colors.textLight}
					/>
				</View>
				<View className="mb-5">
					<Text className="text-[12px] font-semibold text-textMedium dark:text-slate-400 mb-2 uppercase tracking-[0.5px]">
						Email Address
					</Text>
					<TextInput
						className="bg-slate-100 dark:bg-slate-800 rounded-[14px] p-4 text-[15px] text-textDark dark:text-slate-100"
						placeholder="hello@example.com"
						placeholderTextColor={isDark ? "#64748b" : Colors.textLight}
						keyboardType="email-address"
						autoCapitalize="none"
					/>
				</View>
				<View className="mb-5">
					<Text className="text-[12px] font-semibold text-textMedium dark:text-slate-400 mb-2 uppercase tracking-[0.5px]">
						Password
					</Text>
					<TextInput
						className="bg-slate-100 dark:bg-slate-800 rounded-[14px] p-4 text-[15px] text-textDark dark:text-slate-100"
						placeholder="••••••••"
						placeholderTextColor={isDark ? "#64748b" : Colors.textLight}
						secureTextEntry
					/>
				</View>
				<View className="mb-5">
					<Text className="text-[12px] font-semibold text-textMedium dark:text-slate-400 mb-2 uppercase tracking-[0.5px]">
						Confirm Password
					</Text>
					<TextInput
						className="bg-slate-100 dark:bg-slate-800 rounded-[14px] p-4 text-[15px] text-textDark dark:text-slate-100"
						placeholder="••••••••"
						placeholderTextColor={isDark ? "#64748b" : Colors.textLight}
						secureTextEntry
					/>
				</View>
				<TouchableOpacity
					className="bg-primary p-4 rounded-[30px] items-center mt-2"
					activeOpacity={0.8}
					onPress={() => router.replace("/(tabs)")}>
					<Text className="text-white text-[16px] font-semibold">
						Create Account
					</Text>
				</TouchableOpacity>
				<View className="flex-row items-center my-6 gap-4">
					<View className="flex-1 h-[1px] bg-border dark:bg-slate-700" />
					<Text className="text-textLight dark:text-slate-500 text-[13px]">OR JOIN WITH</Text>
					<View className="flex-1 h-[1px] bg-border dark:bg-slate-700" />
				</View>
				<View className="flex-row justify-center gap-5 mb-6">
					<TouchableOpacity className="w-[50px] h-[50px] rounded-[25px] bg-slate-100 dark:bg-slate-800 justify-center items-center">
						<Icon
							name="facebook-f"
							size={20}
							color={isDark ? "#e2e8f0" : Colors.textDark}
						/>
					</TouchableOpacity>
					<TouchableOpacity className="w-[50px] h-[50px] rounded-[25px] bg-slate-100 dark:bg-slate-800 justify-center items-center">
						<Icon
							name="google"
							size={20}
							color={isDark ? "#e2e8f0" : Colors.textDark}
						/>
					</TouchableOpacity>
				</View>
				<View className="flex-row justify-center mt-2">
					<Text className="text-textMedium dark:text-slate-400 text-[14px]">
						Already have an account?{" "}
					</Text>
					<TouchableOpacity onPress={() => router.push("/(auth)/login")}>
						<Text className="text-textDark dark:text-slate-100 font-semibold text-[14px]">
							Sign In
						</Text>
					</TouchableOpacity>
				</View>
				<Text className="text-center text-[11px] text-textLight dark:text-slate-500 mt-5 leading-[18px]">
					By creating an account, you agree to our{" "}
					<Text className="text-textMedium dark:text-slate-400 underline">Terms of Service</Text>{" "}
					and <Text className="text-textMedium dark:text-slate-400 underline">Privacy Policy</Text>.
				</Text>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
