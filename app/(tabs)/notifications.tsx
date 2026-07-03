import React, { useState } from "react";
import { useRouter } from "expo-router";
import Colors from "@/constants/colors";
import { useColorScheme } from "nativewind";
import Icon from "@expo/vector-icons/FontAwesome5";
import { REMINDERS, Reminder } from "@/constants/data";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

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

export default function NotificationsScreen() {
	const router = useRouter();
	const [reminders, setReminders] = useState<Reminder[]>(REMINDERS);
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";

	const toggleReminder = (id: string) => {
		setReminders((prev) =>
			prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)),
		);
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
					Gentle Reminders
				</Text>
				<Text className="text-[14px] text-textMedium dark:text-slate-400 leading-5 mt-1">
					Configure your daily rhythm. These subtle prompts are designed to help
					you stay present and grounded throughout your journey.
				</Text>
			</View>
			{reminders.map((item) => (
				<View
					key={item.id}
					className="px-5 py-5 border-b border-border dark:border-slate-700">
					<View className="flex-row items-center gap-4 mb-3">
						<View
							className="w-12 h-12 rounded-[14px] justify-center items-center"
							style={{ backgroundColor: item.iconBg }}>
							<Icon
								name={item.icon}
								size={20}
								color={item.iconColor}
							/>
						</View>
						<View className="flex-1">
							<Text className="text-[16px] font-semibold text-textDark dark:text-slate-100 mb-1">
								{item.title}
							</Text>
							<Text className="text-[13px] text-textMedium dark:text-slate-400 leading-[18px]">
								{item.description}
							</Text>
						</View>
						<Toggle
							value={item.enabled}
							onValueChange={() => toggleReminder(item.id)}
						/>
					</View>
					<View className="flex-row items-center gap-3 pl-16 flex-wrap">
						<Text className="text-[13px] text-textMedium dark:text-slate-400">
							Scheduled for
						</Text>
						{item.day && (
							<View className="px-3.5 py-1.5 bg-primary rounded-full">
								<Text className="text-white text-[12px] font-semibold">
									{item.day}
								</Text>
							</View>
						)}
						<View className="flex-row items-center gap-1.5 px-3.5 py-2 bg-slate-100 dark:bg-slate-800 rounded-full">
							<Icon
								name="clock"
								size={12}
								color={isDark ? "#e2e8f0" : Colors.textDark}
							/>
							<Text className="text-[13px] text-textDark dark:text-slate-200 font-medium">
								{" "}
								{item.time}
							</Text>
						</View>
					</View>
				</View>
			))}
			<View className="h-10" />
		</ScrollView>
	);
}
