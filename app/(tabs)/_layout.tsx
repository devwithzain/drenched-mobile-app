import { View } from "react-native";
import AppColors from "@/constants/colors";
import { useColorScheme } from "nativewind";
import MiniPlayer from "@/components/MiniPlayer";
import { useAudio } from "@/context/AudioContext";
import React, { useState, useEffect } from "react";
import Icon from "@expo/vector-icons/FontAwesome5";
import { Tabs, useRouter, usePathname } from "expo-router";

export default function TabLayout() {
	const router = useRouter();
	const pathname = usePathname();
	const { currentTrack } = useAudio();
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";
	const [miniPlayerClosed, setMiniPlayerClosed] = useState(false);

	useEffect(() => {
		if (currentTrack) {
			setMiniPlayerClosed(false);
		}
	}, [currentTrack]);

	const isPlayerTab = ["/", "/prayer", "/stories", "/gods-music"].includes(
		pathname,
	);
	const showMiniPlayer = isPlayerTab && !miniPlayerClosed && !!currentTrack;

	return (
		<View className="flex-1">
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: AppColors.primary,
					tabBarInactiveTintColor: isDark ? "#475569" : AppColors.textLight,
					headerShown: false,
					tabBarStyle: {
						backgroundColor: isDark ? "#0f172a" : AppColors.white,
						borderTopWidth: 1,
						borderTopColor: isDark ? "#1e293b" : AppColors.border,
						height: 80,
						paddingBottom: 12,
						paddingTop: 8,
					},
					tabBarLabelStyle: {
						fontSize: 10,
						fontWeight: "500",
						marginTop: 2,
					},
				}}>
				<Tabs.Screen
					name="index"
					options={{
						title: "Home",
						tabBarIcon: ({ color, focused }) => (
							<Icon
								name="home"
								size={18}
								color={color}
								solid={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="prayer"
					options={{
						title: "Prayer",
						tabBarIcon: ({ color, focused }) => (
							<Icon
								name="praying-hands"
								size={18}
								color={color}
								solid={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="stories"
					options={{
						title: "Stories",
						tabBarIcon: ({ color, focused }) => (
							<Icon
								name="book-open"
								size={18}
								color={color}
								solid={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="gods-music"
					options={{
						title: "Music",
						tabBarIcon: ({ color, focused }) => (
							<Icon
								name="music"
								size={18}
								color={color}
								solid={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="bible"
					options={{
						title: "Bible",
						tabBarIcon: ({ color, focused }) => (
							<Icon
								name="book"
								size={18}
								color={color}
								solid={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: "Profile",
						tabBarIcon: ({ color, focused }) => (
							<Icon
								name="user"
								size={18}
								color={color}
								solid={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="settings"
					options={{ href: null }}
				/>
				<Tabs.Screen
					name="notifications"
					options={{ href: null }}
				/>
				<Tabs.Screen
					name="subscription"
					options={{ href: null }}
				/>
				<Tabs.Screen
					name="edit-profile"
					options={{ href: null }}
				/>
			</Tabs>
			<MiniPlayer
				visible={showMiniPlayer}
				onPress={() =>
					router.push({
						pathname: "/player",
						params: { item: JSON.stringify(currentTrack) },
					})
				}
				onClose={() => setMiniPlayerClosed(true)}
			/>
		</View>
	);
}
