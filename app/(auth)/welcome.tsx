import {
	View,
	Text,
	StatusBar,
	ImageBackground,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
	const router = useRouter();

	return (
		<ImageBackground
			source={require("../../assets/images/createaccountbg.png")}
			className="flex-1 justify-end px-10"
			imageStyle={{ opacity: 0.85 }}>
			<StatusBar barStyle="light-content" />
			<View className="absolute inset-0 bg-black/35" />
			<View className="mb-10 items-center">
				<Text className="mb-3 text-center text-[32px] font-semibold leading-10 text-white">
					Immersed.{"\n"}Soaked. Saturated.
				</Text>
				<Text className="text-center text-[15px] leading-6 text-white/90">
					Your daily sanctuary for meditation and scripture. Experience the
					stillness of the Sacred Tide.
				</Text>
			</View>
			<View className="mb-10 w-full">
				<TouchableOpacity
					className="mb-3 items-center rounded-full bg-primary py-4"
					onPress={() => router.push("/(auth)/create-account")}>
					<Text className="text-base font-semibold text-white">
						Create an Account
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					className="items-center rounded-full border border-white/50 py-4"
					onPress={() => router.push("/(auth)/login")}>
					<Text className="text-base font-medium text-white">Sign In</Text>
				</TouchableOpacity>
			</View>
		</ImageBackground>
	);
}
