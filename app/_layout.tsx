import "../global.css";
import "react-native-reanimated";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AudioProvider } from "@/context/AudioContext";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "nativewind";

export default function RootLayout() {
	const { colorScheme } = useColorScheme();

	return (
		<AudioProvider>
			<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="index" />
					<Stack.Screen name="(auth)" />
					<Stack.Screen name="(tabs)" />
					<Stack.Screen
						name="player"
						options={{ presentation: "modal" }}
					/>
				</Stack>
				<StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
			</ThemeProvider>
		</AudioProvider>
	);
}
