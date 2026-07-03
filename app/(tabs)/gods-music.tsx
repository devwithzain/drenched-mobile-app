import {
	View,
	Text,
	Image,
	Platform,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { musicItems } from "@/constants/data";
import { useAudio } from "@/context/AudioContext";

export default function GodsMusicScreen() {
	const router = useRouter();
	const { loadTrack } = useAudio();
	const { colorScheme } = useColorScheme();

	const serifFont = {
		fontFamily: Platform.select({ ios: "Georgia", android: "serif" }),
	};

	return (
		<ScrollView
			className="flex-1 bg-white dark:bg-slate-900"
			showsVerticalScrollIndicator={false}>
			<View className="px-5 pt-[60px] pb-5">
				<Text
					style={serifFont}
					className="text-[32px] text-textDark dark:text-slate-100 font-bold">
					God's Music
				</Text>
			</View>
			<View className="px-5">
				{musicItems.map((item) => (
					<TouchableOpacity
						key={item.id}
						className="rounded-[24px] overflow-hidden h-[200px] mb-5 relative justify-center items-center"
						activeOpacity={0.9}
						onPress={() => {
							const track = {
								id: item.id,
								title: "Revelation 11:19",
								image: item.image,
								narrator: "Drenched Scripture",
								audioUrl: item.audioUrl,
								subtitle: "God's Music",
							};
							loadTrack(track);
							router.push({
								pathname: "/player",
								params: { item: JSON.stringify(track) },
							});
						}}>
						<Image
							source={{ uri: item.image }}
							className="absolute w-full h-full"
						/>
						<View className="absolute inset-0 bg-black/45 justify-center items-center p-6">
							<Text className="text-[14px] leading-[22px] text-white text-center mb-2.5 font-medium">
								{item.quote}
							</Text>
							<Text className="text-[12px] text-cyan-500 font-semibold text-center">
								{item.reference}
							</Text>
						</View>
					</TouchableOpacity>
				))}
			</View>
			<View className="h-[110px]" />
		</ScrollView>
	);
}
