import {
	View,
	Text,
	Image,
	TextInput,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import Icon from "@expo/vector-icons/FontAwesome5";

export default function EditProfileScreen() {
	const router = useRouter();
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";

	return (
		<ScrollView
			className="flex-1 bg-white dark:bg-slate-900"
			showsVerticalScrollIndicator={false}>
			<View className="items-center pt-14 pb-8">
				<View className="relative mb-4">
					<Image
						source={{
							uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
						}}
						className="h-24 w-24 rounded-full"
					/>
					<View className="absolute bottom-0 right-0 h-8 w-8 items-center justify-center rounded-full border-2 border-white dark:border-slate-900 bg-primary">
						<Icon
							name="pen"
							size={12}
							color="#fff"
						/>
					</View>
				</View>
				<Text className="mb-1 text-2xl font-semibold text-textDark dark:text-slate-100">
					Edit Profile
				</Text>
				<Text className="text-sm text-textMedium dark:text-slate-400">
					Refine your spiritual journey
				</Text>
			</View>
			<View className="px-5">
				<View className="mb-5">
					<Text className="mb-2 text-[11px] uppercase tracking-[0.5px] text-textMedium dark:text-slate-400">
						Full Name
					</Text>
					<TextInput
						className="rounded-2xl bg-slate-100 dark:bg-slate-800 px-4 py-4 text-[15px] text-textDark dark:text-slate-100"
						defaultValue="Elena Rivers"
						placeholderTextColor={isDark ? "#64748b" : "#9CA3AF"}
					/>
				</View>
				<View className="mb-5">
					<Text className="mb-2 text-[11px] uppercase tracking-[0.5px] text-textMedium dark:text-slate-400">
						Spiritual Focus
					</Text>
					<View className="relative">
						<TextInput
							className="rounded-2xl bg-slate-100 dark:bg-slate-800 px-4 py-4 pr-12 text-[15px] text-textDark dark:text-slate-100"
							defaultValue="Finding Inner Peace"
							placeholderTextColor={isDark ? "#64748b" : "#9CA3AF"}
						/>
						<View className="absolute right-4 top-5">
							<Icon
								name="chevron-down"
								size={12}
								color={isDark ? "#94a3b8" : "#6B7280"}
							/>
						</View>
					</View>
				</View>
				<View className="mb-5">
					<Text className="mb-2 text-[11px] uppercase tracking-[0.5px] text-textMedium dark:text-slate-400">
						Your Journey (Bio)
					</Text>
					<TextInput
						className="h-28 rounded-2xl bg-slate-100 dark:bg-slate-800 px-4 py-4 text-[15px] text-textDark dark:text-slate-100"
						defaultValue="Seeking stillness in the chaos of daily life. I find my peace by the water and in the quiet of early mornings with the Word."
						placeholderTextColor={isDark ? "#64748b" : "#9CA3AF"}
						multiline
						numberOfLines={4}
						textAlignVertical="top"
					/>
				</View>
				<View className="mb-5">
					<Text className="mb-2 text-[11px] uppercase tracking-[0.5px] text-textMedium dark:text-slate-400">
						Guided Themes
					</Text>
					<View className="flex-row flex-wrap gap-2">
						<View className="rounded-full bg-pink-100 dark:bg-pink-900 px-4 py-2">
							<Text className="text-[13px] font-medium text-pink-700 dark:text-pink-300">
								Peace
							</Text>
						</View>
						<View className="rounded-full bg-pink-100 dark:bg-pink-900 px-4 py-2">
							<Text className="text-[13px] font-medium text-pink-700 dark:text-pink-300">
								Anxiety
							</Text>
						</View>
						<View className="rounded-full bg-pink-100 dark:bg-pink-900 px-4 py-2">
							<Text className="text-[13px] font-medium text-pink-700 dark:text-pink-300">
								Hope
							</Text>
						</View>
						<TouchableOpacity className="rounded-full bg-slate-100 dark:bg-slate-800 px-4 py-2">
							<Text className="text-[13px] text-textMedium dark:text-slate-400">
								+ Add More
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<View className="mx-5 my-5 rounded-3xl bg-textMedium dark:bg-slate-700 p-6">
				<Text className="mb-2 text-xl font-semibold italic text-white">
					Privacy & Peace
				</Text>
				<Text className="text-[13px] leading-5 text-white/90">
					Your profile information is only used to personalize your meditation
					and scripture recommendations. Your journey is your own.
				</Text>
			</View>
			<View className="flex-row gap-3 px-5 pb-8">
				<TouchableOpacity
					className="flex-1 items-center rounded-full border border-border dark:border-slate-600 py-4"
					onPress={() => router.back()}>
					<Text className="text-base font-medium text-textDark dark:text-slate-100">
						Cancel
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					className="flex-[2] items-center rounded-full bg-primary py-4"
					onPress={() => router.back()}>
					<Text className="text-base font-semibold text-white">
						Save Changes
					</Text>
				</TouchableOpacity>
			</View>
			<View className="h-10" />
		</ScrollView>
	);
}
