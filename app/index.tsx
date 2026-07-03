import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StatusBar, ImageBackground } from "react-native";
import { withDelay, withTiming, useSharedValue } from "react-native-reanimated";

export default function SplashScreen() {
	const router = useRouter();

	const logoOpacity = useSharedValue(0);
	const logoScale = useSharedValue(0.7);
	const loaderOpacity = useSharedValue(0);
	const subtitleOpacity = useSharedValue(0);

	useEffect(() => {
		logoOpacity.value = withTiming(1, { duration: 1200 });
		logoScale.value = withTiming(1, { duration: 1200 });
		subtitleOpacity.value = withDelay(400, withTiming(1, { duration: 1000 }));
		loaderOpacity.value = withDelay(1000, withTiming(1, { duration: 800 }));
		const timer = setTimeout(() => {
			router.replace("/(auth)/welcome");
		}, 3000);

		return () => clearTimeout(timer);
	}, [router, loaderOpacity, logoOpacity, logoScale, subtitleOpacity]);

	return (
		<ImageBackground
			source={require("../assets/images/splash-icon.png")}
			className="flex-1"
			resizeMode="cover">
			<StatusBar barStyle="light-content" />
		</ImageBackground>
	);
}
