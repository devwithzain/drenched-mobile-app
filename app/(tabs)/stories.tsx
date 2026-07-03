import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Image,
	TextInput,
	Platform,
} from "react-native";
import {
	FILTER_TABS,
	discoverPeaceStories,
	recentlyListenedItems,
	recommendationStories,
} from "@/constants/data";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import Colors from "@/constants/colors";
import { useAudio } from "@/context/AudioContext";
import Icon from "@expo/vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "nativewind";

export default function StoriesScreen() {
	const router = useRouter();
	const { loadTrack } = useAudio();
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";
	const [activeTab, setActiveTab] = useState("Recommendations");
	const [searchQuery, setSearchQuery] = useState("");

	const filteredDiscoverPeace = discoverPeaceStories.filter((item) =>
		item.title.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const filteredRecAsaph = recommendationStories.filter((item) =>
		item.title.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const filteredRecRecent = recentlyListenedItems.filter((item) =>
		item.title.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const serifFont = {
		fontFamily: Platform.select({ ios: "Georgia", android: "serif" }),
	};

	return (
		<ScrollView
			className="flex-1 bg-white dark:bg-slate-900"
			showsVerticalScrollIndicator={false}>
			<View className="flex-row justify-between items-center px-5 pt-[60px] pb-[15px]">
				<View className="flex-1">
					<Text
						style={serifFont}
						className="text-[32px] text-textDark dark:text-slate-100 font-bold">
						Bedtime Stories
					</Text>
					<Text className="text-[10px] text-textLight dark:text-slate-500 uppercase tracking-[2px] mt-1">
						LIBRARY
					</Text>
				</View>
				<TouchableOpacity
					className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 justify-center items-center border border-border dark:border-slate-700 shadow-sm elevation-1"
					activeOpacity={0.7}
					onPress={() => router.push("/notifications")}>
					<Icon
						name="bell"
						size={16}
						color={isDark ? "#e2e8f0" : Colors.textDark}
					/>
				</TouchableOpacity>
			</View>
			<View className="flex-row items-center gap-3 bg-white dark:bg-slate-800 mx-5 px-4 py-3 rounded-[14px] mb-5 border border-border dark:border-slate-700 shadow-sm elevation-1">
				<Icon
					name="search"
					size={16}
					color={isDark ? "#64748b" : Colors.textLight}
				/>
				<TextInput
					className="flex-1 text-[14px] text-textDark dark:text-slate-100 p-0"
					placeholder="Search stories, scriptures..."
					placeholderTextColor={isDark ? "#64748b" : Colors.textLight}
					value={searchQuery}
					onChangeText={setSearchQuery}
				/>
			</View>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerClassName="px-5 pb-6 gap-2.5">
				{FILTER_TABS.map((tab) => (
					<TouchableOpacity
						key={tab}
						className={`px-5 py-2 rounded-full border ${
							activeTab === tab
								? "bg-primary border-primary"
								: isDark
								? "bg-slate-800 border-slate-700"
								: "bg-white border-border"
						}`}
						onPress={() => setActiveTab(tab)}>
						<Text
							className={`text-[13px] ${
								activeTab === tab
									? "text-white font-semibold"
									: "text-textMedium dark:text-slate-400"
							}`}>
							{tab}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
			{activeTab === "Recommendations" ? (
				<View>
					<View className="flex-row justify-between items-center px-5 pt-2 pb-4">
						<Text className="text-[22px] text-textDark dark:text-slate-100 font-bold">
							New Stories
						</Text>
						<TouchableOpacity>
							<Text className="text-primary text-[12px] font-semibold">
								View All
							</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						className="mx-5 mb-7 rounded-[24px] overflow-hidden h-[200px] relative"
						activeOpacity={0.9}
						onPress={() => {
							const featuredTonight = {
								id: "featured-tonight",
								title: "Bed Time Bible Stories",
								image:
									"https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=600",
								narrator: "Drenched Worship",
								audioUrl:
									"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
								duration: "18 mins",
							};
							loadTrack(featuredTonight);
							router.push({
								pathname: "/player",
								params: { item: JSON.stringify(featuredTonight) },
							});
						}}>
						<Image
							source={{
								uri: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=600",
							}}
							className="w-full h-full"
						/>
						<LinearGradient
							colors={["transparent", "rgba(0,0,0,0.85)"]}
							className="absolute left-0 right-0 bottom-0 h-[120px]"
						/>
						<View className="absolute bottom-0 left-0 right-0 p-5">
							<Text className="text-[9px] tracking-[2px] text-white/70 font-bold mb-1.5">
								FEATURED TONIGHT
							</Text>
							<Text className="text-[20px] text-white mb-1.5 font-bold">
								Bed Time Bible Stories
							</Text>
							<View className="flex-row items-center gap-1.5">
								<Icon
									name="clock"
									size={10}
									color="rgba(255,255,255,0.7)"
								/>
								<Text className="text-[12px] text-white/75">18 mins</Text>
								<Text className="text-[12px] text-white/50">•</Text>
								<Text className="text-[12px] text-white/75">
									Drenched Worship
								</Text>
							</View>
						</View>
						<View className="absolute right-5 bottom-5 w-[46px] h-[46px] bg-white rounded-full justify-center items-center shadow-md elevation-4">
							<Icon
								name="play"
								size={14}
								color={Colors.primary}
								style={{ marginLeft: 2 }}
							/>
						</View>
					</TouchableOpacity>
					<View className="flex-row justify-between items-center px-5 pt-2 pb-4">
						<Text className="text-[22px] text-textDark dark:text-slate-100 font-bold">
							Psalms of Asaph
						</Text>
						<TouchableOpacity>
							<Text className="text-primary text-[12px] font-semibold">
								Browse Collection
							</Text>
						</TouchableOpacity>
					</View>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerClassName="px-5 pb-7 gap-4">
						{filteredRecAsaph.map((item) => (
							<TouchableOpacity
								key={item.id}
								className="w-[165px] bg-white dark:bg-slate-900"
								activeOpacity={0.9}
								onPress={() => {
									loadTrack(item);
									router.push({
										pathname: "/player",
										params: { item: JSON.stringify(item) },
									});
								}}>
								<Image
									source={{ uri: item.image }}
									className="w-[165px] h-[165px] rounded-[20px] mb-2.5"
								/>
								<View className="px-0.5">
									<Text
										className="text-[15px] font-semibold text-textDark dark:text-slate-100 mb-[3px]"
										numberOfLines={1}>
										{item.title}
									</Text>
									<Text
										className="text-[12px] text-textMedium dark:text-slate-400"
										numberOfLines={1}>
										{item.subtitle}
									</Text>
								</View>
							</TouchableOpacity>
						))}
					</ScrollView>
					<View className="flex-row justify-between items-center px-5 pt-2 pb-4">
						<Text className="text-[22px] text-textDark dark:text-slate-100 font-bold">
							Recently Listened
						</Text>
					</View>
					{filteredRecRecent.map((item) => (
						<TouchableOpacity
							key={item.id}
							className="flex-row items-center gap-4 bg-white dark:bg-slate-800 mx-5 mb-3 p-3 rounded-[16px] border border-border dark:border-slate-700 shadow-sm elevation-1"
							activeOpacity={0.9}
							onPress={() => {
								loadTrack(item);
								router.push({
									pathname: "/player",
									params: { item: JSON.stringify(item) },
								});
							}}>
							<Image
								source={{ uri: item.image }}
								className="w-[52px] h-[52px] rounded-[12px]"
							/>
							<View className="flex-1">
								<Text className="text-[15px] font-semibold text-textDark dark:text-slate-100 mb-1">
									{item.title}
								</Text>
								<Text className="text-[12px] text-textMedium dark:text-slate-400">
									{item.subtitle}
								</Text>
							</View>
							<TouchableOpacity
								className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-full justify-center items-center"
								activeOpacity={0.7}
								onPress={(e) => {
									e.stopPropagation();
									loadTrack(item);
									router.push({
										pathname: "/player",
										params: { item: JSON.stringify(item) },
									});
								}}>
								<Icon
									name={item.completed ? "redo" : "play"}
									size={10}
									color={isDark ? "#e2e8f0" : Colors.textDark}
									style={!item.completed && { marginLeft: 2 }}
								/>
							</TouchableOpacity>
						</TouchableOpacity>
					))}
				</View>
			) : (
				<View>
					<View className="px-5 pt-2 pb-4">
						<Text
							style={serifFont}
							className="text-[26px] text-textDark dark:text-slate-100 font-bold">
							Discover Peace
						</Text>
					</View>
					{filteredDiscoverPeace.map((item) => (
						<TouchableOpacity
							key={item.id}
							className="mx-5 mb-5 rounded-[24px] overflow-hidden h-[220px] relative"
							activeOpacity={0.9}
							onPress={() => {
								loadTrack(item);
								router.push({
									pathname: "/player",
									params: { item: JSON.stringify(item) },
								});
							}}>
							<Image
								source={{ uri: item.image }}
								className="w-full h-full"
							/>
							<LinearGradient
								colors={["transparent", "rgba(0,0,0,0.8)"]}
								className="absolute left-0 right-0 bottom-0 h-[140px]"
							/>
							<View className="absolute bottom-0 left-0 right-0 p-5">
								{item.tag && (
									<View className="self-start bg-amber-100 px-2.5 py-1 rounded-[12px] mb-2">
										<Text className="text-[9px] font-bold text-amber-700 tracking-[0.5px]">
											{item.tag}
										</Text>
									</View>
								)}
								<Text
									style={serifFont}
									className="text-[22px] text-white font-bold mb-2">
									{item.title}
								</Text>
								<View className="flex-row items-center gap-1.5">
									<Icon
										name="clock"
										size={10}
										color="rgba(255,255,255,0.7)"
									/>
									<Text className="text-[12px] text-white/75">
										{item.duration}
									</Text>
								</View>
							</View>
						</TouchableOpacity>
					))}
				</View>
			)}
			<View className="h-[50px]" />
		</ScrollView>
	);
}
