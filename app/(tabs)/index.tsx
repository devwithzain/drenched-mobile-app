import {
	Text,
	View,
	Image,
	Platform,
	ScrollView,
	ImageBackground,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Colors from "@/constants/colors";
import { useColorScheme } from "nativewind";
import { useAudio } from "@/context/AudioContext";
import Icon from "@expo/vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";
import { MEDITATIONS, MUSIC, PRAYERS, STORIES } from "@/constants/data";

const resolveImageSource = (image: any) => {
	if (typeof image === "string") {
		return { uri: image };
	}
	return image;
};

export default function HomeScreen() {
	const router = useRouter();
	const { loadTrack } = useAudio();
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";

	const renderSectionHeader = (
		title: string,
		linkText: string,
		onPress: () => void,
	) => (
		<View className="flex-row justify-between items-center px-5 pt-7 pb-3.5">
			<Text
				className="text-[22px] font-bold text-textDark dark:text-slate-100"
				style={{
					fontFamily: Platform.select({ ios: "Georgia", android: "serif" }),
				}}>
				{title}
			</Text>
			<TouchableOpacity onPress={onPress}>
				<Text className="text-primary text-[10px] font-semibold uppercase tracking-wider">
					{linkText}
				</Text>
			</TouchableOpacity>
		</View>
	);

	return (
		<ScrollView
			className="flex-1 bg-white dark:bg-slate-900"
			showsVerticalScrollIndicator={false}>
			<ImageBackground
				source={require("../../assets/images/heroBg.png")}
				className="h-[720px] justify-center items-center px-5 relative"
				resizeMode="cover">
				<View className="absolute inset-0 bg-black/15" />
				<View className="absolute top-[60px] bg-white/20 px-3.5 py-1.5 rounded-full flex-row items-center gap-1.5 border border-white/15">
					<View className="w-1.5 h-1.5 rounded-full bg-danger" />
					<Text className="text-white text-[10px] font-semibold tracking-wider">
						LIVE SESSION
					</Text>
				</View>
				<View className="absolute top-1/2 -translate-y-1/2 items-center justify-centers z-10">
					<Text
						className="text-[34px] italic font-light text-white leading-[44px] text-center"
						style={{
							fontFamily: Platform.select({ ios: "Georgia", android: "serif" }),
						}}>
						Immersed.{"\n"}Soaked.{"\n"}Saturated.
					</Text>
					<View className="w-[120px] h-[1px] bg-white/40 my-3.5" />
					<Text className="text-[10px] tracking-[3px] text-white/90 font-medium uppercase">
						WELCOME TO DRENCHED
					</Text>
				</View>
				<LinearGradient
					colors={
						isDark
							? ["transparent", "rgba(15,23,42,0.85)", "#0f172a"]
							: ["transparent", "rgba(255,255,255,0.75)", "#ffffff"]
					}
					className="absolute inset-x-0 bottom-0 h-[120px]"
				/>
			</ImageBackground>
			{renderSectionHeader("Daily Meditation", "SEE MORE", () => {})}
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					paddingHorizontal: 20,
					paddingBottom: 16,
					gap: 16,
				}}>
				{MEDITATIONS.map((item) => (
					<TouchableOpacity
						key={item.id}
						className="w-[270px] bg-transparent"
						activeOpacity={0.9}
						onPress={() => {
							loadTrack(item);
							router.push({
								pathname: "/player",
								params: { item: JSON.stringify(item) },
							});
						}}>
						<View className="w-full h-[155px] rounded-2xl overflow-hidden relative">
							<Image
								source={resolveImageSource(item.image)}
								className="w-full h-full"
								width={200}
								height={200}
							/>
							<View className="absolute top-2.5 left-2.5 bg-white/90 px-2 py-1 rounded-[10px]">
								<Text className="text-[9px] font-bold text-textDark">
									{item.duration}
								</Text>
							</View>
						</View>
						<View className="py-2.5">
							<Text className="text-[15px] font-semibold text-textDark dark:text-slate-100 mb-0.5">
								{item.title}
							</Text>
							<Text className="text-[12px] text-textMedium dark:text-slate-400">
								{item.subtitle}
							</Text>
						</View>
					</TouchableOpacity>
				))}
			</ScrollView>
			{renderSectionHeader("Bedtime Stories", "LIBRARY", () =>
				router.push("/(tabs)/stories"),
			)}
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					paddingHorizontal: 20,
					paddingBottom: 16,
					gap: 16,
				}}>
				{STORIES.slice(0, 2).map((item) => (
					<TouchableOpacity
						key={item.id}
						className="w-[270px] bg-transparent"
						activeOpacity={0.9}
						onPress={() => {
							loadTrack(item);
							router.push({
								pathname: "/player",
								params: { item: JSON.stringify(item) },
							});
						}}>
						<View className="w-full h-[155px] rounded-2xl overflow-hidden relative">
							<Image
								source={resolveImageSource(item.image)}
								className="w-full h-full object-cover"
							/>
							<View className="absolute top-2.5 left-2.5 bg-white/90 px-2 py-1 rounded-[10px]">
								<Text className="text-[9px] font-bold text-textDark">
									{item.duration.toUpperCase()}
								</Text>
							</View>
						</View>
						<View className="py-2.5">
							<Text className="text-[15px] font-semibold text-textDark dark:text-slate-100 mb-0.5">
								{item.title}
							</Text>
							<Text className="text-[12px] text-textMedium dark:text-slate-400">
								{item.narrator}
							</Text>
						</View>
					</TouchableOpacity>
				))}
			</ScrollView>
			{renderSectionHeader("God's Music", "EXPLORE MORE", () =>
				router.push("/gods-music"),
			)}
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					paddingHorizontal: 20,
					paddingBottom: 16,
					gap: 16,
				}}>
				{MUSIC.slice(0, 2).map((item) => (
					<TouchableOpacity
						key={item.id}
						className="w-[270px] bg-transparent"
						activeOpacity={0.9}
						onPress={() => {
							const track = {
								id: item.id,
								title: item.reference,
								image: item.image,
								narrator: item.quote,
								audioUrl: item.audioUrl,
							};
							loadTrack(track);
							router.push({
								pathname: "/player",
								params: { item: JSON.stringify(track) },
							});
						}}>
						<View className="w-full h-[155px] rounded-2xl overflow-hidden relative">
							<Image
								source={resolveImageSource(item.image)}
								className="w-full h-full"
							/>
							<View className="absolute top-2.5 left-2.5 bg-white/90 px-2 py-1 rounded-[10px]">
								<Text className="text-[9px] font-bold text-textDark">
									MUSIC
								</Text>
							</View>
						</View>
						<View className="py-2.5">
							<Text className="text-[15px] font-semibold text-textDark dark:text-slate-100 mb-0.5">
								{item.reference}
							</Text>
							<Text
								className="text-[12px] text-textMedium dark:text-slate-400 italic"
								numberOfLines={1}>
								{item.quote}
							</Text>
						</View>
					</TouchableOpacity>
				))}
			</ScrollView>
			{renderSectionHeader("Recent Prayers", "JOURNAL", () => {})}
			{PRAYERS.map((item) => (
				<View
					key={item.id}
					className="flex-row items-center gap-4 py-3.5 px-5">
					<View
						className="w-10 h-10 rounded-full justify-center items-center"
						style={{ backgroundColor: item.iconColor }}>
						<Icon
							name={item.icon}
							size={15}
							color={Colors.white}
							solid
						/>
					</View>
					<View className="flex-1">
						<Text className="text-[15px] font-semibold text-textDark dark:text-slate-100 mb-0.5">
							{item.title}
						</Text>
						<Text className="text-[12px] text-textMedium dark:text-slate-400">
							{item.time}
						</Text>
					</View>
					<TouchableOpacity className="p-1">
						<Icon
							name="ellipsis-h"
							size={14}
							color={isDark ? "rgba(255,255,255,0.2)" : "rgba(0, 0, 0, 0.2)"}
						/>
					</TouchableOpacity>
				</View>
			))}
			<View style={{ height: 120 }} />
		</ScrollView>
	);
}
