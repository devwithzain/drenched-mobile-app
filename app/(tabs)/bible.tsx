import {
	View,
	Text,
	Platform,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { Feather } from "@expo/vector-icons";
import { BIBLE_VERSES } from "@/constants/data";
import { useAudio } from "@/context/AudioContext";
import Icon from "@expo/vector-icons/FontAwesome5";

const getSuperscript = (numStr: string) => {
	const map: Record<string, string> = {
		"0": "⁰",
		"1": "¹",
		"2": "²",
		"3": "³",
		"4": "⁴",
		"5": "⁵",
		"6": "⁶",
		"7": "⁷",
		"8": "⁸",
		"9": "⁹",
	};
	return numStr
		.split("")
		.map((char) => map[char] || char)
		.join("");
};

export default function BibleScreen() {
	const router = useRouter();
	const { loadTrack } = useAudio();
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";

	const handlePlayAudio = () => {
		const psalm23Track = {
			id: "psalm-23",
			title: "Psalm 23 Narration",
			image:
				"https://images.unsplash.com/photo-1513001900722-370f8de71bd7?w=400",
			narrator: "Drenched Scripture",
			audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
		};
		loadTrack(psalm23Track);
		router.push({
			pathname: "/player",
			params: { item: JSON.stringify(psalm23Track) },
		});
	};

	const serifFont = {
		fontFamily: Platform.select({ ios: "Georgia", android: "serif" }),
	};

	return (
		<View className="flex-1 bg-white dark:bg-slate-900">
			<ScrollView
				className="flex-1"
				showsVerticalScrollIndicator={false}>
				<View className="flex-row justify-between items-center px-5 pt-14 pb-5">
					<View className="flex-row items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full border border-gray-200 dark:border-slate-700 shadow-sm elevation-1">
						<Text className="text-sm font-semibold text-gray-800 dark:text-slate-200">
							Psalms
						</Text>
						<Icon
							name="chevron-down"
							size={10}
							color={isDark ? "#e2e8f0" : "#1f2937"}
						/>
						<Text className="text-gray-200 dark:text-slate-600 mx-0.5">|</Text>
						<Text className="text-sm font-semibold text-gray-800 dark:text-slate-200">
							23
						</Text>
						<Icon
							name="chevron-down"
							size={10}
							color={isDark ? "#e2e8f0" : "#1f2937"}
						/>
					</View>
					<View className="flex-row gap-2">
						<TouchableOpacity className="w-9 h-9 rounded-full justify-center items-center">
							<Feather
								name="search"
								size={18}
								color="#0056C6"
							/>
						</TouchableOpacity>
						<TouchableOpacity className="w-9 h-9 rounded-full justify-center items-center">
							<Feather
								name="edit"
								size={18}
								color="#0056C6"
							/>
						</TouchableOpacity>
					</View>
				</View>
				<View className="px-6 pt-5">
					<Text
						style={serifFont}
						className="text-3xl text-center text-gray-800 dark:text-slate-100 mb-1.5 italic">
						Psalm 23
					</Text>
					<Text className="text-center text-[10px] text-gray-400 dark:text-slate-500 tracking-widest uppercase mb-10 font-semibold">
						THE LORD IS MY SHEPHERD
					</Text>
					{BIBLE_VERSES.map((verse) => (
						<Text
							key={verse.number}
							style={serifFont}
							className="text-lg leading-[30px] text-gray-800 dark:text-slate-200 mb-6 text-left">
							<Text className="text-[11px] leading-[18px] text-gray-400 dark:text-slate-500 font-bold">
								{getSuperscript(verse.number)}
							</Text>{" "}
							{verse.text}
						</Text>
					))}
				</View>
				<View className="h-40" />
			</ScrollView>
			<View className="absolute bottom-[85px] self-center flex-row items-center bg-white dark:bg-slate-800 rounded-full px-5 py-2.5 shadow-lg elevation-6 border border-gray-200 dark:border-slate-700 gap-4">
				<TouchableOpacity
					className="flex-row items-center py-1.5 px-3"
					activeOpacity={0.7}
					onPress={handlePlayAudio}>
					<Feather
						name="headphones"
						size={16}
						color="#0056C6"
					/>
					<Text className="text-[#0056C6] text-13 font-semibold ml-1.5">
						Audio
					</Text>
				</TouchableOpacity>
				<View className="w-[1px] h-[18px] bg-gray-200 dark:bg-slate-600" />
				<TouchableOpacity
					className="p-1.5 px-2.5 justify-center items-center"
					activeOpacity={0.7}>
					<Feather
						name="bookmark"
						size={16}
						color={isDark ? "#94a3b8" : "#6b7280"}
					/>
				</TouchableOpacity>
				<View className="w-[1px] h-[18px] bg-gray-200 dark:bg-slate-600" />
				<TouchableOpacity
					className="p-1.5 px-2.5 justify-center items-center"
					activeOpacity={0.7}>
					<Text
						style={serifFont}
						className="text-base font-bold text-gray-500 dark:text-slate-400">
						Tt
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
