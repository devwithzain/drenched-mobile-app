import React from "react";
import { useRouter } from "expo-router";
import Colors from "@/constants/colors";
import Icon from "@expo/vector-icons/FontAwesome5";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useColorScheme } from "nativewind";

interface ToggleProps {
	value: boolean;
	onValueChange: (val: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ value, onValueChange }) => (
	<TouchableOpacity
		className={`w-[50px] h-[28px] rounded-[14px] justify-center px-[2px] ${
			value ? "bg-primary" : "bg-border"
		}`}
		activeOpacity={0.8}
		onPress={() => onValueChange(!value)}>
		<View
			className={`w-6 h-6 rounded-full bg-white shadow-sm elevation-2 ${
				value ? "self-end" : "self-start"
			}`}
		/>
	</TouchableOpacity>
);

export default function SettingsScreen() {
	const router = useRouter();
	const { colorScheme, setColorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";

	const handleDarkModeToggle = (val: boolean) => {
		setColorScheme(val ? "dark" : "light");
	};

	return (
		<ScrollView
			className="flex-1 bg-white dark:bg-slate-900"
			showsVerticalScrollIndicator={false}>
			<View className="px-5 pt-[50px] pb-5">
				<TouchableOpacity
					className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 justify-center items-center mb-2.5"
					onPress={() => router.back()}>
					<Icon
						name="arrow-left"
						size={18}
						color={isDark ? "#e2e8f0" : Colors.textDark}
					/>
				</TouchableOpacity>
				<Text className="text-[28px] text-textDark dark:text-slate-100 font-semibold">
					Settings
				</Text>
				<Text className="text-[14px] text-textMedium dark:text-slate-400 leading-5 mt-1">
					Customize your sanctuary experience and manage your personal spiritual
					journey.
				</Text>
			</View>
			{/* Account */}
			<View className="px-5 mb-2">
				<View className="flex-row items-center gap-3 mb-4">
					<View className="w-10 h-10 rounded-full justify-center items-center bg-cyan-100 dark:bg-cyan-900">
						<Icon
							name="user"
							size={18}
							color={Colors.primary}
						/>
					</View>
					<Text className="text-[18px] font-semibold text-textDark dark:text-slate-100">
						Account
					</Text>
				</View>
				<View className="bg-slate-100 dark:bg-slate-800 rounded-[16px] p-4 mb-3">
					<Text className="text-[11px] text-textLight dark:text-slate-400 uppercase tracking-[0.5px] mb-1">
						Email Address
					</Text>
					<Text className="text-[15px] text-textDark dark:text-slate-200 mb-2">
						grace.walker@divine.com
					</Text>
					<TouchableOpacity>
						<Text className="text-primary text-[13px] font-medium">Change</Text>
					</TouchableOpacity>
				</View>
				<View className="bg-slate-100 dark:bg-slate-800 rounded-[16px] p-4 mb-3">
					<Text className="text-[11px] text-textLight dark:text-slate-400 uppercase tracking-[0.5px] mb-1">
						Password
					</Text>
					<Text className="text-[15px] text-textDark dark:text-slate-200 mb-2">••••••••••••</Text>
					<TouchableOpacity>
						<Text className="text-primary text-[13px] font-medium">Update</Text>
					</TouchableOpacity>
				</View>
			</View>
			{/* Preferences */}
			<View className="px-5 mb-2">
				<View className="flex-row items-center gap-3 mb-4">
					<View className="w-10 h-10 rounded-full justify-center items-center bg-pink-100 dark:bg-pink-950">
						<Icon
							name="sliders-h"
							size={18}
							color="#db2777"
						/>
					</View>
					<Text className="text-[18px] font-semibold text-textDark dark:text-slate-100">
						Preferences
					</Text>
				</View>
				<View className="bg-slate-100 dark:bg-slate-800 rounded-[16px] p-4 mb-3">
					<View className="flex-row justify-between items-center py-3.5 border-b border-border dark:border-slate-700">
						<View className="flex-row items-center">
							<Icon
								name="moon"
								size={18}
								color={isDark ? "#94a3b8" : Colors.textMedium}
							/>
							<Text className="text-[15px] text-textDark dark:text-slate-200"> Dark Mode</Text>
						</View>
						<Toggle
							value={isDark}
							onValueChange={handleDarkModeToggle}
						/>
					</View>
					<View className="flex-row justify-between items-center py-3.5">
						<View className="flex-row items-center">
							<Icon
								name="globe"
								size={18}
								color={isDark ? "#94a3b8" : Colors.textMedium}
							/>
							<Text className="text-[15px] text-textDark dark:text-slate-200"> Language</Text>
						</View>
						<Text className="text-textMedium dark:text-slate-400 text-[14px]">
							English (US){" "}
							<Icon
								name="chevron-right"
								size={10}
								color={isDark ? "#64748b" : Colors.textLight}
							/>
						</Text>
					</View>
				</View>
			</View>
			{/* Privacy */}
			<View className="px-5 mb-2">
				<View className="flex-row items-center gap-3 mb-4">
					<View className="w-10 h-10 rounded-full justify-center items-center bg-orange-100 dark:bg-orange-950">
						<Icon
							name="shield-alt"
							size={18}
							color="#ea580c"
						/>
					</View>
					<Text className="text-[18px] font-semibold text-textDark dark:text-slate-100">
						Privacy
					</Text>
				</View>
				<View className="bg-slate-100 dark:bg-slate-800 rounded-[16px] p-4 mb-3">
					<TouchableOpacity className="flex-row justify-between items-center py-3.5 border-b border-border dark:border-slate-700">
						<Text className="text-[15px] text-textDark dark:text-slate-200">Data Sharing</Text>
						<Icon
							name="chevron-right"
							size={12}
							color={isDark ? "#64748b" : Colors.textLight}
						/>
					</TouchableOpacity>
					<TouchableOpacity className="flex-row justify-between items-center py-3.5">
						<Text className="text-[15px] text-textDark dark:text-slate-200">Terms of Service</Text>
						<Icon
							name="chevron-right"
							size={12}
							color={isDark ? "#64748b" : Colors.textLight}
						/>
					</TouchableOpacity>
				</View>
			</View>
			<TouchableOpacity
				className="mx-5 mt-5 mb-5 p-4 border border-red-200 dark:border-red-900 rounded-[30px] flex-row items-center justify-center gap-2"
				activeOpacity={0.8}
				onPress={() => router.replace("/(auth)/welcome")}>
				<Icon
					name="sign-out-alt"
					size={16}
					color={Colors.danger}
				/>
				<Text className="text-danger font-semibold text-[13px] tracking-widest">
					LOG OUT OF SANCTUARY
				</Text>
			</TouchableOpacity>
			<View className="h-10" />
		</ScrollView>
	);
}
