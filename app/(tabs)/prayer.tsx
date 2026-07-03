import {
	View,
	Text,
	Image,
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
import { PRAYER_COLLECTIONS } from "@/constants/data";

export default function PrayerScreen() {
	const router = useRouter();
	const { loadTrack } = useAudio();
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";

	const handlePlayDaily = () => {
		const dailyPrayer = {
			id: "daily-prayer",
			title: "Finding Stillness",
			image:
				"https://images.unsplash.com/photo-1506905921706-5a1aa25f9038?w=600",
			navigator: "Drenched Worship",
			audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
		};
		loadTrack(dailyPrayer);
		router.push({
			pathname: "/player",
			params: { item: JSON.stringify(dailyPrayer) },
		});
	};

	const handlePlayUpNext = () => {
		const upNextTrack = {
			id: "up-next-prayer",
			title: "Calming Waves Meditation",
			image:
				"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100",
			navigator: "Drenched Worship",
			audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
		};
		loadTrack(upNextTrack);
		router.push({
			pathname: "/player",
			params: { item: JSON.stringify(upNextTrack) },
		});
	};

	const handlePlayCollection = (item: (typeof PRAYER_COLLECTIONS)[0]) => {
		const track = {
			id: item.id,
			title: item.title,
			image:
				"https://images.unsplash.com/photo-1506905921706-5a1aa25f9038?w=600",
			navigator: "Drenched Worship",
			audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
		};
		loadTrack(track);
		router.push({
			pathname: "/player",
			params: { item: JSON.stringify(track) },
		});
	};

	return (
		<ScrollView
			className="flex-1 bg-white dark:bg-slate-900"
			showsVerticalScrollIndicator={false}>
			<ImageBackground
				source={require("../../assets/images/prayerHero.png")}
				className="h-[480px] justify-center items-center p-5">
				<View className="absolute inset-0 bg-black/10" />
				<View className="absolute top-[50px] right-5 w-full flex flex-row justify-between items-center">
					<Text className="text-[22px] font-semibold text-white">Prayer</Text>
					<TouchableOpacity
						className="w-10 h-10 bg-white/20 rounded-full justify-center items-center"
						onPress={() => router.push("/settings")}>
						<Icon
							name="cog"
							size={18}
							color={Colors.white}
						/>
					</TouchableOpacity>
				</View>
				<View className="items-center">
					<Text className="text-[12px] tracking-[3px] text-white/90 uppercase mb-5">
						DAILY PRAYER
					</Text>
					<TouchableOpacity
						className="w-[70px] h-[70px] bg-white/30 backdrop-blur-md rounded-full justify-center items-center mb-4 border-2 border-white/30"
						onPress={handlePlayDaily}>
						<Icon
							name="play"
							size={28}
							color={Colors.white}
							className="ml-1"
						/>
					</TouchableOpacity>
					<Text className="w-[200px] text-[24px] italic text-white">
						Finding Stillness
					</Text>
				</View>
			</ImageBackground>
			<View
				style={{ backgroundColor: Colors.primary }}
				className="mx-5 -mt-10 rounded-[24px] p-7 items-center z-10">
				<Icon
					name="quote-left"
					size={32}
					color="rgba(255,255,255,0.8)"
					className="mb-3"
				/>
				<Text className="text-[18px] leading-7 text-white italic text-center mb-4">
					{
						'"The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters."'
					}
				</Text>
				<Text className="text-[12px] font-bold text-white tracking-widest mb-5">
					PSALM 23:1-2
				</Text>
				<View className="flex-row gap-[30px]">
					<TouchableOpacity className="flex-row items-center gap-[6px]">
						<Icon
							name="share-alt"
							size={14}
							color={Colors.white}
						/>
						<Text className="text-white text-[13px]"> Share</Text>
					</TouchableOpacity>
					<TouchableOpacity className="flex-row items-center gap-[6px]">
						<Icon
							name="bookmark"
							size={14}
							color={Colors.white}
						/>
						<Text className="text-white text-[13px]"> Save</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View className="flex-row justify-between items-center px-5 pt-6 pb-4">
				<Text className="text-[22px] font-semibold text-textDark dark:text-slate-100">
					Prayer Collections
				</Text>
				<TouchableOpacity>
					<Text className="text-primary text-[12px] font-semibold uppercase tracking-wider">
						VIEW ALL
					</Text>
				</TouchableOpacity>
			</View>
			{PRAYER_COLLECTIONS.map((item) => (
				<TouchableOpacity
					key={item.id}
					className="flex-row items-center gap-4 py-4 px-5 border-b border-border dark:border-slate-700"
					activeOpacity={0.7}
					onPress={() => handlePlayCollection(item)}>
					<View
						style={{ backgroundColor: item.iconBg }}
						className="w-12 h-12 rounded-[14px] justify-center items-center">
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
						<Text className="text-[13px] text-textMedium dark:text-slate-400">
							{item.subtitle}
						</Text>
					</View>
					<Icon
						name="chevron-right"
						size={14}
						color={isDark ? "#475569" : Colors.textLight}
					/>
				</TouchableOpacity>
			))}
			<TouchableOpacity
				className="flex-row items-center gap-3 p-3 mx-5 mt-5 rounded-[16px] bg-slate-100 dark:bg-slate-800"
				onPress={handlePlayUpNext}
				activeOpacity={0.9}>
				<Image
					source={{
						uri: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100",
					}}
					className="w-10 h-10 rounded-[10px]"
				/>
				<View className="flex-1">
					<Text className="text-[10px] uppercase tracking-widest text-textLight dark:text-slate-500">
						UP NEXT
					</Text>
					<Text className="text-[14px] font-semibold text-textDark dark:text-slate-100">
						Calming Waves Meditation
					</Text>
				</View>
				<View className="w-8 h-8 rounded-full bg-textDark dark:bg-slate-200 justify-center items-center">
					<Icon
						name="play"
						size={12}
						color={isDark ? Colors.textDark : Colors.white}
						className="ml-[2px]"
					/>
				</View>
			</TouchableOpacity>
			<View className="h-[120px]" />
		</ScrollView>
	);
}
