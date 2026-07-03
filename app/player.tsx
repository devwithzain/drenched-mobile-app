import {
	View,
	Text,
	Image,
	Platform,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/colors";
import { useColorScheme } from "nativewind";
import Icon from "@expo/vector-icons/FontAwesome5";
import Slider from "@react-native-community/slider";
import { useAudio, Track } from "@/context/AudioContext";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function PlayerScreen() {
	const router = useRouter();
	const params = useLocalSearchParams();
	const rawItem = params.item;
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";

	const {
		currentTrack,
		isPlaying,
		togglePlay,
		loadTrack,
		progress,
		positionMs,
		durationMs,
		seek,
		skip,
	} = useAudio();

	const [isSeeking, setIsSeeking] = useState(false);
	const [seekProgress, setSeekProgress] = useState(0);

	let passedTrack: Track | null = null;
	if (typeof rawItem === "string") {
		try {
			passedTrack = JSON.parse(rawItem);
		} catch {
			// Ignore
		}
	}

	const displayTrack = passedTrack ||
		currentTrack || {
			id: "dp-1",
			title: "Walking with the Spirit",
			image:
				"https://images.unsplash.com/photo-1448375240586-882707db888b?w=600",
			narrator: "John Doe",
			audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
		};

	const isCurrentTrackLoaded = currentTrack?.id === displayTrack.id;

	const handlePlayPause = async () => {
		if (isCurrentTrackLoaded) {
			await togglePlay();
		} else {
			await loadTrack(displayTrack);
		}
	};

	const formatTime = (ms: number) => {
		if (isNaN(ms) || ms <= 0) return "00:00";
		const totalSeconds = Math.floor(ms / 1000);
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	};

	const formatRemainingTime = (pos: number, dur: number) => {
		if (isNaN(dur) || dur <= 0) return "-00:00";
		const remaining = dur - pos;
		return `-${formatTime(remaining)}`;
	};

	const getScriptureTag = (trackId: string) => {
		switch (trackId) {
			case "dp-1":
			case "featured-tonight":
				return "Psalm 23:2";
			case "asaph-1":
				return "Psalm 73:1";
			case "quiet-stillness":
				return "Psalm 46:10";
			case "recent-1":
				return "Psalm 23:1";
			case "recent-2":
				return "Lamentations 3:22";
			default:
				return "Psalm 23:2";
		}
	};

	const activeProgress = isSeeking
		? seekProgress
		: isCurrentTrackLoaded
			? progress
			: 0;
	const activePositionMs = isSeeking ? seekProgress * durationMs : positionMs;

	const serifFont = {
		fontFamily: Platform.select({ ios: "Georgia", android: "serif" }),
	};

	return (
		<View className="flex-1 bg-white dark:bg-slate-900">
			<ScrollView
				className="flex-1"
				contentContainerClassName="pb-[110px]"
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

				<View className="items-center px-6 pt-10">
					<View className="relative w-[290px] h-[290px] rounded-[30px] mb-[35px] shadow-lg elevation-8">
						<Image
							source={{ uri: displayTrack.image }}
							className="w-full h-full rounded-[30px]"
						/>
						<View className="absolute bottom-3 right-3 bg-white/85 px-3.5 py-1.5 rounded-[14px]">
							<Text className="text-[12px] font-semibold text-textDark">
								{getScriptureTag(displayTrack.id)}
							</Text>
						</View>
					</View>
					<Text
						style={serifFont}
						className="text-[26px] text-textDark dark:text-slate-100 font-semibold mb-2 text-center">
						{displayTrack.title}
					</Text>
					<View className="flex-row items-center gap-1.5 mb-[35px]">
						<Feather
							name="mic"
							size={14}
							color={isDark ? "#94a3b8" : Colors.textMedium}
						/>
						<Text className="text-[14px] text-textMedium dark:text-slate-400">
							Narrated by {displayTrack.narrator || "John Doe"}
						</Text>
					</View>
					<View className="w-full mb-5">
						<Slider
							style={{ width: "100%", height: 40 }}
							value={activeProgress}
							minimumValue={0}
							maximumValue={1}
							minimumTrackTintColor={Colors.primary}
							maximumTrackTintColor={isDark ? "#475569" : Colors.border}
							thumbTintColor={Colors.primary}
							onValueChange={(val) => {
								setIsSeeking(true);
								setSeekProgress(val);
							}}
							onSlidingComplete={async (val) => {
								if (isCurrentTrackLoaded) {
									await seek(val);
								}
								setIsSeeking(false);
							}}
						/>
						<View className="flex-row justify-between w-full px-[5px]">
							<Text className="text-[12px] text-textMedium dark:text-slate-400">
								{formatTime(activePositionMs)}
							</Text>
							<Text className="text-[12px] text-textMedium dark:text-slate-400">
								{formatRemainingTime(activePositionMs, durationMs)}
							</Text>
						</View>
					</View>
					<View className="flex-row items-center gap-[30px] mb-[45px] mt-1">
						<TouchableOpacity
							className="p-2.5"
							onPress={() => isCurrentTrackLoaded && skip(-5)}>
							<MaterialIcons
								name="replay-5"
								size={36}
								color={isDark ? "#94a3b8" : Colors.textMedium}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							className="w-[70px] h-[70px] bg-primary rounded-full justify-center items-center shadow-lg elevation-8"
							style={{
								shadowColor: Colors.primary,
								shadowOffset: { width: 0, height: 10 },
								shadowOpacity: 0.3,
								shadowRadius: 30,
							}}
							activeOpacity={0.9}
							onPress={handlePlayPause}>
							<Icon
								name={isCurrentTrackLoaded && isPlaying ? "pause" : "play"}
								size={22}
								color={Colors.white}
								style={
									isCurrentTrackLoaded && isPlaying ? null : { marginLeft: 3 }
								}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							className="p-2.5"
							onPress={() => isCurrentTrackLoaded && skip(5)}>
							<MaterialIcons
								name="forward-5"
								size={36}
								color={isDark ? "#94a3b8" : Colors.textMedium}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}
