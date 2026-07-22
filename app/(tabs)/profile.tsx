import React from "react";
import { useRouter } from "expo-router";
import Colors from "@/constants/colors";
import { useColorScheme } from "nativewind";
import { PROFILE_MENU } from "@/constants/data";
import Icon from "@expo/vector-icons/FontAwesome5";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Image,
	ActivityIndicator,
} from "react-native";
import { useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/services/apiClient";

export default function ProfileScreen() {
	const router = useRouter();
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";
	const { user, logout, isLoading } = useAuth();

	const handleLogout = async () => {
		await logout();
		router.replace("/(auth)/welcome");
	};

	const avatarUri = user?.image
		? `${API_BASE_URL}/storage/${user.image}`
		: null;

	const initials = user?.name
		? user.name
				.split(" ")
				.map((n) => n[0])
				.slice(0, 2)
				.join("")
				.toUpperCase()
		: "?";

	const isAdmin = user?.role === "admin";

	if (isLoading) {
		return (
			<View className="flex-1 items-center justify-center bg-white dark:bg-slate-900">
				<ActivityIndicator
					size="large"
					color={Colors.primary}
				/>
			</View>
		);
	}

	return (
		<ScrollView
			className="flex-1 bg-white dark:bg-slate-900"
			showsVerticalScrollIndicator={false}>
			<View className="items-center pt-[50px] pb-[30px]">
				<View className="relative mb-4">
					{avatarUri ? (
						<Image
							source={{ uri: avatarUri }}
							className="w-[100px] h-[100px] rounded-full"
						/>
					) : (
						<View className="w-[100px] h-[100px] rounded-full bg-primary items-center justify-center">
							<Text className="text-white text-[36px] font-bold">
								{initials}
							</Text>
						</View>
					)}
					<TouchableOpacity
						className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full justify-center items-center border-[3px] border-white dark:border-slate-900"
						onPress={() => router.push("/edit-profile")}>
						<Icon
							name="pen"
							size={12}
							color={Colors.white}
						/>
					</TouchableOpacity>
				</View>

				<Text className="text-[24px] text-textDark dark:text-slate-100 mb-1 font-semibold">
					{user?.name ?? "Guest"}
				</Text>
				<Text className="text-[13px] text-textMedium dark:text-slate-400 mb-3">
					{user?.email ?? ""}
				</Text>

				<View className="flex-row items-center bg-primaryLight dark:bg-cyan-900 px-3.5 py-1.5 rounded-full">
					<Icon
						name={isAdmin ? "shield-alt" : "crown"}
						size={10}
						color={Colors.primary}
					/>
					<Text className="text-primary text-[12px] font-bold tracking-[0.5px]">
						{"  "}
						{isAdmin ? "ADMIN" : "PREMIUM MEMBER"}
					</Text>
				</View>
			</View>

			<View className="flex-row justify-around px-5 pb-[30px]">
				{[
					{ value: "1,240", label: "MIN. MEDITATED" },
					{ value: "84", label: "STORIES" },
					{ value: "12", label: "DAY STREAK" },
				].map((stat) => (
					<View
						key={stat.label}
						className="items-center">
						<Text className="text-[24px] font-bold text-textDark dark:text-slate-100 mb-1">
							{stat.value}
						</Text>
						<Text className="text-[11px] text-textMedium dark:text-slate-400 uppercase tracking-[0.5px]">
							{stat.label}
						</Text>
					</View>
				))}
			</View>

			<View className="px-5">
				{PROFILE_MENU.map((item) => (
					<TouchableOpacity
						key={item.id}
						className="flex-row items-center gap-4 py-4 border-b border-border dark:border-slate-700"
						onPress={() =>
							item.screen && router.push(`/${item.screen}` as any)
						}>
						<View className="w-10 h-10 rounded-[12px] bg-slate-100 dark:bg-slate-800 justify-center items-center">
							<Icon
								name={item.icon}
								size={18}
								color={isDark ? "#e2e8f0" : Colors.textDark}
							/>
						</View>
						<View className="flex-1">
							<Text className="text-[15px] font-medium text-textDark dark:text-slate-100">
								{item.title}
							</Text>
							{item.subtitle && (
								<Text className="text-[12px] text-textLight dark:text-slate-400 mt-0.5">
									{item.subtitle}
								</Text>
							)}
						</View>
						<Icon
							name="chevron-right"
							size={14}
							color={isDark ? "#475569" : Colors.textLight}
						/>
					</TouchableOpacity>
				))}
			</View>

			<TouchableOpacity
				className="flex-row items-center justify-center gap-2 mx-5 mt-6 mb-5 p-4 border border-red-200 dark:border-red-900 rounded-[16px]"
				onPress={handleLogout}>
				<Icon
					name="sign-out-alt"
					size={16}
					color={Colors.danger}
				/>
				<Text className="text-danger font-semibold text-[15px]"> Logout</Text>
			</TouchableOpacity>
			<View style={{ height: 120 }} />
		</ScrollView>
	);
}
