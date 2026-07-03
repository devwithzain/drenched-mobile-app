import React, { useState } from "react";
import Colors from "@/constants/colors";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import Icon from "@expo/vector-icons/FontAwesome5";
import { SUBSCRIPTION_FEATURES, PLANS } from "@/constants/data";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

export default function SubscriptionScreen() {
	const router = useRouter();
	const [selectedPlan, setSelectedPlan] = useState("1");
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";

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
				<Text className="text-[32px] text-textDark dark:text-slate-100 leading-10 mb-3 font-bold">
					Unlock the Full{"\n"}
					<Text className="font-normal text-textMedium dark:text-slate-400">
						Drenched
					</Text>
					{"\n"}
					Experience
				</Text>
				<Text className="text-[14px] text-textMedium dark:text-slate-400 leading-5">
					Elevate your spiritual journey with exclusive content designed to
					bring peace to your daily rhythm.
				</Text>
			</View>
			<Image
				source={{
					uri: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
				}}
				className="h-[200px] rounded-[24px] mx-5 mb-6"
			/>
			<View className="px-5">
				{SUBSCRIPTION_FEATURES.map((item) => (
					<View
						key={item.id}
						className="flex-row gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-[20px] mb-3">
						<View className="w-11 h-11 rounded-[14px] bg-white dark:bg-slate-700 justify-center items-center">
							<Icon
								name={item.icon}
								size={20}
								color={isDark ? "#e2e8f0" : Colors.textDark}
							/>
						</View>
						<View className="flex-1">
							<Text className="text-[15px] font-semibold text-textDark dark:text-slate-100 mb-1">
								{item.title}
							</Text>
							<Text className="text-[13px] text-textMedium dark:text-slate-400 leading-[18px]">
								{item.description}
							</Text>
						</View>
					</View>
				))}
			</View>
			{PLANS.map((plan) => {
				const isSelected = selectedPlan === plan.id;
				const borderClass = isSelected
					? "border-primary"
					: plan.popular
						? isDark
							? "border-slate-300"
							: "border-textDark"
						: isDark
							? "border-slate-700"
							: "border-border";
				return (
					<TouchableOpacity
						key={plan.id}
						className={`mx-5 mb-3 p-5 border-2 rounded-[20px] relative ${borderClass} ${isDark ? "bg-slate-800" : "bg-white"}`}
						activeOpacity={0.9}
						onPress={() => setSelectedPlan(plan.id)}>
						{plan.popular && (
							<View className="absolute -top-3 right-5 bg-primary px-3 py-1 rounded-full">
								<Text className="text-white text-[10px] font-bold tracking-[0.5px]">
									MOST POPULAR
								</Text>
							</View>
						)}
						<View className="flex-row justify-between items-start mb-1">
							<Text className="text-[18px] font-bold text-textDark dark:text-slate-100">
								{plan.name}
							</Text>
							<View className="items-end">
								<Text className="text-[24px] font-bold text-textDark dark:text-slate-100">
									{plan.price}
								</Text>
								<Text className="text-[12px] text-textMedium dark:text-slate-400">
									{plan.period}
								</Text>
							</View>
						</View>
						<Text className="text-[13px] text-textMedium dark:text-slate-400">
							{plan.description}
						</Text>
					</TouchableOpacity>
				);
			})}
			<TouchableOpacity
				className="bg-primary mx-5 mt-5 p-[18px] rounded-[30px] items-center"
				activeOpacity={0.8}>
				<Text className="text-white text-[14px] font-bold tracking-[0.5px]">
					START YOUR 7-DAY FREE TRIAL
				</Text>
			</TouchableOpacity>
			<Text className="text-center text-[12px] text-textLight dark:text-slate-500 mt-3 mb-5">
				No commitment. Cancel anytime during your trial period.
			</Text>
			<View className="h-10" />
		</ScrollView>
	);
}
